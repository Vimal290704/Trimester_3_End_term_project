/* eslint-disable no-unused-vars */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { DataContext } from "../context/DataContext";
import RecipeCard from "./RecipeCard";
import FilterOption from "./FilterOption";

const Home = () => {
  const {
    apiWorking,
    RawData,
    searchTerm,
    Filter,
    setFilter,
    currFilterOption,
    showError,
    error: contextError,
    setError: setContextError,
  } = useContext(DataContext);

  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(() => {
    const data = localStorage.getItem("Recipe");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse Recipe from localStorage:", e);
        setLocalError(e.message || "Error loading recipes");
        return [];
      }
    }
    return [];
  });

  const error = localError || contextError;

  const extractFilterOptions = useCallback((recipeData) => {
    if (!recipeData || !Array.isArray(recipeData) || recipeData.length === 0) {
      return ["All"];
    }

    const cuisines = new Set();
    const difficulties = new Set();
    const mealTypes = new Set();

    recipeData.forEach((item) => {
      if (item && item.cuisine) cuisines.add(item.cuisine);
      if (item && item.difficulty) difficulties.add(item.difficulty);

      if (item && Array.isArray(item.mealType)) {
        item.mealType.forEach((type) => type && mealTypes.add(type));
      } else if (item && item.mealType) {
        mealTypes.add(item.mealType);
      }
    });

    return [
      "All",
      ...Array.from(cuisines),
      ...Array.from(difficulties),
      ...Array.from(mealTypes),
    ].sort();
  }, []);

  useEffect(() => {
    if (recipe && recipe.length > 0) {
      const filterOptions = extractFilterOptions(recipe);
      const currentFiltersSorted =
        Filter && Array.isArray(Filter) ? [...Filter].sort() : [];
      const areEqual =
        JSON.stringify(filterOptions) === JSON.stringify(currentFiltersSorted);
      if (!areEqual) {
        setFilter(filterOptions);
      }
    }
  }, [recipe, setFilter, Filter, extractFilterOptions]);

  const fetchRawData = useCallback(async () => {
    try {
      const data = await RawData();
      if (Array.isArray(data)) {
        setRecipe(data);
        try {
          localStorage.setItem("Recipe", JSON.stringify(data));
        } catch (storageErr) {
          console.error("Failed to save recipes to localStorage:", storageErr);
        }
      } else {
        throw new Error("Invalid data format received");
      }
      setLocalError(null);
    } catch (err) {
      console.error("Error fetching raw data:", err);
      setLocalError(err.message || "Failed to fetch recipes");
      setContextError(err.message || "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  }, [RawData, setContextError]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      if (apiWorking) {
        const getRecipeFunc = window.getRecipe || RawData;
        const data = await getRecipeFunc();

        if (Array.isArray(data)) {
          setRecipe(data);
          try {
            localStorage.setItem("Recipe", JSON.stringify(data));
          } catch (storageErr) {
            console.error(
              "Failed to save recipes to localStorage:",
              storageErr
            );
          }
          setLocalError(null);
        } else {
          throw new Error("Invalid data format received");
        }
      } else {
        await fetchRawData();
      }
    } catch (err) {
      console.error("Error in fetchRecipes:", err);
      await fetchRawData();
    } finally {
      setLoading(false);
    }
  }, [apiWorking, RawData, fetchRawData]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (!apiWorking && recipe.length === 0) {
      showError();
    }
  }, [apiWorking, recipe, showError]);

  const filteredRecipes = useMemo(() => {
    if (!recipe || !Array.isArray(recipe)) return [];

    return recipe.filter((recipeObj) => {
      if (!recipeObj) return false;

      const matchesFilter =
        currFilterOption === "All" ||
        recipeObj.cuisine === currFilterOption ||
        recipeObj.difficulty === currFilterOption ||
        (Array.isArray(recipeObj.mealType) &&
          recipeObj.mealType.includes(currFilterOption)) ||
        (!Array.isArray(recipeObj.mealType) &&
          recipeObj.mealType === currFilterOption);

      const matchesSearch =
        recipeObj.name &&
        recipeObj.name.toLowerCase().includes((searchTerm || "").toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [recipe, currFilterOption, searchTerm]);

  const loadingCards = useMemo(() => {
    return [...Array(30)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-100 rounded-lg h-64 animate-pulse"
      ></div>
    ));
  }, []);

  const renderRecipeCards = useMemo(() => {
    if (!filteredRecipes.length) {
      return (
        <div className="col-span-3 text-center py-10">
          <p className="text-gray-500">
            No recipes found matching your criteria.
          </p>
        </div>
      );
    }

    return filteredRecipes.map((recipeObj, index) => (
      <div key={`recipe-${recipeObj.id || index}`}>
        <RecipeCard RecipeObj={recipeObj} />
      </div>
    ));
  }, [filteredRecipes]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {Filter && Filter.length > 0 ? (
          Filter.map((option, index) => (
            <FilterOption key={`filter-${index}`} option={option} />
          ))
        ) : (
          <div className="text-gray-500">Loading filters...</div>
        )}
      </div>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? loadingCards : renderRecipeCards}
      </div>
    </div>
  );
};

export default Home;
