import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import QRPage from './pages/QRPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jalsacorner" element={<MenuPage />} />
        <Route path="/jalsacorner/qr" element={<QRPage />} />
      </Routes>
    </BrowserRouter>
  );
}
