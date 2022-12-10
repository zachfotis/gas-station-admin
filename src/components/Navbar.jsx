import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const checkActive = ({ isActive }) => {
    return isActive ? 'font-[500]' : '';
  };

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
              <NavLink to="/" className={checkActive}>
                Αντλίες
              </NavLink>
            </li>
            <li>
              <NavLink to="/cashier" className={checkActive}>
                Ταμείο
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={checkActive}>
                Ιστορικό
              </NavLink>
            </li>
            <li>
              <NavLink to="/statistics" className={checkActive}>
                Στατιστικά
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers" className={checkActive}>
                Πελάτες
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className={checkActive}>
                Έξοδος
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
