import {
  getFirestore,
  collection,
  orderBy,
  query,
  getDocs,
  limit,
  Timestamp,
  getCountFromServer,
  startAfter,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import HistoryCard from '../components/HistoryCard';
import HistoryIcon from '../assets/images/history.png';
import LoaderSmall from '../components/LoaderSmall';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [cashiers, setCashiers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCashiers, setTotalCashiers] = useState(0);
  const lim = 10;

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const getCashiers = async () => {
      setIsLoading(true);
      const db = getFirestore();
      const collectionRef = collection(db, 'cashier');

      // get the number of docs
      const snapshot = await getCountFromServer(collectionRef);
      setTotalCashiers(snapshot.data().count);

      // get the limited docs
      const queryRef = query(collectionRef, orderBy('date', 'desc'), limit(lim));
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => {
        let date = new Timestamp(doc.data().date.seconds, doc.data().date.nanoseconds).toDate();
        const dateDay = format(new Date(date), 'EEEE', { locale: el });
        const dateDate = format(new Date(date), 'd LLL yyyy', { locale: el });
        const dateOriginal = doc.data().date;
        return {
          uid: doc.id,
          ...doc.data(),
          date: {
            day: dateDay,
            date: dateDate,
          },
          dateOriginal,
        };
      });
      if (data.length) {
        setCashiers(data);
      }
      setIsLoading(false);
    };
    getCashiers();
  }, []);

  const handleNext = async () => {
    if ((currentPage + 1) * lim > cashiers.length) {
      setIsLoading(true);
      const db = getFirestore();
      const collectionRef = collection(db, 'cashier');
      const queryRef = query(
        collectionRef,
        orderBy('date', 'desc'),
        limit(lim),
        startAfter(cashiers[cashiers.length - 1].dateOriginal)
      );
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => {
        let date = new Timestamp(doc.data().date.seconds, doc.data().date.nanoseconds).toDate();
        const dateDay = format(new Date(date), 'EEEE', { locale: el });
        const dateDate = format(new Date(date), 'd LLL yyyy', { locale: el });
        const dateOriginal = doc.data().date;
        return {
          uid: doc.id,
          ...doc.data(),
          date: {
            day: dateDay,
            date: dateDate,
          },
          dateOriginal,
        };
      });
      if (data.length) {
        setCashiers((prev) => [...prev, ...data]);
      }
      setIsLoading(false);
    }
    setCurrentPage(currentPage + 1);
    moveToTop();
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    moveToTop();
  };

  const deleteCashier = async (uid) => {
    const confirmation = window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε την εγγραφή?');
    if (!confirmation) {
      return;
    }
    setIsLoading(true);
    try {
      // delete from db
      const db = getFirestore();
      const docRef = doc(db, 'cashier', uid);
      await deleteDoc(docRef);

      // delete locally
      setCashiers((prev) => prev.filter((cashier) => cashier.uid !== uid));
      setTotalCashiers((prev) => prev - 1);
      toast.success('Η εγγραφή διαγράφηκε επιτυχώς');
    } catch (error) {
      toast.error('Παρουσιάστηκε σφάλμα');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 w-full max-w-[1280px] flex flex-col justify-start items-center gap-2 p-10 overflow-hidden">
      <img src={HistoryIcon} alt="page logo" className="w-[120px]" />
      <h1 className="text-xl mt-2 mb-5">Τα ταμεία σας</h1>
      <div className="w-full max-w-[1280px] mx-auto p-5 flex flex-col justify-start items-center gap-5">
        {isLoading ? (
          <LoaderSmall />
        ) : (
          <AnimatePresence mode="wait">
            {cashiers.length ? (
              cashiers.map((cashier, index) => {
                if (index >= currentPage * lim - lim && index < currentPage * lim) {
                  return <HistoryCard key={cashier.uid} cashier={cashier} deleteCashier={deleteCashier} />;
                }
              })
            ) : (
              <p className="text-sm">Δεν υπάρχουν διαθέσιμες εγγραφές</p>
            )}
          </AnimatePresence>
        )}
        <AnimatePresence>
          {totalCashiers > lim && (
            <Pagination
              key="pagination"
              currentPage={currentPage}
              lim={lim}
              totalCount={totalCashiers}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default History;
