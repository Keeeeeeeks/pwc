"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, LayoutGroup } from 'framer-motion';
import styles from './styles.module.css';
import LeaderboardClass from './components/LeaderboardClass';
import PlayerCard from './components/PlayerCard';
import ClassTransitionEffect from './components/ClassTransitionEffect';

interface Player {
  id: string;
  name: string;
  clicks: number;
  isUser: boolean;
}

type LeaderboardClass = 'Bronze' | 'Silver' | 'Gold';

const PLAYERS_PER_CLASS = 20;
const BOT_CLICK_INTERVAL = 2000; // 2 seconds
const NAMES = [
  'Luna', 'Atlas', 'Nova', 'Orion', 'Aurora', 'Phoenix', 'Celeste', 'Zephyr',
  'Astro', 'Nebula', 'Cosmos', 'Stellar', 'Jupiter', 'Venus', 'Mars', 'Neptune',
  'Mercury', 'Saturn', 'Pluto', 'Titan'
];

export default function ClickDynasty() {
  const [playerClicks, setPlayerClicks] = useState(0);
  const [previousClass, setPreviousClass] = useState<LeaderboardClass>('Bronze');
  const [currentClass, setCurrentClass] = useState<LeaderboardClass>('Bronze');
  const [showClassTransition, setShowClassTransition] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Record<LeaderboardClass, Player[]>>({
    Bronze: [],
    Silver: [],
    Gold: []
  });

  // Modify the spring configuration for a more "digital" feel
  const clickSpring = useSpring(1, {
    stiffness: 800,
    damping: 15,
    restSpeed: 0.5,
    restDelta: 0.01,
  });

  const [lastClickTime, setLastClickTime] = useState(Date.now());

  // Initialize leaderboard with bots
  useEffect(() => {
    const initialLeaderboard: Record<LeaderboardClass, Player[]> = {
      Bronze: [],
      Silver: [],
      Gold: []
    };

    ['Bronze', 'Silver', 'Gold'].forEach((className) => {
      const classKey = className as LeaderboardClass;
      const baseClicks = classKey === 'Bronze' ? 0 : classKey === 'Silver' ? 100 : 300;
      
      for (let i = 0; i < PLAYERS_PER_CLASS; i++) {
        initialLeaderboard[classKey].push({
          id: `${className}-${i}`,
          name: NAMES[i % NAMES.length],
          clicks: baseClicks + Math.floor(Math.random() * 50),
          isUser: false
        });
      }
    });

    // Add user to Bronze
    initialLeaderboard.Bronze.push({
      id: 'user',
      name: 'You',
      clicks: 0,
      isUser: true
    });

    // Sort all classes
    Object.keys(initialLeaderboard).forEach((className) => {
      const classKey = className as LeaderboardClass;
      initialLeaderboard[classKey].sort((a, b) => b.clicks - a.clicks);
    });

    setLeaderboard(initialLeaderboard);
  }, []);

  // Bot clicking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard((prev) => {
        const newLeaderboard = { ...prev };
        
        Object.keys(newLeaderboard).forEach((className) => {
          const classKey = className as LeaderboardClass;
          newLeaderboard[classKey] = newLeaderboard[classKey].map(player => {
            if (!player.isUser && Math.random() > 0.5) {
              return { ...player, clicks: player.clicks + 1 };
            }
            return player;
          });
          
          // Sort the class
          newLeaderboard[classKey].sort((a, b) => b.clicks - a.clicks);
        });

        return newLeaderboard;
      });
    }, BOT_CLICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const newClicks = playerClicks + 1;
    setPlayerClicks(newClicks);

    // Calculate click velocity based on time since last click
    const currentTime = Date.now();
    const timeDelta = currentTime - lastClickTime;
    const velocity = Math.max(0.2, Math.min(1, 1000 / timeDelta)); // Clamp between 0.2 and 1
    
    // Animate the spring with velocity-based scale
    clickSpring.set(1 + velocity);
    // Always return to scale of 1
    clickSpring.set(1, true);
    
    setLastClickTime(currentTime);

    setLeaderboard((prev) => {
      const newLeaderboard = { ...prev };
      let userClass: LeaderboardClass = 'Bronze';

      // Remove user from all classes
      Object.keys(newLeaderboard).forEach((className) => {
        const classKey = className as LeaderboardClass;
        newLeaderboard[classKey] = newLeaderboard[classKey].filter(p => !p.isUser);
      });

      // Determine user's class based on clicks
      if (newClicks >= 300) {
        userClass = 'Gold';
      } else if (newClicks >= 100) {
        userClass = 'Silver';
      }

      // Add user to new class
      newLeaderboard[userClass].push({
        id: 'user',
        name: 'You',
        clicks: newClicks,
        isUser: true
      });

      // Sort the affected class
      newLeaderboard[userClass].sort((a, b) => b.clicks - a.clicks);

      // Check for class transition
      if (userClass !== currentClass) {
        setPreviousClass(currentClass);
        setCurrentClass(userClass);
        setShowClassTransition(true);
        setTimeout(() => setShowClassTransition(false), 2000);
      }

      return newLeaderboard;
    });
  };

  const handleHammerClick = () => {
    const newClicks = playerClicks + 5;
    setPlayerClicks(newClicks);

    // For hammer clicks, use a stronger effect
    clickSpring.set(2); // Bigger scale for hammer
    clickSpring.set(1, true); // Return to normal

    setLeaderboard((prev) => {
      const newLeaderboard = { ...prev };
      let userClass: LeaderboardClass = 'Bronze';

      // Remove user from all classes
      Object.keys(newLeaderboard).forEach((className) => {
        const classKey = className as LeaderboardClass;
        newLeaderboard[classKey] = newLeaderboard[classKey].filter(p => !p.isUser);
      });

      // Determine user's class based on clicks
      if (newClicks >= 300) {
        userClass = 'Gold';
      } else if (newClicks >= 100) {
        userClass = 'Silver';
      }

      // Add user to new class
      newLeaderboard[userClass].push({
        id: 'user',
        name: 'You',
        clicks: newClicks,
        isUser: true
      });

      // Sort the affected class
      newLeaderboard[userClass].sort((a, b) => b.clicks - a.clicks);

      // Check for class transition
      if (userClass !== currentClass) {
        setPreviousClass(currentClass);
        setCurrentClass(userClass);
        setShowClassTransition(true);
        setTimeout(() => setShowClassTransition(false), 2000);
      }

      return newLeaderboard;
    });
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className={styles.header}>
          <motion.div
            className={styles.woodenPlaque}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={styles.plaqueText}>Click Dynasty</div>
            <div className={styles.nailLeft}></div>
            <div className={styles.nailRight}></div>
          </motion.div>
          
          <div className={styles.clickButtons}>
            <motion.div 
              className={styles.clickCounter}
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
            >
              <div className={styles.lcdScreen}>
                <motion.span 
                  style={{ scale: clickSpring }}
                  className={styles.clickCount}
                >
                  {playerClicks}
                </motion.span>
                <span className={styles.clickLabel}>CLICKS</span>
              </div>
              <div className={styles.counterShadow}></div>
            </motion.div>

            <motion.div
              className={styles.hammerButton}
              layout
              whileHover={{ scale: 1.1 }}
              whileTap={{ 
                scale: 0.9,
                rotate: 20,
              }}
              onClick={handleHammerClick}
            >
              <motion.div 
                className={styles.hammer}
                animate={{ 
                  rotate: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div className={styles.hammerHead}>
                  <div className={styles.hammerMetal}></div>
                </motion.div>
                <motion.div className={styles.hammerHandle}>
                  <div className={styles.woodGrain}></div>
                </motion.div>
              </motion.div>
              <div className={styles.hammerShadow}></div>
            </motion.div>
          </div>
        </header>

        <motion.div 
          className={styles.leaderboardContainer}
          layout
        >
          <div className={styles.leaderboardFrame}>
            <div className={styles.frameTop}>
              <div className={styles.frameCorner}></div>
              <div className={styles.frameTitle}>Leaderboard</div>
              <div className={styles.frameCorner}></div>
            </div>
            
            <div className={styles.boardContent}>
              <AnimatePresence mode="wait">
                {showClassTransition && (
                  <ClassTransitionEffect 
                    previousClass={previousClass}
                    currentClass={currentClass}
                  />
                )}
              </AnimatePresence>

              <motion.div 
                className={styles.classes}
                layout
              >
                {(['Gold', 'Silver', 'Bronze'] as LeaderboardClass[]).map((className) => (
                  <motion.div
                    key={className}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    className={`${styles.classContainer} ${styles[className]}`}
                  >
                    <div className={styles.metalPlate}>
                      <LeaderboardClass
                        className={className}
                        players={leaderboard[className]}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 