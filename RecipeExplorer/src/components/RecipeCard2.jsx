import React from "react";

function RecipeCard2({ RecipeObj }) {
  console.log(RecipeObj);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <img 
          className="h-48 w-full object-cover" 
          src={RecipeObj.image || "/api/placeholder/400/300"} 
          alt={RecipeObj.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
        <div className="absolute top-2 right-2">
          <div className="bg-yellow-400 text-gray-900 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
            <span className="mr-1">★</span>
            <span>{RecipeObj.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <h2 className="text-lg font-bold text-white line-clamp-2">{RecipeObj.name}</h2>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between mb-3">
            <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">{RecipeObj.cuisine}</span>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${
              RecipeObj.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              RecipeObj.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {RecipeObj.difficulty}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center">
              <p className="text-xs text-gray-500">Prep</p>
              <p className="font-semibold text-sm">{RecipeObj.prepTimeMinutes}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Cook</p>
              <p className="font-semibold text-sm">{RecipeObj.cookTimeMinutes}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Serves</p>
              <p className="font-semibold text-sm">{RecipeObj.servings}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Cal</p>
              <p className="font-semibold text-sm">{RecipeObj.caloriesPerServing}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-1">INGREDIENTS</p>
            <ul className="space-y-1">
              {RecipeObj.ingredients && RecipeObj.ingredients.slice(0, 2).map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block h-1 w-1 rounded-full bg-green-500 mt-2 mr-2"></span>
                  <span className="text-sm text-gray-700 line-clamp-1">{ingredient}</span>
                </li>
              ))}
              {RecipeObj.ingredients && RecipeObj.ingredients.length > 2 && (
                <li className="text-xs text-blue-600 font-medium">+{RecipeObj.ingredients.length - 2} more ingredients</li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex flex-wrap mb-3">
            {RecipeObj.tags && RecipeObj.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 mr-1 mb-1">
                #{tag}
              </span>
            ))}
            {RecipeObj.mealType && RecipeObj.mealType.slice(0, 1).map((meal, index) => (
              <span key={index} className="bg-blue-100 rounded-full px-2 py-1 text-xs text-blue-700 mr-1 mb-1">
                {meal}
              </span>
            ))}
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            View Recipe
          </button>
        </div>
      </div>
      
      {/* 
      {"id":1,"name":"Classic Margherita Pizza","ingredients":["Pizza dough","Tomato sauce","Fresh mozzarella cheese","Fresh basil leaves","Olive oil","Salt and pepper to taste"],"instructions":["Preheat the oven to 475°F (245°C).","Roll out the pizza dough and spread tomato sauce evenly.","Top with slices of fresh mozzarella and fresh basil leaves.","Drizzle with olive oil and season with salt and pepper.","Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.","Slice and serve hot."],"prepTimeMinutes":20,"cookTimeMinutes":15,"servings":4,"difficulty":"Easy","cuisine":"Italian","caloriesPerServing":300,"tags":["Pizza","Italian"],"userId":166,"image":"https://cdn.dummyjson.com/recipe-images/1.webp","rating":4.6,"reviewCount":98,"mealType":["Dinner"]}
      */}
    </div>
  );
}

export default RecipeCard2;