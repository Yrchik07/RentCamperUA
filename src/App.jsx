import { Navigate, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/Catalog/CatalogPage.jsx';

import './App.css'
import HomePage from './pages/Home/HomePage.jsx';
import FavoritesPage from './pages/Favorites/FavoritesPage.jsx';
import Modal from 'react-modal';

Modal.setAppElement("#root");
function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App
