import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeaderLink({ className = '-mt-[25px] lg:-mt-[60px]', alt = '回首頁' }) {
  return (
    <Link to="/" className="block">
      <motion.img
        src="/assets/header.png"
        className={`w-full block ${className}`}
        alt={alt}
        whileHover={{ scale: 1.005 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      />
    </Link>
  );
}
