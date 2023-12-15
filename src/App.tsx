import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { FavouritesPage } from './pages/favouritesPage/FavouritesPage';
import { NewReleasesPage } from './pages/newReleasesPage';
import { Navigation } from './components/navigation';


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
