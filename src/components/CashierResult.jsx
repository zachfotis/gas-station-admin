import { motion } from 'framer-motion';

function CashierResult({ totals, setShowResult, saveResult }) {
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
          <p className="font-[500] text-3xl">{totals.cashierGrossProfit}€</p>
        </div>
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="font-[400] text-xl">Κέρδος Ημέρας</h1>
          <p className={`font-[500] text-3xl ${totals.balance > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totals.cashierNetProfit.toFixed(2)}€
          </p>
        </div>
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="font-[400] text-xl">Ισοζύγιο Ταμείου</h1>
          <p className={`font-[500] text-3xl ${totals.balance > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totals.balance > 0 && '+'} {totals.balance.toFixed(2)}€
          </p>
        </div>
      </div>
      <div className="w-full flex  justify-center items-center gap-7">
        <button className="btn btn-ghost btn-md btn-outline" onClick={() => setShowResult(false)}>
          Διορθωση Ταμειου
        </button>
        <button className="btn btn-accent btn-md" onClick={() => saveResult()}>
          Αποθηκευση Ταμειου
        </button>
      </div>
    </motion.div>
  );
}
export default CashierResult;
