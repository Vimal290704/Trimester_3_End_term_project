/* eslint-disable no-unused-vars */
import React from "react";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
function RecipeCard1({ RecipeObj }) {
  const { apiWorking } = useContext(DataContext);
  console.log(RecipeObj);
  return <div></div>;
}

export default RecipeCard1;
