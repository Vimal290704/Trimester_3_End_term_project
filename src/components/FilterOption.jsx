/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function FilterOption({ option }) {
  const { currFilterOption, setFilterOption } = useContext(DataContext);

  const isActive = currFilterOption === option;

  return (
    <button
      className={`font-medium py-2 px-4 rounded-lg mr-2 mb-2 transition-all duration-300 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 ${
        isActive
          ? "bg-blue-600 text-white ring-1 ring-blue-700"
          : "bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-400"
      }`}
      onClick={() => setFilterOption(option)}
    >
      {option}
    </button>
  );
}

export default FilterOption;
