import Pump from '../components/Pump';
import './Cashier.css';

function Cashier() {
  return (
    <section className="cashier flex-1 w-full flex flex-col justify-center items-center gap-10 p-10">
      <div className="pumps relative w-full max-w-[1280px] flex justify-between items-center gap-10 flex-wrap px-10 py-12">
        <Pump price={1.295} type="Θέρμανση" />
        <Pump price={2.183} type="Πετρέλαιο" />
        <Pump price={2.305} type="Αμόλυβδη 1" />
        <Pump price={2.305} type="Αμόλυβδη 2" />
        <h1 className="absolute bottom-1 right-4">Τελευταία Ενημέρωση: 28/11/22</h1>
      </div>
      <button class="btn btn-warning">Ενημερωση Αντλιων</button>
    </section>
  );
}
export default Cashier;
