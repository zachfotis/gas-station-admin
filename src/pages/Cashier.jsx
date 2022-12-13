import { useState } from 'react';
import CashierImage from '../assets/images/cashier.png';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import CashierResult from '../components/CashierResult';
import { AnimatePresence } from 'framer-motion';
import CashierInputs from '../components/CashierInputs';

function Cashier() {
  const today = format(new Date(), 'EEEE, d LLL yyyy', { locale: el });
  const [previousCashLeft, setPreviousCashLeft] = useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);
  const [totalNetProfit, setTotalNetProfit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [formInputs, setFormInputs] = useState({
    cashLeft: 0,
    expenses: 0,
    incomeCash: 0,
    incomeFromCards: 0,
    incomeFromVarious: 0,
    incomeFromPayLater: 0,
    payLater: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const calculateProfit = () => {
    const grossProfit =
      previousCashLeft +
      formInputs.incomeCash +
      formInputs.incomeFromCards +
      formInputs.incomeFromVarious +
      formInputs.incomeFromPayLater -
      formInputs.cashLeft -
      formInputs.expenses;

    setTotalGrossProfit(grossProfit);
  };

  return (
    <section className="cashier flex-1 w-full max-w-[1280px] flex flex-col justify-center items-center gap-2 p-10 overflow-hidden">
      <img src={CashierImage} alt="cashier" className="h-[160px]" />
      <h1 className="text-xl font-[400] text-center mb-7">Το ταμείο σας για {today}</h1>
      <div className="w-full flex justify-center items-start gap-5">
        <AnimatePresence mode={'wait'}>
          {!showResult ? (
            <CashierInputs formInputs={formInputs} setFormInputs={setFormInputs} setShowResult={setShowResult} />
          ) : (
            <CashierResult
              actualIncome={actualIncome}
              incomeBasedOnPumps={incomeBasedOnPumps}
              theoreticalIncome={theoreticalIncome}
              setShowResult={setShowResult}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
export default Cashier;
