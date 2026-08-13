import { useState, useEffect } from 'react';
import { MENU_ITEMS } from '../menuItems';
import Ticker from '../components/Ticker';
import MenuItem from '../components/MenuItem';
import LivePlayer from '../components/LivePlayer';
import styles from './MenuPage.module.css';

const CLASSIC_MEMES = ['/memes/1.jpg', '/memes/3.jpg', '/memes/2.jpg', '/memes/4.jpg'];
const NEW_MEMES = ['/memes/5.png', '/memes/6.png', '/memes/7.png', '/memes/8.png', '/memes/9.png', '/memes/10.png', '/memes/11.png', '/memes/12.png', '/memes/13.png'];

const SNACKS = MENU_ITEMS.filter(i => i.category === 'snacks');
const DRINKS = MENU_ITEMS.filter(i => i.category === 'drinks');

export default function MenuPage() {
  const [activeMeme, setActiveMeme] = useState(null);

  useEffect(() => {
    if (!activeMeme) return;
    const close = (e) => { if (e.key === 'Escape') setActiveMeme(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [activeMeme]);

  return (
    <div className={styles.page}>

      <LivePlayer />

      {activeMeme && (
        <div className={styles.modalOverlay} onClick={() => setActiveMeme(null)}>
          <img src={activeMeme} alt="Jalsa Corner meme" className={styles.modalImg} onClick={e => e.stopPropagation()} draggable={false} />
          <button className={styles.modalClose} onClick={() => setActiveMeme(null)} aria-label="Close meme">✕</button>
        </div>
      )}

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} role="img" aria-label="Jalsa Corner food spread" />
        <div className={styles.heroOverlay} />

        <div className={styles.heroTicker}>
          <Ticker />
        </div>

        <div className={styles.heroInner}>
          <span className={styles.heroTag}>DRC's finest corner</span>
          <div className={styles.independenceBadge}>
            <span className={styles.independenceStripe} />
            <span className={styles.independenceText}>🇮🇳 Celebrating 80th Independence Day</span>
            <span className={styles.independenceStripe} />
          </div>
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
            <img src="/memes/1.jpg" alt="Jalsa Corner meme" className={styles.memeFloatA} draggable={false} onClick={() => setActiveMeme('/memes/1.jpg')} />
            <img src="/memes/3.jpg" alt="Jalsa Corner meme" className={styles.memeFloatB} draggable={false} onClick={() => setActiveMeme('/memes/3.jpg')} />
          </div>

          <div className={styles.menuHead}>
            <p className={styles.menuEyebrow}>What are we eating today</p>
            <h2 className={styles.menuTitle}>OUR<br /><span>MENU</span></h2>
            <p className={styles.menuSub}>Fresh · Hot · Straight from the kitchen</p>
          </div>

          <div className={styles.memesRight}>
            <img src="/memes/2.jpg" alt="Jalsa Corner meme" className={styles.memeFloatB} draggable={false} onClick={() => setActiveMeme('/memes/2.jpg')} />
            <img src="/memes/4.jpg" alt="Jalsa Corner meme" className={`${styles.memeFloatA} ${styles.memeSmall}`} draggable={false} onClick={() => setActiveMeme('/memes/4.jpg')} />
          </div>
        </div>

        {/* Mobile-only auto-scroll meme strip, single carousel right after menu head */}
        <div className={styles.memesMobile}>
          <div className={styles.memesMobileTrack}>
            {/* duplicated for seamless infinite loop */}
            {[...Array(2)].map((_, pass) =>
              [...CLASSIC_MEMES, ...NEW_MEMES].map((src, i) => (
                <img
                  key={`${pass}-${i}`}
                  src={src}
                  alt="Jalsa Corner meme"
                  className={styles.memesMobileCard}
                  draggable={false}
                  onClick={() => setActiveMeme(src)}
                  aria-hidden={pass === 1}
                />
              ))
            )}
          </div>
        </div>

        {/* SNACKS & DRINKS — side by side on desktop, stacked on mobile */}
        <div className={styles.categoriesRow}>
          <div className={styles.catColumn}>
            <div className={styles.catWrap}>
              <span className={styles.catLabel}>Snacks</span>
            </div>
            <div className={styles.itemsWrap}>
              {SNACKS.map(item => <MenuItem key={item.id} item={item} />)}
            </div>
          </div>

          <div className={styles.catColumn}>
            <div className={styles.catWrap}>
              <span className={`${styles.catLabel} ${styles.catDrinks}`}>Cold Drinks</span>
            </div>
            <div className={styles.itemsWrap}>
              {DRINKS.map(item => <MenuItem key={item.id} item={item} />)}
            </div>
          </div>
        </div>

        {/* MEME CAROUSEL — desktop only, mid-page for visibility */}
        <div className={`${styles.memesSection} ${styles.memesSectionMid}`}>
          <div className={styles.memesSectionHead}>
            <p className={styles.menuEyebrow}>Straight from the group chat</p>
            <span className={styles.memesTag}>MEME DUMP 🔥</span>
          </div>
          <div className={styles.memesScroll}>
            <div className={styles.memesCarouselTrack}>
              {/* duplicated for seamless infinite loop */}
              {[...Array(2)].map((_, pass) =>
                NEW_MEMES.map((src, i) => (
                  <img
                    key={`${pass}-${i}`}
                    src={src}
                    alt="Jalsa Corner meme"
                    className={styles.memeCard}
                    draggable={false}
                    onClick={() => setActiveMeme(src)}
                    aria-hidden={pass === 1}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeInner}>
            {['JALSA CORNER', '✦', 'SWAD KA SIKANDAR', '✦', 'NO BAD VIBES', '✦', 'JALSA CORNER', '✦', 'SWAD KA SIKANDAR', '✦', 'NO BAD VIBES', '✦'].map((w, i) => (
              <span key={i} className={w === '✦' ? styles.marqueeEm : styles.marqueeWord}>{w}</span>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <p className={styles.footerBrand}>JALSA<br />CORNER</p>
          <p className={styles.footerNote}>
            Freshly prepared daily · <strong>Dine-in & Takeaway</strong> · Prices incl. taxes
          </p>
          <p className={styles.credit}>Designed & Developed by Python Department</p>
        </div>
      </main>
    </div>
  );
}
