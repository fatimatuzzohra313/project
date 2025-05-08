import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isGlass?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isGlass = false }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }
      } : {}}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
      className={`
        ${isGlass ? 'backdrop-blur-xl bg-white/10 dark:bg-gray-800/10' : 'bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900'}
        rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        border border-gray-100/20 dark:border-gray-700/20
        transform-gpu perspective-1000
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        transition-all duration-500
        ${className}
      `}
    >
      <div className="relative overflow-hidden rounded-[2rem] h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;