import './Loader.css';

function Loader({ text = 'Loading...' }) {
  return (
    <div className="absolute top-0 left-0 z-50 h-screen w-full flex flex-col justify-center items-center gap-5 bg-sky-50">
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}
export default Loader;
