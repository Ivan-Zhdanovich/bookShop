import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage';
import { NewReleasesPage } from './pages/NewReleasesPage';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/homePage/HomePage';


function App() {
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path= "/" element={ <HomePage/> } />
      <Route path= "/favourites" element={ <FavouritesPage/> } />
      <Route path= "/newReleases" element={ <NewReleasesPage/> } />
    </Routes>
    </>
  );
}

export default App;
