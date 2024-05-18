// hooks/useCryptoPrices.js
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useCryptoPrices = () => {
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0, SOL: 0 });
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const intervalRef = useRef(null);

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
      );
      const newPrices = {
        BTC: response.data.bitcoin.usd,
        ETH: response.data.ethereum.usd,
        SOL: response.data.solana.usd,
      };
      setPrices(newPrices);
      const now = Date.now();
      localStorage.setItem('cryptoPrices', JSON.stringify({
        prices: newPrices,
        timestamp: now,
      }));
      setLastFetch(now);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 429) {
        console.error('Rate limit exceeded, backing off...');
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('cryptoPrices');
    if (storedData) {
      const { prices, timestamp } = JSON.parse(storedData);
      setPrices(prices);
      setLastFetch(timestamp);
    }

    intervalRef.current = setInterval(fetchPrices, 30000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return { prices, error };
};

export default useCryptoPrices;
