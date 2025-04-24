"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';
import GratitudeForm from './components/GratitudeForm';
import GratitudeBubble from './components/GratitudeBubble';
import { useSpring } from 'framer-motion';

interface GratitudeEntry {
  id: string;
  text: string;
  category: 'activity' | 'gratitude';
  color: string;
}

export default function TodaysJoy() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [currentStep, setCurrentStep] = useState<'activity' | 'gratitude'>('activity');
  const springRotation = useSpring(0, {
    stiffness: 100,
    damping: 10
  });

  const colors = [
    '#FF61D8', // Pink
    '#FF8B3D', // Orange
    '#FFD93D', // Yellow
    '#4D4DFF', // Blue
    '#6BCB77', // Green
    '#9B4DFF', // Purple
    '#FF4D4D', // Red
  ];

  const addEntry = (text: string) => {
    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      text,
      category: currentStep,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setEntries([...entries, newEntry]);
    springRotation.set(springRotation.get() + 360);

    if (currentStep === 'activity') {
      setCurrentStep('gratitude');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <motion.header 
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          <h1>Today's Joy</h1>
          <motion.div 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {currentStep === 'activity' ? 
              "What did you do today that brought you joy?" :
              "What are you grateful for in this moment?"
            }
          </motion.div>
        </motion.header>

        <div className={styles.formSection}>
          <GratitudeForm onSubmit={addEntry} currentStep={currentStep} />
        </div>

        <motion.div 
          className={styles.bubblesContainer}
          style={{ rotate: springRotation }}
        >
          <AnimatePresence mode="popLayout">
            {entries.map((entry) => (
              <GratitudeBubble
                key={entry.id}
                entry={entry}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {entries.length === 0 && (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            Share your first moment of joy...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 