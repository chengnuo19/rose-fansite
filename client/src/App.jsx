import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSiteTheme } from "./hooks/useSiteTheme";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const { theme, setTheme } = useSiteTheme();

  return (
    <div className={`theme-shell min-h-screen bg-mesh-dark theme-${theme}`}>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} onThemeChange={setTheme} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}
