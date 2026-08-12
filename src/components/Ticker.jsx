import styles from './Ticker.module.css';

const WORDS = ['स्वाद का सिकंदर', '✦', 'No bad vibes only good food', '✦', 'Jalsa Corner', '✦', "DRC's OG spot", '✦', 'Freshly made daily', '✦', '🇮🇳 Happy 80th Independence Day', '✦', 'Jai Hind', '✦'];

export default function Ticker({ color = 'yellow' }) {
  const repeated = [...WORDS, ...WORDS];
  return (
    <div className={styles.wrap} style={{ background: color === 'pink' ? 'var(--pink)' : 'var(--yellow)' }}>
      <div className={styles.inner}>
        {repeated.map((w, i) => (
          <span key={i} className={w === '✦' ? styles.sep : styles.word}>{w}</span>
        ))}
      </div>
    </div>
  );
}
