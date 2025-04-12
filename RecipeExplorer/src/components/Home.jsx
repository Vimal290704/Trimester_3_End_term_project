/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import Pagination from "./Pagination";

const Home = () => {
  const { page, getRecipe } = useContext(DataContext);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipe()
      .then((data) => {
        setRecipe(JSON.stringify(data));
        console.log(JSON.stringify(data));
      })
      .catch((err) => {
        setError(err);
      });
  }, [getRecipe, page]);

  return (
    <div>
      {recipe && <div>{recipe}</div>}
      <Pagination />
    </div>
  );
};

export default Home;
