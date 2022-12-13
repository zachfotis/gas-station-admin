import { useContext } from 'react';
import Pump from '../components/Pump';
import CashierContext from '../context/CashierContext';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

function Pumps() {
  const { pumps, updatePumps } = useContext(CashierContext);
  const navigate = useNavigate();

  return (
    <section className="relative cashier flex-1 w-full max-w-[1280px] flex flex-col justify-center items-center gap-12 p-10">
      <div className="pumps relative w-full flex justify-between items-center gap-10 flex-wrap laptopLG:justify-center">
        {pumps
          .sort((a, b) => a.id - b.id)
          .map((pump) => (
            <Pump key={pump.id} type={pump.type} />
          ))}
      </div>
      <h1 className="w-full text-center">
        Τελευταία Ενημέρωση: &nbsp;
        {pumps.length > 0 && format(new Date(pumps[0]?.updated_at), 'EEEE, d LLL yyyy - HH:mm:ss', { locale: el })}
      </h1>
      <button
        className="btn btn-warning"
        onClick={() => {
          updatePumps();
          navigate('/cashier');
        }}
      >
        Ενημερωση Αντλιων
      </button>
    </section>
  );
}
export default Pumps;
