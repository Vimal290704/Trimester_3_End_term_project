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
  const [apiWorking, setApiWorking] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [Filter, setFilter] = useState([]);
  const [currFilterOption, setFilterOption] = useState("All");
  const [error, setError] = useState(null);
  const [cookList, setCookList] = useState(() => {
    const data = localStorage.getItem("cookList");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse cookList from localStorage:", e);
        setError(e.message || "Error parsing cookList");
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("cookList", JSON.stringify(cookList));
    } catch (e) {
      console.error("Failed to save cookList to localStorage:", e);
      setError(e.message || "Error saving cookList");
    }
  }, [cookList]);

  const doesContain = useCallback(
    (recipe) => {
      if (!recipe || !recipe.id) return false;
      return cookList.some((item) => item && item.id === recipe.id);
    },
    [cookList]
  );

  const RawData = useCallback(async () => {
    try {
      const response = await api.get(`https://dummyjson.com/recipes`);
      setApiWorking(true);
      return response.data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setApiWorking(false);
      setError(error.message || "Error fetching recipes");
      return [];
    }
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

      if (!recipe) {
        setError("Cannot save null recipe");
        return;
      }

      if (!doesContain(recipe)) {
        setCookList((prev) => [...prev, recipe]);
        toast.success(
          `${recipe.name || "Recipe"} added to your cooking list!`,
          toastOptions
        );
      }
    },
    [doesContain, toastOptions]
  );

  const removeFromCookList = useCallback(
    (recipeId) => {
      if (!recipeId) {
        setError("Cannot remove recipe without ID");
        return;
      }

      const recipe = cookList.find((item) => item && item.id === recipeId);
      if (recipe) {
        setCookList((prev) =>
          prev.filter((item) => item && item.id !== recipeId)
        );
        toast.info(`${recipe.name || "Recipe"} removed from your list`, {
          ...toastOptions,
          icon: "🗑️",
        });
      }
    },
    [cookList, toastOptions]
  );

  const showError = useCallback(() => {
    if (!apiWorking) {
      toast.error("API is not working", toastOptions);
    }
    if (error) {
      toast.error(error, toastOptions);
    }
  }, [apiWorking, error, toastOptions]);

  useEffect(() => {
    if (error) {
      showError();
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, showError]);

  const value = useMemo(
    () => ({
      apiWorking,
      setApiWorking,
      RawData,
      searchTerm,
      setSearchTerm,
      Filter,
      setFilter,
      currFilterOption,
      setFilterOption,
      cookList,
      setCookList,
      removeFromCookList,
      doesContain,
      saveRecipe,
      showError,
      error,
      setError,
    }),
    [
      apiWorking,
      RawData,
      searchTerm,
      Filter,
      currFilterOption,
      cookList,
      removeFromCookList,
      doesContain,
      saveRecipe,
      showError,
      error,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
