import Link from "next/link";
import styles from './styles/home.module.css';
import Image from 'next/image';

export default function Home() {
  // Add your prototypes to this array
  const prototypes = [
    {
      title: 'Getting started',
      description: 'How to create a prototype',
      path: '/prototypes/example',
      icon: '✨'
    },
    {
      title: 'Confetti button',
      description: 'An interactive button that creates a colorful confetti explosion',
      path: '/prototypes/confetti-button',
      icon: '🎉'
    },
    {
      title: 'Interactive Bookshelf',
      description: 'A responsive bookshelf with animated book cards and an immersive reading interface',
      path: '/prototypes/interactive-bookshelf',
      icon: '📚'
    },
    {
      title: "Today's Joy",
      description: 'A maximalist gratitude journal that celebrates your daily moments of joy and gratitude',
      path: '/prototypes/todays-joy',
      icon: '✨'
    },
    {
      title: 'Click Dynasty',
      description: 'A competitive clicking game where players advance through Bronze, Silver, and Gold leagues',
      path: '/prototypes/click-dynasty',
      icon: '👆'
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoNav}>
          <h1 className={styles.logo}>PROTOTYPES</h1>
          <nav>
            <Link href="#" className={styles.navLink}>Discover</Link>
            <Link href="#" className={styles.navLink}>Top Creators</Link>
          </nav>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.createButton}>Create</button>
        </div>
      </header>

      <div className={styles.hero}>
        <div className={styles.eyeIcon}>👁️✨</div>
        <h1 className={styles.heroTitle}>KEEKS'S PROTOTYPES</h1>
      </div>

      <main>
        <section className={styles.grid}>
          {prototypes.map((prototype, index) => (
            <Link 
              key={index}
              href={prototype.path} 
              className={styles.card}
            >
              <div className={styles.cardIcon}>{prototype.icon}</div>
              <h3>{prototype.title}</h3>
              <p>{prototype.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}