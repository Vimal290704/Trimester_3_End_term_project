/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const apiId = "12c380b51734461da74b8571d473d899";
  const [page, setPage] = useState(1);
  const [apiWorking, setapiWorking] = useState(true);


  const RawData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/recipes`);
      return response.data.recipes;
    } catch (error) {
      return [];
    }
  };

  const getRecipe = async () => {
    try {
      const response = await axios.get(
        `hhttps://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: "chicken",
            number: 30,
            offset: (page - 1) * 30,
            apiKey: apiId,
          },
        }
      );
      setapiWorking(true);
      return response.data.results;
    } catch (error) {
      setapiWorking(false);
      return [];
    }
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const value = {
    getRecipe,
    setPage,
    nextPage,
    prevPage,
    page,
    apiWorking,
    RawData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
