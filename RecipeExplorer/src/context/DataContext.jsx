/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const apiId = "12c380b51734461da74b8571d473d899";
  const [page, setPage] = useState(1);

  const RawData = async () => {};
  const getRecipe = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: "chicken",
            number: getNumber(),
            apiKey: apiId,
          },
        }
      );
      return filterData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      return [];
    }
  };

  function getNumber() {
    return page * 30;
  }

  function filterData(data) {
    if (page === 1) {
      return data;
    }
    const start = (page - 1) * 30;
    const end = page * 30;
    return data.slice(start, end);
  }

  function nextPage() {
    setPage(page + 1);
  }

  function prevPage() {
    if (page == 1) return;
    setPage(page - 1);
  }
  const value = {
    getRecipe,
    setPage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
