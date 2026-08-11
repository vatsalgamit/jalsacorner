import styles from './MenuItem.module.css';

export default function MenuItem({ item }) {
  const isDrink = item.category === 'drinks';
  return (
    <div className={`${styles.item} ${isDrink ? styles.drink : ''}`}>
      <div className={styles.accent} />
      {item.image && (
        <img
          src={item.image.startsWith('data:') ? item.image : `/menu/${item.image}`}
          alt={item.name}
          className={styles.photo}
        />
      )}
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.hindi}>{item.hindi}</span>
          <p className={styles.desc}>{item.desc}</p>
        </div>
        <div className={styles.right}>
          <span className={styles.price}>₹{item.price}</span>
          <span className={`${styles.badge} ${isDrink ? styles.badgeDrink : styles.badgeVeg}`}>
            {item.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
