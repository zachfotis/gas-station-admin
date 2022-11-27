import './Loader.css';

function Loader({ text = 'Loading...' }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}
export default Loader;
