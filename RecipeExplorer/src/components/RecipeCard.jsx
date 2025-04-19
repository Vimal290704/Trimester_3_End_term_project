import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

function RecipeCard({ RecipeObj }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { removeFromCookList, saveRecipe, doesContain } =
    useContext(DataContext);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        <div className="relative">
          {doesContain(RecipeObj) ? (
            <button
              className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 text-sm font-bold flex items-center shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-3 focus:ring-red-400 focus:ring-offset-2 z-10 backdrop-filter backdrop-blur-sm bg-opacity-90"
              onClick={() => removeFromCookList(RecipeObj.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              REMOVE
            </button>
          ) : (
            <button
              onClick={(e) => {
                saveRecipe(RecipeObj, e);
              }}
              className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-5 py-2 text-sm font-bold flex items-center shadow-lg transition-all duration-300 transform hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-offset-2 z-10 backdrop-filter backdrop-blur-sm bg-opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              SAVE
            </button>
          )}
          <img
            className="h-52 w-full object-cover"
            src={RecipeObj.image || "/api/placeholder/400/300"}
            alt={RecipeObj.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
          <div className="absolute top-3 right-3">
            <div className="bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-sm font-bold flex items-center shadow-md">
              <span className="mr-1">★</span>
              <span>{RecipeObj.rating}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-xl font-bold text-white line-clamp-2 drop-shadow-sm">
              {RecipeObj.name}
            </h2>
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between mb-4">
              <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                {RecipeObj.cuisine}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  RecipeObj.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : RecipeObj.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {RecipeObj.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 bg-gray-50 rounded-lg p-3">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Prep
                </p>
                <p className="font-semibold">{RecipeObj.prepTimeMinutes}m</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Cook
                </p>
                <p className="font-semibold">{RecipeObj.cookTimeMinutes}m</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Serves
                </p>
                <p className="font-semibold">{RecipeObj.servings}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Cal
                </p>
                <p className="font-semibold">{RecipeObj.caloriesPerServing}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Ingredients
              </p>
              <ul className="space-y-2">
                {RecipeObj.ingredients &&
                  RecipeObj.ingredients.slice(0, 2).map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      <span className="text-sm text-gray-700 line-clamp-1">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                {RecipeObj.ingredients && RecipeObj.ingredients.length > 2 && (
                  <li className="text-xs text-blue-600 font-medium pl-4">
                    +{RecipeObj.ingredients.length - 2} more ingredients
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 mb-4">
              {RecipeObj.tags &&
                RecipeObj.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              {RecipeObj.mealType &&
                RecipeObj.mealType.slice(0, 1).map((meal, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 rounded-full px-2 py-1 text-xs text-blue-700"
                  >
                    {meal}
                  </span>
                ))}
            </div>
            <button
              onClick={openModal}
              className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 modal-overlay"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl my-8 mx-4 overflow-hidden flex flex-col animate-fadeIn">
            <div className="relative">
              <img
                className="w-full h-72 object-cover"
                src={RecipeObj.image || "/api/placeholder/400/300"}
                alt={RecipeObj.name}
              />
              <button
                onClick={closeModal}
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
                  {RecipeObj.name}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-sm font-bold flex items-center mr-3 shadow-md">
                    <span className="mr-1">★</span>
                    <span>{RecipeObj.rating}</span>
                  </div>
                  <span className="text-white text-sm drop-shadow-md">
                    ({RecipeObj.reviewCount} reviews)
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
                      {RecipeObj.prepTimeMinutes} mins
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
                      {RecipeObj.cookTimeMinutes} mins
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
                    <p className="font-medium text-lg">{RecipeObj.servings}</p>
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
                      {RecipeObj.caloriesPerServing} kcal
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    RecipeObj.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : RecipeObj.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {RecipeObj.difficulty}
                </span>
                <span className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-800">
                  {RecipeObj.cuisine}
                </span>
                {RecipeObj.mealType &&
                  RecipeObj.mealType.map((meal, index) => (
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
                  {RecipeObj.ingredients &&
                    RecipeObj.ingredients.map((ingredient, index) => (
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
                  {RecipeObj.instructions &&
                    RecipeObj.instructions.map((step, index) => (
                      <li key={index} className="flex group">
                        <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{step}</p>
                      </li>
                    ))}
                </ol>
              </div>
              {RecipeObj.tags && RecipeObj.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {RecipeObj.tags.map((tag, index) => (
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
                onClick={closeModal}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Close
              </button>
              <div>
                {doesContain(RecipeObj) ? (
                  <button
                    onClick={() => {
                      removeFromCookList(RecipeObj.id);
                    }}
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md mr-2"
                  >
                    Remove Recipe
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      saveRecipe(RecipeObj, e);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md mr-2"
                  >
                    Save Recipe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCard;
