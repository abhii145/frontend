import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserProps } from "../types";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/reducer/userSlice";

const Header = ({ user, searchQuery, setSearchQuery }: UserProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Logo
          </Link>
        </div>

        <div className="flex flex-grow items-center justify-center px-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4  focus:outline-none focus:border-blue-500"
            />
            <FaSearch
              className="absolute left-3 top-3 text-gray-500"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <FaShoppingBag size={20} />
          </Link>

          {user?._id ? (
            <>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              >
                <FaUser size={20} />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
            >
              <FaSignInAlt size={20} />
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dialogRef}
          className="absolute right-4 top-16 bg-white rounded-md shadow-lg border border-gray-300 z-20 p-4"
        >
          <div className="flex flex-col space-y-2">
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded transition-colors duration-150"
              >
                Admin
              </Link>
            )}
            <Link
              to="/orders"
              className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded transition-colors duration-150"
            >
              Orders
            </Link>
            <button
              className="w-full text-red-600 hover:bg-red-100 px-4 py-2 rounded transition-colors duration-150 flex items-center justify-center"
              onClick={logOutHandler}
            >
              <FaSignOutAlt className="mr-2" />
              <Link to="/auth">Logout</Link>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
