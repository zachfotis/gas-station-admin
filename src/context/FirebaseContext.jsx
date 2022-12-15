import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import useFirebase from '../hooks/useFirebase';

const FirebaseContext = createContext();

export default FirebaseContext;

function FirebaseProvider({ children }) {
  const { isFirebaseInitialized } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted && isFirebaseInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isFirebaseInitialized]);

  return (
    <FirebaseContext.Provider value={{ isLoading, setIsLoading, isLoggedIn, user }}>
      {isFirebaseInitialized && children}
      {(!isFirebaseInitialized || isLoading) && <Loader />}
    </FirebaseContext.Provider>
  );
}

export { FirebaseProvider };
