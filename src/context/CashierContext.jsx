import { createContext, useEffect, useState } from 'react';

const CashierContext = createContext();

export default CashierContext;

const CashierProvider = ({ children }) => {
  const [pumps, setPumps] = useState(pumpsData);

  useEffect(() => {}, []);

  return <CashierContext.Provider value={{ pumps, setPumps }}>{children}</CashierContext.Provider>;
};

export { CashierProvider };

const pumpsData = [
  {
    id: 1,
    type: 'Θέρμανση',
    price: 1.295,
    counter: 0,
  },
  {
    id: 2,
    type: 'Πετρέλαιο',
    price: 2.183,
    counter: 0,
  },
  {
    id: 3,
    type: 'Αμόλυβδη 1',
    price: 2.305,
    counter: 0,
  },
  {
    id: 4,
    type: 'Αμόλυβδη 2',
    price: 2.305,
    counter: 0,
  },
];
