import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const STALLS = [
  {
    slug: '/jalsacorner',
    name: 'Jalsa Corner',
    hindi: 'जलसा कॉर्नर',
    tag: 'Snacks & Cold Drinks',
    desc: 'DRC\'s finest corner · स्वाद का सिकंदर',
    accent: 'pink',
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Welcome to</span>
          <h1 className={styles.brand}>Rock<br />My<br />Stall</h1>
          <p className={styles.tagline}>Every stall. One platform.</p>
        </div>
        <div className={styles.scrollHint}>↓</div>
      </section>

      {/* STALLS */}
      <main className={styles.main}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEye}>Explore</span>
          <h2 className={styles.sectionTitle}>Our Stalls</h2>
        </div>

        <div className={styles.grid}>
          {STALLS.map(stall => (
            <Link key={stall.slug} to={stall.slug} className={`${styles.card} ${styles[stall.accent]}`}>
              <div className={styles.cardAccent} />
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{stall.tag}</span>
                <h3 className={styles.cardName}>{stall.name}</h3>
                <p className={styles.cardHindi}>{stall.hindi}</p>
                <p className={styles.cardDesc}>{stall.desc}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </Link>
          ))}

          {/* Placeholder for future stalls */}
          <div className={styles.cardSoon}>
            <span className={styles.soonLabel}>Coming Soon</span>
            <p className={styles.soonText}>More stalls on the way</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerBrand}>ROCK MY STALL</p>
        <p className={styles.footerNote}>rockmystall.in · Your stall, your story</p>
      </footer>

    </div>
  );
}
