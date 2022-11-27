import Pump from '../components/Pump';
import './Cashier.css';

function Cashier() {
  return (
    <section className="cashier w-full min-h-screen flex flex-col justify-center items-center p-10">
      <div className="w-full max-w-[1280px] flex justify-between items-center gap-10 flex-wrap">
        <Pump price={1.295} type="Θέρμανση" />
        <Pump price={2.183} type="Πετρέλαιο" />
        <Pump price={2.305} type="Αμόλυβδη" />
        <Pump price={2.305} type="Αμόλυβδη" />
      </div>
    </section>
  );
}
export default Cashier;
