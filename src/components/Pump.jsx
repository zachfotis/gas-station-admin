import { useContext, useEffect, useState } from 'react';
import PumpUnleaded from '../assets/images/pump_unleaded.png';
import PumpDiesel from '../assets/images/pump_diesel.png';
import PumpHeating from '../assets/images/pump_heating.png';
import { FcSettings } from 'react-icons/fc';
import './Pump.css';
import CashierContext from '../context/CashierContext';
import PumpSettings from './PumpSettings';
import { AnimatePresence, motion } from 'framer-motion';

function Pump({ type = 'Unknown' }) {
  const { pumps, setPumps } = useContext(CashierContext);
  const [currentPump, setCurrentPump] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setCurrentPump(pumps.find((pump) => pump.type === type));
  }, []);

  useEffect(() => {
    setPumps((prev) => {
      return prev.map((pump) => {
        if (pump.type === type) {
          return { ...pump, ...currentPump };
        }
        return { ...pump };
      });
    });
  }, [currentPump]);

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
      <img src={pumpImage()} alt="pump" className="w-[250px] laptopLG:w-[200px]" />
      <div className="absolute bg-blue top-[14%] left-[38%] w-[44%] h-[20%] z-10">
        <p
          className="w-[96%] h-[36%] px-1 absolute top-[10%] left-[2%] z-20 text-sm
          text-right font-Orbitron font-[600] shadow-md"
        >
          {currentPump && currentPump.counter}
        </p>
        <p
          className="w-[96%] h-[36%] px-1 absolute top-[55%] left-[2%] z-20 text-sm
          text-right font-Orbitron font-[600] shadow-md"
        >
          {currentPump && currentPump.priceSell.toFixed(3)}
        </p>
      </div>
      <p className="absolute w-[40%] top-[1.2%] laptopLG:top-[0.7%] left-[41%] text-xs font-[400] text-white text-center laptopLG:text-xs flex justify-center items-center gap-1">
        <span>Κέρδος:</span> {currentPump && ((currentPump.priceSell / currentPump.priceBuy - 1) * 100).toFixed(2)}%
      </p>
      <h1 className="absolute w-[40%] top-[55.5%] left-[41%] text-sm font-[400] text-center">{type}</h1>
      <motion.div
        className="absolute top-[73%] left-[54%] text-4xl cursor-pointer"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <FcSettings className="" onClick={() => setShowSettings((prev) => !prev)} />
      </motion.div>
      <AnimatePresence>
        {showSettings && (
          <PumpSettings currentPump={currentPump} setCurrentPump={setCurrentPump} setShowSettings={setShowSettings} />
        )}
      </AnimatePresence>
    </div>
  );
}
export default Pump;
