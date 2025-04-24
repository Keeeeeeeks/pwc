'use client';

import styles from '../styles/home.module.css';
import Link from 'next/link';

export function PrototypeCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonDescription}></div>
    </div>
  );
}

export default function PrototypeCard({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return (
    <Link href={path} className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
} 