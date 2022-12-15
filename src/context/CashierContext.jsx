import { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import FirebaseContext from './FirebaseContext';
import { toast } from 'react-toastify';

const CashierContext = createContext();

export default CashierContext;

const CashierProvider = ({ children }) => {
  const { user, setIsLoading } = useContext(FirebaseContext);
  const [pumps, setPumps] = useState([]);

  // Get Firestore
  useEffect(() => {
    const getPumps = async () => {
      try {
        setIsLoading(true);

        const db = getFirestore();
        const collectionRef = collection(db, 'pumps');
        const querySnap = await getDocs(collectionRef);
        const data = querySnap.docs.map((doc) => {
          const updatedAt = new Timestamp(doc.data().updated_at.seconds, doc.data().updated_at.nanoseconds).toDate();
          return { ...doc.data(), doc_id: doc.id, updated_at: updatedAt };
        });
        setPumps(data);
      } catch (error) {
        console.log(error);
        toast.error('Αποτυχία φόρτωσης αντλιών');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getPumps();
    }
  }, [user, setIsLoading]);

  // Update Firestore
  const updatePumps = async () => {
    try {
      setIsLoading(true);
      const db = getFirestore();
      const updated_at = new Date();
      const updatedPumps = pumps.map((pump) => ({ ...pump, updated_at }));
      setPumps(updatedPumps);
      updatedPumps.forEach(async (pump) => {
        const { doc_id, ...pumpData } = pump;
        const docRef = doc(db, 'pumps', doc_id);
        await updateDoc(docRef, pumpData);
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
