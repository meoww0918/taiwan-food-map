import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home.jsx';
import FoodMap from './pages/FoodMap.jsx';
import Challenge from './pages/Challenge.jsx';
import Contact from './pages/Contact.jsx';
import StreetMap from './pages/StreetMap.jsx';
import SurvivalTools from './pages/SurvivalTools.jsx';
import Music from './pages/Music.jsx';
import NotFound from './pages/NotFound.jsx';
import PaperGrain from './components/PaperGrain.jsx';
import PageTransitionMask from './components/PageTransitionMask.jsx';
import MascotPeek from './components/MascotPeek.jsx';
import CatEasterEgg from './components/CatEasterEgg.jsx';
import OnboardingBubble from './components/OnboardingBubble.jsx';

export default function App() {
  const location = useLocation();
  return (
    <div style={{ position: 'relative' }}>
      <PaperGrain />
      <PageTransitionMask />
      <MascotPeek />
      <CatEasterEgg position="left" />
      {location.pathname === '/' && <OnboardingBubble />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/food-map" element={<FoodMap />} />
          <Route path="/street-map" element={<StreetMap />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/survival-tools" element={<SurvivalTools />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/music" element={<Music />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
