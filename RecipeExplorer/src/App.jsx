import React, { lazy, Suspense } from "react";
import { DataProvider } from "./context/DataContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const NavBar = lazy(() => import("./components/NavBar"));
const Home = lazy(() => import("./components/Home"));
const CookingList = lazy(() => import("./components/CookingList"));

const App = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cookinglist" element={<CookingList />} />
          </Routes>
        </Suspense>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
