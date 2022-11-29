import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseContext from './context/FirebaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Pumps from './pages/Pumps';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  const { isLoggedIn } = useContext(FirebaseContext);
  return (
    <section className="flex flex-col justify-start items-center min-h-screen bg-sky-50">
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Pumps />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </section>
  );
}

export default App;
