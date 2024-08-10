import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Room Booking</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/rooms" className="hover:text-blue-200">Rooms</Link></li>
            {user ? (
              <>
                <li><Link to="/bookings" className="hover:text-blue-200">My Bookings</Link></li>
                {user.isAdmin && (
                  <li><Link to="/admin/rooms" className="hover:text-blue-200">Admin</Link></li>
                )}
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:text-blue-200">
                    <FaSignOutAlt className="mr-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="flex items-center hover:text-blue-200">
                  <FaUser className="mr-1" /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;