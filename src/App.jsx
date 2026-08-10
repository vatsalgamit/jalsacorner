import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './MenuContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jalsacorner" element={<MenuPage />} />
          <Route path="/jalsacorner/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}
