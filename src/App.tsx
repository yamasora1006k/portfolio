import Tech from "./components/Tech/Tech";
import Activity from "./components/Activity/Activity";
import Footer from "./components/shared/Footer";
import Aboutme from "./components/Aboutme/Aboutme";
import { HashRouter, Routes, Route, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useShortcut } from "./components/shared/shortcut";
import Header from "./components/shared/Header";
import ThreeBackground from "./components/ThreeBackground";

/* ここが Router 内で動く本体 */
function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();

  useShortcut("ArrowLeft", () => {
    if (location.pathname === "/") navigate("/act");
    else if (location.pathname === "/act") navigate("/");
  });

  useShortcut("ArrowRight", () => {
    if (location.pathname === "/") navigate("/act");
    else if (location.pathname === "/act") navigate("/");
  });

  // ホーム("/")への遷移で、かつ内部リンク(PUSH)からの場合のみトップ要素を飛ばす(120)
  // 直アクセスやリロード(POP)の場合はトップから表示(0)
  const targetY = location.pathname === "/" && navType === "PUSH" ? 580 : 0;

  return (
    <>
      <ScrollTo locationY={targetY} />
      <Header location={location.pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/tech" element={<Tech />} />
          <Route path="/act" element={<Activity />} />
          <Route path="/" element={<Aboutme />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}



import ScrollTo from "./components/shared/ScrollTo";

/* App は Router の殻だけ */
export default function App() {
  return (
    <HashRouter>
      <ThreeBackground />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  );
}
