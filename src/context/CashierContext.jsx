import { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import FirebaseContext from './FirebaseContext';
import { toast } from 'react-toastify';

const CashierContext = createContext();

export default CashierContext;

const CashierProvider = ({ children }) => {
  const [pumps, setPumps] = useState([]);
  const { setIsLoading } = useContext(FirebaseContext);

  useEffect(() => {
    const getPumps = async () => {
      try {
        setIsLoading(true);
        const db = getFirestore();
        const collectionRef = collection(db, 'pumps');
        const querySnap = await getDocs(collectionRef);
        const data = querySnap.docs.map((doc) => {
          return { ...doc.data(), doc_id: doc.id };
        });
        setPumps(data);
      } catch (error) {}
      setIsLoading(false);
    };

    getPumps();
  }, [setIsLoading]);

  const updatePumps = async () => {
    try {
      setIsLoading(true);
      const db = getFirestore();
      pumps.forEach(async (pump) => {
        const { doc_id, ...pumpData } = pump;
        const docRef = doc(db, 'pumps', doc_id);
        await updateDoc(docRef, {
          ...pumpData,
          updated_at: new Date(),
        });
      });
      toast.success('Επιτυχής ενημέρωση αντλιών');
    } catch (error) {
      toast.error('Αποτυχία ενημέρωσης αντλιών');
    }
    setIsLoading(false);
  };
  return <CashierContext.Provider value={{ pumps, setPumps, updatePumps }}>{children}</CashierContext.Provider>;
};

export { CashierProvider };
