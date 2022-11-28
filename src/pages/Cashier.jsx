import Pumps from '../components/Pumps';
import { CashierProvider } from '../context/CashierContext';

function Cashier() {
  return (
    <section className="cashier flex-1 w-full flex flex-col justify-center items-center gap-12">
      <CashierProvider>
        <Pumps />
      </CashierProvider>
    </section>
  );
}
export default Cashier;
