import { useState } from 'react';
import PumpUnleaded from '../assets/images/pump_unleaded.png';
import PumpDiesel from '../assets/images/pump_diesel.png';
import PumpHeating from '../assets/images/pump_heating.png';
import './Pump.css';

function Pump({ price = 0.0, type = 'Unknown' }) {
  const [pumpCounter, setPumpCounter] = useState(0);
  const [pumpPrice, setPumpPrice] = useState(price);

  const pumpImage = () => {
    switch (type) {
      case 'Θέρμανση':
        return PumpHeating;
      case 'Πετρέλαιο':
        return PumpDiesel;
      case 'Αμόλυβδη':
        return PumpUnleaded;
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
          className="w-[96%] h-[36%] px-1 absolute top-[10%] left-[2%] z-20 text-base text-right"
          value={pumpCounter}
          onChange={(e) => setPumpCounter(e.target.value)}
        />
        <input
          type="number"
          placeholder="τιμή"
          className="w-[96%] h-[36%] px-1 absolute top-[55%] left-[2%] z-20 text-base text-right"
          value={pumpPrice}
          onChange={(e) => setPumpPrice(e.target.value)}
        />
      </div>
      <h1 className="absolute w-[40%] top-[55%] left-[41%] text-base font-bold font-RobotoMono text-center">{type}</h1>
    </div>
  );
}
export default Pump;
