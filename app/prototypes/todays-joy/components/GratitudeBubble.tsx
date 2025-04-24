"use client";

import { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import styles from './GratitudeBubble.module.css';

interface GratitudeBubbleProps {
  entry: {
    id: string;
    text: string;
    category: 'activity' | 'gratitude';
    color: string;
  };
  style?: CSSProperties;
}

export default function GratitudeBubble({ entry, style }: GratitudeBubbleProps) {
  const bubbleVariants = {
    initial: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    animate: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      rotate: -5
    }
  };

  const shimmerVariants = {
    initial: { backgroundPosition: "200% 0" },
    animate: { 
      backgroundPosition: "-200% 0",
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className={styles.bubble}
      style={{
        ...style,
        backgroundColor: entry.color,
      }}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      <motion.div 
        className={styles.shimmer}
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
      <span className={styles.category}>
        {entry.category === 'activity' ? '✨' : '💝'}
      </span>
      <p className={styles.text}>{entry.text}</p>
    </motion.div>
  );
} 