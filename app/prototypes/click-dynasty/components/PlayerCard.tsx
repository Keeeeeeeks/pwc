"use client";

import { motion } from 'framer-motion';
import styles from '../styles.module.css';

interface Player {
  id: string;
  name: string;
  clicks: number;
  isUser: boolean;
}

interface PlayerCardProps {
  player: Player;
  rank: number;
  className: 'Bronze' | 'Silver' | 'Gold';
}

export default function PlayerCard({ player, rank, className }: PlayerCardProps) {
  return (
    <motion.div 
      className={styles.playerCard}
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      style={{
        backgroundColor: player.isUser ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
      }}
    >
      <div className={styles.playerRank}>#{rank}</div>
      <div className={styles.playerInfo}>
        <div className={styles.playerName}>
          {player.name}
          {player.isUser && <span className={styles.userBadge}>You</span>}
        </div>
        <motion.div 
          className={styles.clickCount}
          initial={false}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          {player.clicks} clicks
        </motion.div>
      </div>
    </motion.div>
  );
} 