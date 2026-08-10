import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../MenuContext';
import Ticker from '../components/Ticker';
import MenuItem from '../components/MenuItem';
import styles from './MenuPage.module.css';

export default function MenuPage() {
  const { items } = useMenu();
  const snacks = items.filter(i => i.category === 'snacks');
  const drinks = items.filter(i => i.category === 'drinks');
  const [activeMeme, setActiveMeme] = useState(null);

  useEffect(() => {
    if (!activeMeme) return;
    const close = (e) => { if (e.key === 'Escape') setActiveMeme(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [activeMeme]);

  return (
    <div className={styles.page}>

      {activeMeme && (
        <div className={styles.modalOverlay} onClick={() => setActiveMeme(null)}>
          <img src={activeMeme} className={styles.modalImg} onClick={e => e.stopPropagation()} draggable={false} />
          <button className={styles.modalClose} onClick={() => setActiveMeme(null)}>✕</button>
        </div>
      )}

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroTicker}>
          <Ticker />
        </div>

        <div className={styles.heroInner}>
          <span className={styles.heroTag}>DRC's finest corner</span>
          <h1 className={styles.heroName}>जलसा कॉर्नर</h1>
          <span className={styles.heroNameEn}>Jalsa Corner</span>
          <p className={styles.heroSub}>स्वाद का सिकंदर · The ruler of flavour</p>
          <a href="#menu" className={styles.heroCta}>See the menu ↓</a>
        </div>
      </section>

      {/* MENU */}
      <main id="menu" className={styles.menu}>

        <div className={styles.menuHeadWrapper}>
          <div className={styles.memesLeft}>
            <img src="/memes/1.jpg" className={styles.memeFloatA} draggable={false} onClick={() => setActiveMeme('/memes/1.jpg')} />
            <img src="/memes/3.jpg" className={styles.memeFloatB} draggable={false} onClick={() => setActiveMeme('/memes/3.jpg')} />
          </div>

          <div className={styles.menuHead}>
            <p className={styles.menuEyebrow}>What are we eating today</p>
            <h2 className={styles.menuTitle}>OUR<br /><span>MENU</span></h2>
            <p className={styles.menuSub}>Fresh · Hot · Straight from the kitchen</p>
          </div>

          <div className={styles.memesRight}>
            <img src="/memes/2.jpg" className={styles.memeFloatB} draggable={false} onClick={() => setActiveMeme('/memes/2.jpg')} />
            <img src="/memes/4.jpg" className={`${styles.memeFloatA} ${styles.memeSmall}`} draggable={false} onClick={() => setActiveMeme('/memes/4.jpg')} />
          </div>
        </div>

        {/* SNACKS */}
        {snacks.length > 0 && (
          <>
            <div className={styles.catWrap}>
              <span className={styles.catLabel}>Snacks</span>
            </div>
            <div className={styles.itemsWrap}>
              {snacks.map(item => <MenuItem key={item.id} item={item} />)}
            </div>
          </>
        )}

        {/* MARQUEE */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeInner}>
            {['JALSA CORNER', '✦', 'SWAD KA SIKANDAR', '✦', 'NO BAD VIBES', '✦', 'JALSA CORNER', '✦', 'SWAD KA SIKANDAR', '✦', 'NO BAD VIBES', '✦'].map((w, i) => (
              <span key={i} className={w === '✦' ? styles.marqueeEm : styles.marqueeWord}>{w}</span>
            ))}
          </div>
        </div>

        {/* DRINKS */}
        {drinks.length > 0 && (
          <>
            <div className={styles.catWrap} style={{ marginTop: '2.5rem' }}>
              <span className={`${styles.catLabel} ${styles.catDrinks}`}>Cold Drinks</span>
            </div>
            <div className={styles.itemsWrap}>
              {drinks.map(item => <MenuItem key={item.id} item={item} />)}
            </div>
          </>
        )}

        {items.length === 0 && (
          <div className={styles.empty}>
            <p>No items yet. <Link to="/jalsacorner/admin" className={styles.emptyLink}>Add from admin panel →</Link></p>
          </div>
        )}

        {/* FOOTER */}
        <div className={styles.footer}>
          <p className={styles.footerBrand}>JALSA<br />CORNER</p>
          <p className={styles.footerNote}>
            Freshly prepared daily · <strong>Dine-in & Takeaway</strong> · Prices incl. taxes
          </p>
          <Link to="/jalsacorner/admin" className={styles.adminBtn}>Admin Panel</Link>
          <p className={styles.credit}>Designed & Developed by Python Department</p>
        </div>
      </main>
    </div>
  );
}
