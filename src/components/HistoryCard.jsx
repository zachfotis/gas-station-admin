import { MdDeleteForever } from 'react-icons/md';
import { motion } from 'framer-motion';

function HistoryCard({ cashier, deleteCashier }) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
      exit={{ x: '-200%', opacity: 0 }}
      className="w-full bg-zinc-200 rounded-lg shadow-lg p-2 flex justify-center items-stretch gap-2"
    >
      <div className="flex flex-col justify-center items-center bg-sky-50 py-2 px-5 shadow-sm rounded-lg">
        <h1>{cashier?.date?.day}</h1>
        <h1>{cashier?.date?.date}</h1>
      </div>
      <div className="flex-1 flex justify-evenly items-center gap-2 bg-sky-50 p-2 shadow-sm rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-[400] text-center w-full">Ταμείο Ημέρας</h1>
          <p className="font-[500]">{cashier?.totals?.cashierGrossProfit}€</p>
        </div>
        <span className="w-[1px] h-[80%] bg-slate-300 rounded-xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-[400] text-center w-full">Καθαρό Κέρδος</h1>
          <p
            className={`font-[500] ${
              cashier?.totals?.cashierNetProfit > 0
                ? 'text-green-500'
                : cashier?.totals?.cashierNetProfit < 0 && 'text-red-500'
            }`}
          >
            {cashier?.totals?.cashierNetProfit.toFixed(2)}€
          </p>
        </div>
        <span className="w-[1px] h-[80%] bg-slate-300 rounded-xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-[400] text-center w-full">Ισοζύγιο Ταμείου</h1>
          <p
            className={`font-[500] ${
              cashier?.totals?.balance > 0 ? 'text-green-500' : cashier?.totals?.balance < 0 && 'text-red-500'
            }`}
          >
            {cashier?.totals?.balance > 0 && '+'}
            {cashier?.totals?.balance.toFixed(2)}€
          </p>
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} className="flex justify-center items-center rounded-lg">
        <MdDeleteForever
          className="text-4xl text-red-600 cursor-pointer"
          // onClick={() => deleteCashier(cashier?.uid)}
        />
      </motion.div>
    </motion.div>
  );
}

export default HistoryCard;
