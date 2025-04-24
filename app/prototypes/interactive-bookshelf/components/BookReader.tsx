"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const totalPages = book.content.length;
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className={styles.readerContainer}>
      <motion.div 
        className={styles.readerHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className={styles.backButton} onClick={onClose}>
          ← Back to Bookshelf
        </button>
        <h2>{book.title}</h2>
        <p className={styles.authorName}>by {book.author}</p>
      </motion.div>
      
      <motion.div 
        className={styles.contentArea}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.pageContent}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 0 ? (
              <h3 className={styles.chapterTitle}>{book.content[currentPage]}</h3>
            ) : (
              <p className={styles.paragraphText}>{book.content[currentPage]}</p>
            )}
          </motion.div>
          
          <div className={styles.pageNavigation}>
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className={`${styles.navButton} ${currentPage === 0 ? styles.disabled : ''}`}
            >
              Previous
            </button>
            <span className={styles.pageIndicator}>
              {currentPage} of {totalPages - 1}
            </span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages - 1}
              className={`${styles.navButton} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.commentsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
};

export default BookReader; 