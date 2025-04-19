import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Pagination = () => {
  const { apiWorking, page, nextPage, prevPage } = useContext(DataContext);

  return (
    <>
      {apiWorking ? (
        <div className="bg-gray-700 text-white p-4 h-[60px] w-full mt-8 flex justify-center items-center gap-8">
          <button onClick={prevPage} className="px-4 py-2 bg-gray-500 rounded">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <p className="text-lg font-semibold">{page}</p>
          <button onClick={nextPage} className="px-4 py-2 bg-gray-500 rounded">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;