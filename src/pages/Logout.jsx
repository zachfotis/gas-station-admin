import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import FirebaseContext from '../context/FirebaseContext';

function Logout() {
  const { isLoggedIn, setIsLoading } = useContext(FirebaseContext);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      const auth = getAuth();
      auth.signOut();
      setIsLoading(false);
    }
  }, [isLoggedIn, setIsLoading]);

  return <Navigate to="/" />;
}

export default Logout;
