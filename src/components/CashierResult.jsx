import { motion } from 'framer-motion';

function CashierResult({ actualIncome, incomeBasedOnPumps, theoreticalIncome, setShowResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: '100%' }}
      className="w-full mt-4 mb-[217px] flex flex-col justify-center items-center gap-10"
    >
      <div className="text-center flex flex-col justify-center items-center gap-4">
        <h1 className="font-[400] text-xl">Κέρδος Ημέρας</h1>
        <p className="font-[700] text-5xl">{actualIncome}€</p>
      </div>
      <div className="text-center flex flex-col justify-center items-center gap-4">
        <h1 className="font-[400] text-xl">Ισοζύγιο Ταμείου</h1>
        <p className="font-[700] text-5xl">
          {incomeBasedOnPumps - theoreticalIncome > 0 && '+'} {incomeBasedOnPumps - theoreticalIncome}€
        </p>
      </div>
      <div className="w-full flex  justify-center items-center gap-4">
        <button className="btn btn-accent btn-md ">Αποθηκευση Ταμειου</button>
        <button className="btn btn-ghost btn-md btn-outline" onClick={() => setShowResult(false)}>
          Διορθωση Ταμειου
        </button>
      </div>
    </motion.div>
  );
}
export default CashierResult;
