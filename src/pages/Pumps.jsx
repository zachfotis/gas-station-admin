import { Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import Pump from '../components/Pump';
import CashierContext from '../context/CashierContext';

function Cashier() {
  const { pumps, updatePumps } = useContext(CashierContext);

  return (
    <section className="cashier flex-1 w-full flex flex-col justify-center items-center gap-12 p-10">
      <div className="pumps relative w-full max-w-[1280px] flex justify-between items-center gap-10 flex-wrap">
        {pumps
          .sort((a, b) => a.id - b.id)
          .map((pump) => (
            <Pump key={pump.id} type={pump.type} />
          ))}
      </div>
      <h1 className="w-full text-center">
        Τελευταία Ενημέρωση:{' '}
        {pumps.length > 0 &&
          new Timestamp(pumps[0].updated_at.seconds, pumps[0].updated_at.nanoseconds).toDate().toLocaleString()}
      </h1>
      <button onClick={updatePumps} className="btn btn-warning">
        Ενημερωση Αντλιων
      </button>
    </section>
  );
}
export default Cashier;
