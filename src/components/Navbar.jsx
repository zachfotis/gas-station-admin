import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-sky-700 shadow-lg text-white">
      <div className="w-full flex m-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-lg font-[400]">
            Πρατήριο Υγρών Καυσίμων
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 font-[300]">
            <li>
              <Link to="/">Ταμείο</Link>
            </li>
            <li>
              <Link to="/history">Ιστορικό</Link>
            </li>
            <li>
              <Link to="/statistics">Στατιστικά</Link>
            </li>
            <li>
              <Link to="/customers">Πελάτες</Link>
            </li>
            <li>
              <Link to="/logout">Έξοδος</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
