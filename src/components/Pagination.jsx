import { motion } from 'framer-motion';
import { FcNext, FcPrevious } from 'react-icons/fc';

function Pagination({ currentPage, lim, totalCount, handleNext, handlePrevious }) {
  return (
    <motion.div
      initial={{ y: 1000, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ y: -1000, opacity: 0 }}
      className="mx-auto mt-10 flex justify-center items-center gap-5"
    >
      <button
        className="min-w-[50px] text-3xl flex justify-center items-center"
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        {currentPage > 1 && <FcPrevious />}
      </button>
      <h1 className="text-xl">Σελίδα {currentPage}</h1>
      <button
        className="min-w-[50px] text-3xl flex justify-center items-center"
        disabled={currentPage * lim >= totalCount}
        onClick={handleNext}
      >
        {currentPage * lim < totalCount && <FcNext />}
      </button>
    </motion.div>
  );
}
export default Pagination;
