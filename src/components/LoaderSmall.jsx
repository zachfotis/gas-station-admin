import './Loader.css';

function LoaderSmall({ text = 'Loading...' }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 bg-sky-50">
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}
export default LoaderSmall;
