/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const NavBar = () => {
  const { setSearchTerm, setError } = useContext(DataContext);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const isActive = useMemo(
    () => ({
      home: location.pathname === "/",
      cookingList: location.pathname === "/cookinglist",
    }),
    [location.pathname]
  );
  const handleSearchChange = useCallback(
    (e) => {
      try {
        setInputValue(e.target.value);
      } catch (err) {
        console.error("Error setting input value:", err);
        setError && setError("Search error: " + err.message);
      }
    },
    [setError]
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        setSearchTerm(inputValue);
      } catch (err) {
        console.error("Error setting search term:", err);
        setError && setError("Search error: " + err.message);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchTerm, setError]);

  const activeLinkClass =
    "px-4 py-2 text-white font-medium bg-blue-700 rounded-lg transition duration-200";
  const inactiveLinkClass =
    "px-4 py-2 text-white font-medium hover:bg-blue-700 rounded-lg transition duration-200";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <Link
              to="/"
              className="font-bold text-xl text-white hover:text-blue-100 transition duration-200"
            >
              RecipeExplorer
            </Link>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className={isActive.home ? activeLinkClass : inactiveLinkClass}
              aria-current={isActive.home ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              to="/cookinglist"
              className={
                isActive.cookingList ? activeLinkClass : inactiveLinkClass
              }
              aria-current={isActive.cookingList ? "page" : undefined}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My List
              </div>
            </Link>
          </div>

          <div className="flex">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={inputValue}
                className="bg-white rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
                onChange={handleSearchChange}
                aria-label="Search recipes"
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
