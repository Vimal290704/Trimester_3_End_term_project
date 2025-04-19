import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const CookingList = () => {
  const navigate = useNavigate();
  const { cookList, removeFromCookList } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    let result = [...cookList];
    if (searchTerm) {
      result = result.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (recipe.cuisine &&
            recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (recipe.tags &&
            recipe.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }
    result.sort((a, b) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "prepTime":
          return a.prepTimeMinutes - b.prepTimeMinutes;
        case "cookTime":
          return a.cookTimeMinutes - b.cookTimeMinutes;
        case "calories":
          return a.caloriesPerServing - b.caloriesPerServing;
        default:
          return 0;
      }
    });
    setFilteredRecipes(result);
  }, [cookList, searchTerm, sortOption]);

  const clearAllRecipes = () => {
    if (window.confirm("Are you sure you want to clear your cooking list?")) {
      cookList.forEach((recipe) => removeFromCookList(recipe.id));
    }
  };

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    document.body.style.overflow = "hidden";
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
    document.body.style.overflow = "auto";
  };

  const totalCookingTime = filteredRecipes.reduce(
    (total, recipe) => total + recipe.prepTimeMinutes + recipe.cookTimeMinutes,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Cooking List
          </h1>
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {cookList.length} {cookList.length === 1 ? "Recipe" : "Recipes"}
            </span>
            {cookList.length > 0 && (
              <button
                onClick={clearAllRecipes}
                className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition-colors duration-300"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {cookList.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your cooking list is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some delicious recipes to get started!
            </p>
            <button
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              onClick={() => navigate("/")}
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search recipes by name, cuisine, or tags..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="prepTime">Sort by Prep Time</option>
                  <option value="cookTime">Sort by Cook Time</option>
                  <option value="calories">Sort by Calories</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-600 font-medium uppercase">
                  Total Recipes
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {filteredRecipes.length}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-green-600 font-medium uppercase">
                  Total Cooking Time
                </p>
                <p className="text-2xl font-bold text-green-800">
                  {totalCookingTime} mins
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-sm text-yellow-600 font-medium uppercase">
                  Avg. Rating
                </p>
                <p className="text-2xl font-bold text-yellow-800">
                  {filteredRecipes.length > 0
                    ? (
                        filteredRecipes.reduce(
                          (sum, recipe) => sum + recipe.rating,
                          0
                        ) / filteredRecipes.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-purple-600 font-medium uppercase">
                  Avg. Calories
                </p>
                <p className="text-2xl font-bold text-purple-800">
                  {filteredRecipes.length > 0
                    ? Math.round(
                        filteredRecipes.reduce(
                          (sum, recipe) => sum + recipe.caloriesPerServing,
                          0
                        ) / filteredRecipes.length
                      )
                    : "0"}
                </p>
              </div>
            </div>
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No recipes found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative">
                      <img
                        className="h-48 w-full object-cover"
                        src={recipe.image || "/api/placeholder/400/300"}
                        alt={recipe.name}
                        onClick={() => openRecipeDetails(recipe)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-sm font-bold flex items-center shadow-md">
                          <span className="mr-1">★</span>
                          <span>{recipe.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCookList(recipe.id)}
                        className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Remove recipe"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h2
                          className="text-xl font-bold text-white line-clamp-2 drop-shadow-sm cursor-pointer"
                          onClick={() => openRecipeDetails(recipe)}
                        >
                          {recipe.name}
                        </h2>
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between mb-3">
                          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                            {recipe.cuisine}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                              recipe.difficulty === "Easy"
                                ? "bg-green-100 text-green-800"
                                : recipe.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {recipe.difficulty}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-3 bg-gray-50 rounded-lg p-3">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Prep
                            </p>
                            <p className="font-semibold">
                              {recipe.prepTimeMinutes}m
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Cook
                            </p>
                            <p className="font-semibold">
                              {recipe.cookTimeMinutes}m
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Serves
                            </p>
                            <p className="font-semibold">{recipe.servings}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Cal
                            </p>
                            <p className="font-semibold">
                              {recipe.caloriesPerServing}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {recipe.tags &&
                            recipe.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>

                        <button
                          onClick={() => openRecipeDetails(recipe)}
                          className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              closeRecipeDetails();
            }
          }}
        >
          <div className="modal-overlay absolute inset-0"></div>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl my-8 mx-4 overflow-hidden flex flex-col relative z-10 animate-fadeIn">
            <div className="relative">
              <img
                className="w-full h-72 object-cover"
                src={selectedRecipe.image || "/api/placeholder/400/300"}
                alt={selectedRecipe.name}
              />
              <button
                onClick={closeRecipeDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  {selectedRecipe.name}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-sm font-bold flex items-center mr-3 shadow-md">
                    <span className="mr-1">★</span>
                    <span>{selectedRecipe.rating}</span>
                  </div>
                  <span className="text-white text-sm drop-shadow-md">
                    ({selectedRecipe.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div
              className="overflow-y-auto p-8 flex-grow"
              style={{ maxHeight: "calc(85vh - 300px)" }}
            >
              <div className="flex flex-wrap gap-6 mb-8 bg-gray-50 rounded-xl p-4 shadow-inner">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Prep Time
                    </p>
                    <p className="font-medium text-lg">
                      {selectedRecipe.prepTimeMinutes} mins
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Cook Time
                    </p>
                    <p className="font-medium text-lg">
                      {selectedRecipe.cookTimeMinutes} mins
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Servings
                    </p>
                    <p className="font-medium text-lg">
                      {selectedRecipe.servings}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Calories
                    </p>
                    <p className="font-medium text-lg">
                      {selectedRecipe.caloriesPerServing} kcal
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    selectedRecipe.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : selectedRecipe.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedRecipe.difficulty}
                </span>
                <span className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-800">
                  {selectedRecipe.cuisine}
                </span>
                {selectedRecipe.mealType &&
                  selectedRecipe.mealType.map((meal, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 rounded-full px-4 py-2 text-sm font-medium text-blue-800"
                    >
                      {meal}
                    </span>
                  ))}
              </div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Ingredients
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRecipe.ingredients &&
                    selectedRecipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3"></span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Instructions
                </h3>
                <ol className="space-y-6">
                  {selectedRecipe.instructions &&
                    selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex group">
                        <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{step}</p>
                      </li>
                    ))}
                </ol>
              </div>
              {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-8 py-4 flex justify-between border-t border-gray-200">
              <button
                onClick={closeRecipeDetails}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Close
              </button>
              <div>
                <button
                  onClick={() => removeFromCookList(selectedRecipe.id)}
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md mr-2"
                >
                  Remove Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookingList;
