"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './styles.module.css';
import Bookshelf from './components/Bookshelf';
import BookReader from './components/BookReader';

// Sample book data
const books = [
  {
    id: '1',
    title: 'The Shadow\'s Edge',
    author: 'Eleanor Wright',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000',
    description: 'A thrilling adventure into the unknown realms of shadow and light.',
    content: [
      'Chapter 1: The Beginning',
      'The shadows crept along the wall as Maya watched, heart pounding. She had always been told the shadows were just an absence of light, but now she knew better. They moved with purpose, with intent.',
      'She took a deep breath and stepped forward, her fingers outstretched toward the dancing darkness. "I see you," she whispered.',
      'And somehow, impossibly, the shadows seemed to see her too.'
    ],
    comments: [
      { user: 'BookLover42', text: 'This opening chapter gave me chills!' },
      { user: 'NightReader', text: 'The way the author describes the shadows makes them feel almost alive. Can\'t wait to read more!' },
      { user: 'LitCritic88', text: 'Interesting premise, though the protagonist seems a bit too eager to interact with the unknown.' }
    ]
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    author: 'Marcus Chen',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
    description: 'When time begins to fracture, one woman discovers she can hear echoes of future events.',
    content: [
      'Chapter 1: Whispers',
      'The first time Eliza heard tomorrow, she was standing in line for coffee. A whisper, soft but distinct: "Don\'t forget your umbrella."',
      'She glanced around, but no one was speaking to her. The barista called her name, and she collected her latte, puzzled but ultimately dismissive.',
      'It was only when she stepped outside into an unexpected downpour that the words came back to her. By then, of course, it was too late.'
    ],
    comments: [
      { user: 'TimeWanderer', text: 'The concept of hearing the future is so unique!' },
      { user: 'CoffeeLover', text: 'I love how such an extraordinary ability is introduced in such an ordinary setting.' },
      { user: 'SciFiNerd', text: 'The subtle way the power manifests is much more believable than dramatic visions.' }
    ]
  },
  {
    id: '3',
    title: 'The Code of Flowers',
    author: 'Sophia Patel',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000',
    description: 'In Victorian England, a young botanist discovers an ancient language hidden in floral arrangements.',
    content: [
      'Chapter 1: The Unusual Bouquet',
      'Miss Charlotte Winters adjusted her spectacles as she examined the peculiar arrangement of flowers that had been delivered to her doorstep that morning. No card, no sender\'s name—just an assortment of blooms that made absolutely no sense together.',
      '"Foxglove with primrose? And nightshade alongside daisies?" she muttered, circling the vase. "No one with any knowledge of the language of flowers would create such a contradictory bouquet."',
      'Unless, of course, contradiction was precisely the point.'
    ],
    comments: [
      { user: 'FlowerChild', text: 'The historical details about Victorian flower language are fascinating!' },
      { user: 'MysteryReader', text: 'I\'m already trying to decode what the bouquet might mean.' },
      { user: 'HistoryBuff', text: 'The author\'s research into the period really shows. Excellent atmospheric writing.' }
    ]
  },
];

// Define Book type to fix type error
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  content: string[];
  comments: { user: string; text: string; }[];
}

export default function InteractiveBookshelf() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {selectedBook ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.neuReader}
          >
            <BookReader 
              book={selectedBook} 
              onClose={() => setSelectedBook(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="bookshelf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.neuContainer}
          >
            <header className={styles.header}>
              <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className={styles.neuTitle}
              >
                Interactive Bookshelf
              </motion.h1>
            </header>
            <main className={styles.main}>
              <Bookshelf books={books} onSelectBook={setSelectedBook} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 