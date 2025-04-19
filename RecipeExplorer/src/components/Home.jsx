/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import Pagination from "./Pagination";
import RecipeCard1 from "./RecipeCard1";
import RecipeCard2 from "./RecipeCard2";
import FilterOption from "./FilterOption";

const Home = () => {
  const { apiWorking, RawData, page, getRecipe, searchTerm } =
    useContext(DataContext);
  const [recipe, setRecipe] = useState(() => {
    const data = localStorage.getItem("Recipe");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (apiWorking) {
      getRecipe()
        .then((data) => {
          setRecipe(data);
          localStorage.setItem("Recipe", JSON.stringify(data));
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "An error occurred with the API");
          fetchRawData();
        });
    } else {
      fetchRawData();
    }
  }, [page, apiWorking, getRecipe]);

  const fetchRawData = () => {
    RawData()
      .then((data) => {
        setRecipe(data);
        setError(null);
        localStorage.setItem("Recipe", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred with RawData");
        setLoading(false);
      });
  };



  return (

    <div className="container mx-auto px-4 py-6">
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-64 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipe
            .filter((recipeObj) =>
              recipeObj.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((recipeObj, index) => (
              <div key={index}>
                {apiWorking ? (
                  <RecipeCard1 RecipeObj={recipeObj} />
                ) : (
                  <RecipeCard2 RecipeObj={recipeObj} />
                )}
              </div>
            ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
