import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_apiKey,
  authDomain: import.meta.env.VITE_APP_authDomain,
  projectId: import.meta.env.VITE_APP_projectId,
  storageBucket: import.meta.env.VITE_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
  appId: import.meta.env.VITE_APP_appId,
};

// A custom hook to initialize firebase and check if it's ready
function useFirebase() {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!isFirebaseInitialized) {
      initializeApp(firebaseConfig);
      setIsFirebaseInitialized(true);
    }
  }, [isFirebaseInitialized]);

  return { isFirebaseInitialized };
}

export default useFirebase;
