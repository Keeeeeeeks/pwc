"use client";

import { motion } from 'framer-motion';
import styles from './Bookshelf.module.css';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  content: string[];
  comments: { user: string; text: string; }[];
}

interface BookshelfProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const Bookshelf: React.FC<BookshelfProps> = ({ books, onSelectBook }) => {
  return (
    <div className={styles.bookshelfContainer}>
      <motion.div 
        className={styles.bookGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {books.map((book) => (
          <motion.div 
            key={book.id} 
            className={styles.bookCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
            }}
          >
            <div className={styles.bookCover}>
              <img src={book.cover} alt={`Cover of ${book.title}`} />
            </div>
            <div className={styles.bookInfo}>
              <h3>{book.title}</h3>
              <p className={styles.author}>by {book.author}</p>
              <p className={styles.description}>{book.description}</p>
              <motion.button 
                className={styles.readButton}
                onClick={() => onSelectBook(book)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Bookshelf; 