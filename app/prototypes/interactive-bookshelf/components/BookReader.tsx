"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BookReader.module.css';

interface Comment {
  user: string;
  text: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  content: string[];
  comments: Comment[];
}

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const totalPages = book.content.length;
  const contentRef = useRef<HTMLDivElement>(null);
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection('left');
      setCurrentPage(currentPage + 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setDirection('right');
      setCurrentPage(currentPage - 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value);
    setDirection(newPage > currentPage ? 'left' : 'right');
    setCurrentPage(newPage);
    contentRef.current?.scrollTo(0, 0);
  };

  // Page turning variants
  const pageVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      rotateY: direction === 'right' ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        rotateY: { duration: 0.4 }
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
      rotateY: direction === 'right' ? 15 : -15,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        rotateY: { duration: 0.4 }
      }
    })
  };
  
  return (
    <motion.div 
      className={styles.readerContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.glassHeader}>
        <button className={styles.backButton} onClick={onClose}>
          <span className={styles.icon}>←</span> Back
        </button>
        <div className={styles.bookInfo}>
          <span className={styles.bookIcon}>📖</span>
          <div>
            <h2>{book.title}</h2>
            <p className={styles.authorName}>by {book.author}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.contentArea} ref={contentRef}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            className={styles.pageContent}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
          >
            {currentPage === 0 ? (
              <h3 className={styles.chapterTitle}>{book.content[currentPage]}</h3>
            ) : (
              <p className={styles.paragraphText}>{book.content[currentPage]}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.playerBar}>
        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={totalPages - 1}
            value={currentPage}
            onChange={handleSliderChange}
            className={styles.progressSlider}
          />
          <div className={styles.pageInfo}>
            <span>Page {currentPage + 1}</span>
            <span>of {totalPages}</span>
          </div>
        </div>
        
        <div className={styles.controls}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className={styles.controlButton}
            aria-label="Previous page"
          >
            <span className={styles.icon}>←</span>
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1}
            className={styles.controlButton}
            aria-label="Next page"
          >
            <span className={styles.icon}>→</span>
          </button>
        </div>
      </div>

      <motion.div 
        className={styles.commentsSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className={styles.commentsTitle}>Reader Comments</h3>
        <div className={styles.commentsList}>
          {book.comments.map((comment, index) => (
            <motion.div 
              key={index} 
              className={styles.commentCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className={styles.commentHeader}>
                <span className={styles.userName}>{comment.user}</span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookReader; 