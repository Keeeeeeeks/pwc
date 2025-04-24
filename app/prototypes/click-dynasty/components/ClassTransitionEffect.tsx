"use client";

import { motion } from 'framer-motion';
import styles from '../styles.module.css';

interface ClassTransitionEffectProps {
  previousClass: 'Bronze' | 'Silver' | 'Gold';
  currentClass: 'Bronze' | 'Silver' | 'Gold';
}

const classColors = {
  Bronze: '#CD7F32',
  Silver: '#C0C0C0',
  Gold: '#FFD700'
};

export default function ClassTransitionEffect({ previousClass, currentClass }: ClassTransitionEffectProps) {
  const isPromotion = 
    (previousClass === 'Bronze' && currentClass === 'Silver') ||
    (previousClass === 'Silver' && currentClass === 'Gold');

  return (
    <motion.div
      className={styles.transitionEffect}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.transitionContent}
        style={{
          background: `linear-gradient(45deg, ${classColors[previousClass]}, ${classColors[currentClass]})`
        }}
      >
        <h2 className={styles.transitionTitle}>
          {isPromotion ? 'Promoted!' : 'Class Changed!'}
        </h2>
        <div className={styles.transitionClasses}>
          <span style={{ color: classColors[previousClass] }}>{previousClass}</span>
          <motion.span 
            className={styles.transitionArrow}
            initial={{ x: -10 }}
            animate={{ x: 10 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          >
            →
          </motion.span>
          <span style={{ color: classColors[currentClass] }}>{currentClass}</span>
        </div>
      </motion.div>
    </motion.div>
  );
} 