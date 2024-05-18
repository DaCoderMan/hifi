// pages/index.js
"use client";
import Head from 'next/head';
import useCryptoPrices from '../hooks/useCryptoPrices';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { prices, error } = useCryptoPrices();

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Prices</title>
        <meta name="description" content="Live crypto prices for BTC, ETH, and SOL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Live Crypto Prices</h1>
        {error ? (
          <p className={styles.error}>Error: {error}</p>
        ) : (
          <div className={styles.prices}>
            <p>Bitcoin (BTC): ${prices.BTC}</p>
            <p>Ethereum (ETH): ${prices.ETH}</p>
            <p>Solana (SOL): ${prices.SOL}</p>
          </div>
        )}
      </main>
    </div>
  );
}
