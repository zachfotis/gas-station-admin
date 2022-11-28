import { createContext } from 'react';
import Loader from '../components/Loader';
import useFirebase from '../hooks/useFirebase';

const FirebaseContext = createContext(null);

export default FirebaseContext;

function FirebaseProvider({ children }) {
  const { isFirebaseInitialized } = useFirebase();

  return (
    <FirebaseContext.Provider value={{}}>{isFirebaseInitialized ? children : <Loader />}</FirebaseContext.Provider>
  );
}

export { FirebaseProvider };
