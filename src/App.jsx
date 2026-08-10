import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './MenuContext';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}
