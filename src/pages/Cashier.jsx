import { useState } from 'react';
import CashierImage from '../assets/images/cashier.png';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import CashierResult from '../components/CashierResult';
import { AnimatePresence, motion } from 'framer-motion';

function Cashier() {
  const labelClasses = 'text-base text-right';
  const inputClasses = 'input input-bordered input-base w-full';
  const today = format(new Date(), 'EEEE, d LLL yyyy', { locale: el });
  const [actualIncome, setActualIncome] = useState(0);
  const [theoreticalIncome, setTheoreticalIncome] = useState(0);
  const [incomeBasedOnPumps, setIncomeBasedOnPumps] = useState(5);
  const [previousCashLeft, setPreviousCashLeft] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cashLeft, expenses, incomeCash, incomeFromCards, incomeFromVarious, incomeFromPayLater, payLater } =
      e.target.elements;

    const cashLeftValue = Number(cashLeft.value);
    const expensesValue = Number(expenses.value);
    const incomeCashValue = Number(incomeCash.value);
    const incomeFromCardsValue = Number(incomeFromCards.value);
    const incomeFromVariousValue = Number(incomeFromVarious.value);
    const incomeFromPayLaterValue = Number(incomeFromPayLater.value);
    const payLaterValue = Number(payLater.value);

    const actualIncomeLocal =
      previousCashLeft +
      incomeCashValue +
      incomeFromCardsValue +
      incomeFromVariousValue +
      incomeFromPayLaterValue -
      cashLeftValue -
      expensesValue;

    const theoreticalIncomeLocal =
      cashLeftValue +
      incomeCashValue +
      incomeFromCardsValue +
      incomeFromVariousValue +
      payLaterValue -
      previousCashLeft;

    setActualIncome(actualIncomeLocal);
    setTheoreticalIncome(theoreticalIncomeLocal);
    setShowResult(true);
  };

  return (
    <section className="cashier flex-1 w-full max-w-[1280px] flex flex-col justify-center items-center gap-2 p-10 overflow-hidden">
      <img src={CashierImage} alt="cashier" className="h-[160px]" />
      <h1 className="text-xl font-[400] text-center mb-7">Το ταμείο σας για {today}</h1>
      <div className="w-full flex justify-center items-start gap-5">
        <AnimatePresence>
          {!showResult && (
            <motion.form
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, x: '-100%' }}
              className="w-full max-w-[700px] grid grid-cols-[150px_300px] gap-5 justify-center items-center"
              onSubmit={handleSubmit}
            >
              {/* Cash Left */}
              <label htmlFor="cash-left" className={labelClasses}>
                Παραμένων Ταμείο:
              </label>
              <input
                id="cash-left"
                type="number"
                placeholder="παραμένων ταμείο"
                className={inputClasses}
                name="cashLeft"
                required
              />
              {/* Expenses */}
              <label htmlFor="expenses" className={labelClasses}>
                Έξοδα:
              </label>
              <input
                id="expenses"
                type="number"
                placeholder="έξοδα"
                className={inputClasses}
                name="expenses"
                required
              />
              {/* Income Cash */}
              <label htmlFor="income-cash" className={labelClasses}>
                Είσπραξη Ταμείο:
              </label>
              <input
                id="income-cash"
                type="number"
                placeholder="είσπραξη ταμείο"
                className={inputClasses}
                name="incomeCash"
                required
              />
              {/* Income from cards */}
              <label htmlFor="income-from-cards" className={labelClasses}>
                Είσπραξη Κάρτες:
              </label>
              <input
                id="income-from-cards"
                type="number"
                placeholder="είσπραξη κάρτες"
                className={inputClasses}
                name="incomeFromCards"
                required
              />
              {/* Income for Various */}
              <label htmlFor="income-from-various" className={labelClasses}>
                Είσπραξη Διάφορα:
              </label>
              <input
                id="income-from-various"
                type="number"
                placeholder="είσπραξη διάφορα"
                className={inputClasses}
                name="incomeFromVarious"
                required
              />
              {/* Income from Pay Later */}
              <label htmlFor="income-from-pay-later" className={labelClasses}>
                Είσπραξη Βερεσέ:
              </label>
              <input
                id="income-from-pay-later"
                type="number"
                placeholder="είσπραξη βερεσέ"
                className={inputClasses}
                name="incomeFromPayLater"
                required
              />
              {/* Pay Later */}
              <label htmlFor="pay-later" className={labelClasses}>
                Βερεσέ:
              </label>
              <input
                id="pay-later"
                type="number"
                placeholder="βερεσέ"
                className={inputClasses}
                name="payLater"
                required
              />
              <input type="submit" className="btn btn-warning w-full col-span-2 mt-5" value="Ελεγχος Ταμειου" />
            </motion.form>
          )}
          {showResult && (
            <CashierResult
              actualIncome={actualIncome}
              incomeBasedOnPumps={incomeBasedOnPumps}
              theoreticalIncome={theoreticalIncome}
              setShowResult={setShowResult}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
export default Cashier;
