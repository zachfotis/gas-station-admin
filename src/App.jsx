import { FirebaseProvider } from './context/FirebaseContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cashier from './pages/Cashier';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Cashier />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
