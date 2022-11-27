import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  projectId: import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId,
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
