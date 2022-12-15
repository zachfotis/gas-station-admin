import { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, addDoc, orderBy, query, getDocs, limit } from 'firebase/firestore';
import CashierContext from '../context/CashierContext';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import CashierImage from '../assets/images/cashier.png';
import CashierResult from '../components/CashierResult';
import CashierInputs from '../components/CashierInputs';
import LoaderSmall from '../components/LoaderSmall';

function Cashier() {
  const today = format(new Date(), 'EEEE, d LLL yyyy', { locale: el });
  const { pumps } = useContext(CashierContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPumps, setPreviousPumps] = useState([]);
  const [totals, setTotals] = useState({
    pumpsGrossProfit: null,
    pumpsNetProfit: null,
    cashierGrossProfit: null,
    cashierNetProfit: null,
    balance: null,
  });
  const [formInputs, setFormInputs] = useState({
    previousCashLeft: '',
    cashLeft: '',
    expenses: '',
    incomeCash: '',
    incomeFromCards: '',
    incomeFromVarious: '',
    incomeFromPayLater: '',
    payLater: '',
  });
  const [showResult, setShowResult] = useState(false);

  const saveResult = async () => {
    try {
      const newCashierDoc = {
        pumps,
        cashier: {
          ...formInputs,
        },
        totals,
        date: new Date(),
      };
      const db = getFirestore();
      const collectionRef = collection(db, 'cashier');
      await addDoc(collectionRef, newCashierDoc);
    } catch (error) {
      toast.error('Αποτυχία αποθήκευσης');
    } finally {
      toast.success('Αποθηκεύτηκε με επιτυχία');
    }
  };

  useEffect(() => {
    const calculateProfit = () => {
      const cashierGrossProfit =
        formInputs.incomeCash +
        formInputs.cashLeft -
        formInputs.previousCashLeft +
        formInputs.incomeFromCards +
        formInputs.incomeFromVarious;

      const cashierNetProfit = totals.pumpsNetProfit + formInputs.incomeFromVarious - formInputs.expenses;

      const theoreticalProfit =
        cashierGrossProfit - formInputs.incomeFromPayLater + formInputs.payLater + formInputs.expenses;

      const balance = theoreticalProfit - totals.pumpsGrossProfit;

      setTotals((prev) => ({ ...prev, cashierGrossProfit, cashierNetProfit, balance }));
    };

    calculateProfit();
  }, [formInputs]);

  useEffect(() => {
    const getLastCashier = async () => {
      setIsLoading(true);
      try {
        const db = getFirestore();
        const collectionRef = collection(db, 'cashier');
        const order = orderBy('date', 'desc');
        const lim = limit(1);
        const queryRef = query(collectionRef, order, lim);
        const dataSnap = await getDocs(queryRef);
        const data = dataSnap.docs.map((doc) => doc.data());

        const previousPumpsLocal = data[0] ? data[0].pumps : [];
        const previousCashLeft = data[0] ? data[0].cashier.cashLeft : 0;

        setPreviousPumps(previousPumpsLocal);
        setFormInputs((prev) => ({ ...prev, previousCashLeft }));
      } catch (error) {
        toast.error('Αποτυχία Ανάκτησης Προηγούμενου Ταμείου');
      }
      setIsLoading(false);
    };

    getLastCashier();
  }, []);

  useEffect(() => {
    if (!previousPumps.length) return;

    let pumpsGrossProfit = 0;
    let pumpsNetProfit = 0;
    pumps.forEach((pump) => {
      const previousPump = previousPumps.find((prevPump) => prevPump.id === pump.id);
      const liters = pump.counter - previousPump.counter;
      const grossProfit = liters * pump.priceSell;
      const netProfit = grossProfit - liters * pump.priceBuy;
      pumpsGrossProfit += grossProfit;
      pumpsNetProfit += netProfit;
    });

    setTotals((prev) => ({ ...prev, pumpsGrossProfit, pumpsNetProfit }));
  }, [previousPumps, pumps]);

  return (
    <section className="cashier flex-1 w-full max-w-[1280px] flex flex-col justify-center items-center gap-2 p-10 overflow-hidden">
      {isLoading ? (
        <LoaderSmall />
      ) : (
        <>
          {totals?.pumpsGrossProfit === 0 && (
            <h1 className="text-xl font-[600] text-center mb-7 p-3 border-4 border-red-500 rounded-lg">
              ΠΡΟΣΟΧΗ! Οι Αντλίες δεν έχουν ενημερωθεί!
            </h1>
          )}
          <img src={CashierImage} alt="cashier" className="h-[160px]" />
          <h1 className="text-xl font-[400] text-center mb-5">Το ταμείο σας για {today}</h1>
          <div className="w-full flex justify-center items-start gap-5">
            <AnimatePresence mode={'wait'}>
              {!showResult ? (
                <CashierInputs formInputs={formInputs} setFormInputs={setFormInputs} setShowResult={setShowResult} />
              ) : (
                <CashierResult totals={totals} setShowResult={setShowResult} saveResult={saveResult} />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
export default Cashier;
