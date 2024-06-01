import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FrancesinhasPage from './pages/FrancesinhasPage';
import RestaurantsPage from './pages/RestaurantsPage';
import IngredientsPage from './pages/IngredientsPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/francesinhas" element={<FrancesinhasPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
