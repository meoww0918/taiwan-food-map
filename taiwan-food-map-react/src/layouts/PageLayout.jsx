import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav.jsx';
import Footer from '../components/Footer.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.22, ease: 'easeOut' };

export default function PageLayout({ children, bottomPadding = 'pb-36 lg:pb-32' }) {
  return (
    <motion.div
      className={`max-w-[874px] lg:max-w-[1180px] mx-auto ${bottomPadding} relative`}
      style={{ backgroundColor: 'transparent', zIndex: 1 }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
      <Footer />
      <BottomNav />
    </motion.div>
  );
}
