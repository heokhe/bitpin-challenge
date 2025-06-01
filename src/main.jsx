import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/home/home.jsx';
import MarketPage from './pages/market/market.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market/:id" element={<MarketPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
