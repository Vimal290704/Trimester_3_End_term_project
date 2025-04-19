/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DataContext = createContext();

const api = axios.create({
  timeout: 10000,
});

export const DataProvider = ({ children }) => {
  const apiId = "12c380b51734461da74b8571d473d899";
  const [page, setPage] = useState(1);
  const [apiWorking, setapiWorking] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [Filter, setFilter] = useState([]);
  const [currFilterOption, setFilterOption] = useState("All");
  const [cookList, setcookList] = useState(() => {
    const data = localStorage.getItem("cookList");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse cookList from localStorage:", e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cookList", JSON.stringify(cookList));
  }, [cookList]);

  const doesContain = useCallback(
    (recipe) => {
      return cookList.some((item) => item.id === recipe.id);
    },
    [cookList]
  );
  const RawData = useCallback(async () => {
    try {
      const response = await api.get(`https://dummyjson.com/recipes`);
      return response.data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }, []);

  const getRecipe = useCallback(async () => {
    try {
      const response = await api.get(
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
      console.error("Error fetching spoonacular recipes:", error);
      setapiWorking(false);
      return [];
    }
  }, [page, apiId]);
  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const toastOptions = useMemo(
    () => ({
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }),
    []
  );

  const saveRecipe = useCallback(
    (recipe, event) => {
      if (event) {
        event.preventDefault();
      }

      if (!doesContain(recipe)) {
        setcookList((prev) => [...prev, recipe]);
        toast.success(
          `${recipe.name} added to your cooking list!`,
          toastOptions
        );
      }
    },
    [doesContain, toastOptions]
  );

  const removeFromCookList = useCallback(
    (recipeId) => {
      const recipe = cookList.find((item) => item.id === recipeId);
      if (recipe) {
        setcookList((prev) => prev.filter((item) => item.id !== recipeId));
        toast.info(`${recipe.name} removed from your list`, {
          ...toastOptions,
          icon: "🗑️",
        });
      }
    },
    [cookList, toastOptions]
  );

  const value = useMemo(
    () => ({
      getRecipe,
      setPage,
      nextPage,
      prevPage,
      page,
      apiWorking,
      RawData,
      searchTerm,
      setSearchTerm,
      Filter,
      setFilter,
      currFilterOption,
      setFilterOption,
      cookList,
      setcookList,
      removeFromCookList,
      doesContain,
      saveRecipe,
    }),
    [
      getRecipe,
      page,
      apiWorking,
      RawData,
      searchTerm,
      Filter,
      currFilterOption,
      cookList,
      removeFromCookList,
      doesContain,
      saveRecipe,
      nextPage,
      prevPage,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
