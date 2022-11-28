import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-lg">
          Πρατήριο Υγρών Καυσίμων
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/cashier">Ταμείο</Link>
          </li>
          <li>
            <Link to="/customers">Πελάτες</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
