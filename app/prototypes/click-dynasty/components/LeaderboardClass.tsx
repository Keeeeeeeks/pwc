"use client";

import { motion } from 'framer-motion';
import styles from '../styles.module.css';
import PlayerCard from './PlayerCard';

interface Player {
  id: string;
  name: string;
  clicks: number;
  isUser: boolean;
}

interface LeaderboardClassProps {
  className: 'Bronze' | 'Silver' | 'Gold';
  players: Player[];
  currentClass: 'Bronze' | 'Silver' | 'Gold';
}

const classColors = {
  Bronze: '#CD7F32',
  Silver: '#C0C0C0',
  Gold: '#FFD700'
};

const classRequirements = {
  Bronze: '0-99',
  Silver: '100-299',
  Gold: '300+'
};

export default function LeaderboardClass({ className, players, currentClass }: LeaderboardClassProps) {
  const isCurrentClass = className === currentClass;

  return (
    <motion.div 
      className={styles.leaderboardClass}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: className === 'Gold' ? 0 : className === 'Silver' ? 0.2 : 0.4 }}
    >
      <motion.div 
        className={styles.classHeader}
        style={{ 
          backgroundColor: classColors[className],
          boxShadow: isCurrentClass ? `0 0 20px ${classColors[className]}` : 'none'
        }}
        whileHover={{ scale: 1.02 }}
      >
        <h2>{className} Class</h2>
        <span className={styles.classRequirement}>
          {classRequirements[className]} clicks
        </span>
      </motion.div>

      <motion.div 
        className={styles.playersList}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {players.map((player, index) => (
          <PlayerCard
            key={player.id}
            player={player}
            rank={index + 1}
            className={className}
          />
        ))}
      </motion.div>
    </motion.div>
  );
} 