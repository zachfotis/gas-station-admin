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
    <section className="w-full min-h-screen p-5 flex-auto flex flex-col flex-wrap justify-center items-center">
      <div className="bg-white py-8 px-5 shadow rounded-2xl w-fit">
        <div className="w-full p-5 flex flex-col flex-wrap justify-center items-center gap-2">
          <img src={logo} alt="logo" className="w-24" />
          <h1 className="text-2xl font-bold">ΚΑΛΩΣ ΗΡΘΑΤΕ</h1>
          <h1 className="text-xl font-light">Παρακαλώ εισάγετε τα στοιχεία σας!</h1>
        </div>
        <form className="w-full p-5 flex flex-col justify-center items-center gap-5" onSubmit={onSubmit}>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Διεύθυνση Email
            </label>
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

          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Κωδικός Πρόσβασης
            </label>
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
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm 
            font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
          >
            Σύνδεση
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
