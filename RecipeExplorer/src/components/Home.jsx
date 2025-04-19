/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import Pagination from "./Pagination";

const Home = () => {
  const { apiWorking, RawData, page, getRecipe } = useContext(DataContext);
  const [recipe, setRecipe] = useState(() => {
    const data = localStorage.getItem("Recipe");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (apiWorking) {
      getRecipe()
        .then((data) => {
          setRecipe(data);
          localStorage.setItem("Recipe", JSON.stringify(data));
          setError(null);
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
      })
      .catch((err) => {
        setError(err.message || "An error occurred with RawData");
      });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div>
        {recipe ? (
          typeof recipe === "object" ? (
            <pre>{JSON.stringify(recipe, null, 2)}</pre>
          ) : (
            <div>{recipe}</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
