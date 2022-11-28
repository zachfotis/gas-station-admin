import { FirebaseProvider } from './context/FirebaseContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cashier from './pages/Cashier';
import Navbar from './components/Navbar';

function App() {
  return (
    <section className="flex flex-col justify-start items-center min-h-screen bg-sky-50">
      <FirebaseProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Cashier />} />
          </Routes>
        </Router>
      </FirebaseProvider>
    </section>
  );
}

export default App;
