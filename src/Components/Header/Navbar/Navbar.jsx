import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/upcoming-events">Upcoming Events</NavLink>
      </li>
    </>
  );

  const userDropdown = (
    <>
      <li>
        <Link to="/create-event">Create Event</Link>
      </li>
      <li>
        <Link to="/manage-events">Manage Events</Link>
      </li>
      <li>
        <Link to="/joined-events">Joined Events</Link>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container px-4 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              {user && (
                <div className="border-t border-base-300 mt-2 pt-2">
                  {userDropdown}
                </div>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl gap-0">
            <span className="text-3xl">🗓️</span>
            <span className="font-bold">SocialEvents</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1">{navLinks}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user?.displayName}
              >
                <div className="w-10 rounded-full">
                  <img alt="User Profile" src={user?.photoURL} />
                </div>
                DE
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {userDropdown}
                <li className="mt-2">
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
