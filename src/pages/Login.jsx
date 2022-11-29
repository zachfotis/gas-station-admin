import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/FirebaseContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import logo from '../assets/icons/logo.png';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { setIsLoading } = useContext(FirebaseContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (userCredentials.user) {
      }
    } catch (error) {
      toast.error('Invalid email or password');
    }
    setIsLoading(false);
  };

  return (
    <section className="px-4 py-6 w-full flex-auto flex flex-col flex-wrap justify-center items-center">
      <div className="bg-white py-8 px-4 shadow rounded-2xl w-full sm:w-2/3 sm:px-6 sm:max-w-sm">
        <div className="w-100 flex flex-col flex-wrap justify-center items-center">
          <img src={logo} alt="logo" className="w-24 mb-4" />
          <h1 className="text-2xl font-bold">ΚΑΛΩΣ ΗΡΘΑΤΕ</h1>
          <h1 className="text-xl font-light mt-6 mb-6">Παρακαλώ εισάγετε τα στοιχεία σας!</h1>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Διεύθυνση Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Κωδικός Πρόσβασης
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
          >
            Σύνδεση
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
