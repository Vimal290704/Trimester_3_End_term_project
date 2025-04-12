import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
const Pagination = () => {
  const { page, nextPage, prevPage } = useContext(DataContext);
  return (
    <div className="bg-gray-400 p-4 h-[50px] w-full mt-8 flex justify-center">
      <div className="px-8" onClick={prevPage}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <p>{page}</p>
      <div className="px-8" onClick={nextPage}>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default Pagination;
