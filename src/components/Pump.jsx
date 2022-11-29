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

  return (
    <div className="relative w-fit">
      <img src={pumpImage()} alt="pump" className="w-[250px]" />
      <div className="absolute bg-blue top-[14%] left-[38%] w-[44%] h-[20%] z-10">
        <input
          type="number"
          placeholder="μετρητής"
          className="w-[96%] h-[36%] px-1 absolute top-[10%] left-[2%] z-20 text-sm text-right font-Orbitron font-[600]"
          value={pumps.find((pump) => pump.type === type).counter}
          onChange={(e) => {
            setPumps((prev) => {
              return prev.map((pump) => {
                if (pump.type === type) {
                  return { ...pump, counter: e.target.value };
                }
                return pump;
              });
            });
          }}
        />
        <input
          type="number"
          placeholder="τιμή"
          className="w-[96%] h-[36%] px-1 absolute top-[55%] left-[2%] z-20 text-sm text-right font-Orbitron font-[600]"
          value={pumps.find((pump) => pump.type === type).price}
          onChange={(e) => {
            setPumps((prev) => {
              return prev.map((pump) => {
                if (pump.type === type) {
                  return { ...pump, price: e.target.value };
                }
                return pump;
              });
            });
          }}
        />
      </div>
      <h1 className="absolute w-[40%] top-[55%] left-[41%] text-base font-bold text-center">{type}</h1>
    </div>
  );
}
export default Pump;
