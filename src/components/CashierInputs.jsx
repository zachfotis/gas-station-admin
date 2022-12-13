import { motion } from 'framer-motion';

function CashierInputs({ formInputs, setFormInputs, setShowResult }) {
  const labelClasses = 'text-base text-right';
  const inputClasses = 'input input-bordered input-base w-full';

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <motion.form
      key="form"
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
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
        value={formInputs.cashLeft}
        onChange={(e) => setFormInputs({ ...formInputs, cashLeft: Number(e.target.value) })}
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
        value={formInputs.incomeFromPayLater}
        onChange={(e) => setFormInputs({ ...formInputs, incomeFromPayLater: Number(e.target.value) })}
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
        value={formInputs.incomeFromVarious}
        onChange={(e) => setFormInputs({ ...formInputs, incomeFromVarious: Number(e.target.value) })}
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
        value={formInputs.expenses}
        onChange={(e) => setFormInputs({ ...formInputs, expenses: Number(e.target.value) })}
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
        value={formInputs.incomeFromCards}
        onChange={(e) => setFormInputs({ ...formInputs, incomeFromCards: Number(e.target.value) })}
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
        value={formInputs.incomeCash}
        onChange={(e) => setFormInputs({ ...formInputs, incomeCash: Number(e.target.value) })}
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
        value={formInputs.payLater}
        onChange={(e) => setFormInputs({ ...formInputs, payLater: Number(e.target.value) })}
      />
      <input type="submit" className="btn btn-warning w-full col-span-2 mt-5" value="Ελεγχος Ταμειου" />
    </motion.form>
  );
}
export default CashierInputs;
