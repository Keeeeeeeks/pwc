"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './GratitudeForm.module.css';

interface GratitudeFormProps {
  onSubmit: (text: string) => void;
  currentStep: 'activity' | 'gratitude';
}

export default function GratitudeForm({ onSubmit, currentStep }: GratitudeFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.form 
      className={styles.form}
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      key={currentStep}
    >
      <motion.textarea
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          currentStep === 'activity'
            ? "Type an activity that brought you joy today..."
            : "Express what you're grateful for..."
        }
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
        className={styles.submitButton}
        type="submit"
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        Celebrate {currentStep === 'activity' ? 'this moment' : 'gratitude'}
      </motion.button>
    </motion.form>
  );
} 