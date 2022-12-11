import { motion } from 'framer-motion';

function CashierResult({ actualIncome, incomeBasedOnPumps, theoreticalIncome, setShowResult }) {
  return (
    <motion.div
      key="cashier-result"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      exit={{ opacity: 0, x: '100%' }}
      className="w-full mt-[50px] mb-[280px] flex flex-col justify-center items-center gap-[75px]"
    >
      <div className="flex justify-center items-center gap-[50px]">
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="font-[400] text-xl">Ταμείο Ημέρας</h1>
          <p className="font-[500] text-3xl">{theoreticalIncome}€</p>
        </div>
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="font-[400] text-xl">Κέρδος Ημέρας</h1>
          <p className="font-[500] text-3xl">{actualIncome}€</p>
        </div>
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="font-[400] text-xl">Ισοζύγιο Ταμείου</h1>
          <p className="font-[500] text-3xl">
            {incomeBasedOnPumps - theoreticalIncome > 0 && '+'} {incomeBasedOnPumps - theoreticalIncome}€
          </p>
        </div>
      </div>
      <div className="w-full flex  justify-center items-center gap-7">
        <button className="btn btn-ghost btn-md btn-outline" onClick={() => setShowResult(false)}>
          Διορθωση Ταμειου
        </button>
        <button className="btn btn-accent btn-md ">Αποθηκευση Ταμειου</button>
      </div>
    </motion.div>
  );
}
export default CashierResult;
