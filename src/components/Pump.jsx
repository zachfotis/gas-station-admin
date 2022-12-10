import { useContext } from 'react';
import PumpUnleaded from '../assets/images/pump_unleaded.png';
import PumpDiesel from '../assets/images/pump_diesel.png';
import PumpHeating from '../assets/images/pump_heating.png';
import './Pump.css';
import CashierContext from '../context/CashierContext';

function Pump({ type = 'Unknown' }) {
  const { pumps, setPumps } = useContext(CashierContext);

  const pumpImage = () => {
    switch (type) {
      case 'Θέρμανση':
        return PumpHeating;
      case 'Πετρέλαιο':
        return PumpDiesel;
      default:
        return PumpUnleaded;
    }
  };

  const handleUpdateCounter = (e) => {
    const updated_at = new Date();

    setPumps((prev) => {
      return prev.map((pump) => {
        if (pump.type === type) {
          return { ...pump, counter: e.target.value, updated_at };
        }
        return { ...pump, updated_at };
      });
    });
  };

  const handleUpdatePrice = (e) => {
    const updated_at = new Date();

    setPumps((prev) => {
      return prev.map((pump) => {
        if (pump.type === type) {
          return { ...pump, price: e.target.value, updated_at };
        }
        return { ...pump, updated_at };
      });
    });
  };

  return (
    <div className="relative w-fit">
      <img src={pumpImage()} alt="pump" className="w-[250px] laptopLG:w-[200px]" />
      <div className="absolute bg-blue top-[14%] left-[38%] w-[44%] h-[20%] z-10">
        <input
          type="number"
          placeholder="μετρητής"
          className="w-[96%] h-[36%] px-1 absolute top-[10%] left-[2%] z-20 text-sm text-right font-Orbitron font-[600]"
          value={pumps.find((pump) => pump.type === type).counter}
          onChange={handleUpdateCounter}
        />
        <input
          type="number"
          placeholder="τιμή"
          className="w-[96%] h-[36%] px-1 absolute top-[55%] left-[2%] z-20 text-sm text-right font-Orbitron font-[600]"
          value={pumps.find((pump) => pump.type === type).price}
          onChange={handleUpdatePrice}
        />
      </div>
      <h1 className="absolute w-[40%] top-[55%] left-[41%] text-base font-bold text-center laptopLG:text-sm">{type}</h1>
    </div>
  );
}
export default Pump;
