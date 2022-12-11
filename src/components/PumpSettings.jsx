import { useState } from 'react';
import { motion } from 'framer-motion';

function PumpSettings({ currentPump, setCurrentPump, setShowSettings }) {
  const [counter, setCounter] = useState(currentPump.counter);
  const [priceSell, setPriceSell] = useState(currentPump.priceSell);
  const [priceBuy, setPriceBuy] = useState(currentPump.priceBuy);

  const handleSave = (e) => {
    const updated_at = new Date();
    setCurrentPump((prev) => {
      return { ...prev, counter, priceSell, priceBuy, updated_at };
    });
    setShowSettings(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, top: '-100%' }}
      animate={{ opacity: 1, top: '0px' }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, top: '-100%' }}
      className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(255,255,255,0.8)] flex justify-center items-center"
    >
      <div className="w-[300px] bg-white rounded-lg shadow-lg overflow-hidden z-10">
        <div className="w-full flex justify-start items-center gap-1 py-1 pl-3 bg-slate-600 text-white text-sm">
          <h1>Αντλία:</h1>
          <p>{currentPump.type}</p>
        </div>
        <form
          className="p-6 laptopLG:p-2 w-full flex flex-col justify-center items-center gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(e);
          }}
        >
          <div className="w-full text-center flex flex-col justify-start items-center gap-1">
            <label htmlFor="counter" className="font-[400] text-base laptopLG:text-sm">
              Μετρητής
            </label>
            <input
              id="counter"
              type="number"
              className="input input-bordered input-sm w-full text-center laptopLG:input-xs"
              value={counter}
              onChange={(e) => setCounter(Number(e.target.value))}
            />
          </div>
          <div className="w-full text-center flex flex-col justify-center items-center gap-1">
            <label htmlFor="price-sell" className="font-[400] text-base laptopLG:text-sm">
              Τιμή Πώλησης
            </label>
            <input
              id="price-sell"
              type="number"
              className="input input-bordered input-sm w-full text-center laptopLG:input-xs"
              value={priceSell}
              onChange={(e) => setPriceSell(Number(e.target.value))}
            />
          </div>
          <div className="w-full text-center flex flex-col justify-center items-center gap-1">
            <label htmlFor="price-buy" className="font-[400] text-base laptopLG:text-sm">
              Τιμή Αγοράς
            </label>
            <input
              id="price-buy"
              type="number"
              className="input input-bordered input-sm w-full text-center laptopLG:input-xs"
              value={priceBuy}
              onChange={(e) => setPriceBuy(Number(e.target.value))}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-2 mt-2">
            <button className="w-full btn btn-success btn-sm text-sm laptopLG:btn-xs" onClick={handleSave}>
              Αποθηκευση
            </button>
            <button
              className="w-full btn btn-error btn-outline btn-sm text-sm laptopLG:btn-xs"
              onClick={() => setShowSettings(false)}
            >
              Ακύρωση
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
export default PumpSettings;
