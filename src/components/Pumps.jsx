import { useContext } from 'react';
import CashierContext from '../context/CashierContext';
import Pump from './Pump';

function Pumps() {
  const { pumps } = useContext(CashierContext);

  return (
    <>
      <div className="pumps relative w-full max-w-[1280px] flex justify-between items-center gap-10 flex-wrap">
        {pumps.map((pump) => (
          <Pump key={pump.id} type={pump.type} />
        ))}
      </div>
      <h1 className="w-full text-center">Τελευταία Ενημέρωση: 28/11/22</h1>
      <button className="btn btn-warning">Ενημερωση Αντλιων</button>
    </>
  );
}
export default Pumps;
