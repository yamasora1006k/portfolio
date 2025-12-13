import Header from "./components/shared/Header";
import Tech from "./components/Tech/Tech";
import Activity from "./components/Activity/Activity";
import Footer from "./components/shared/Footer";

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useShortcut } from "./components/shared/shortcut";

/* ここが Router 内で動く本体 */
function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useShortcut("ArrowLeft", () => {
    if (location.pathname === "/") {
      navigate("/act");
    } else if (location.pathname === "/act") {
      navigate("/");
    }
  });

  useShortcut("ArrowRight", () => {
    if (location.pathname === "/") {
      navigate("/act");
    } else if (location.pathname === "/act") {
      navigate("/");
    }
  });

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Tech />} />
        <Route path="/act" element={<Activity />} />
      </Routes>
    </AnimatePresence>
  );
}

/* App は Router の殻だけ */
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
