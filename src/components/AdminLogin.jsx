import { useState } from 'react';
import styles from './AdminLogin.module.css';

export default function AdminLogin({ onAuth }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', '1');
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 400);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
        <div className={styles.logo}>JALSA</div>
        <div className={styles.subtitle}>Admin Access</div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && <p className={styles.errorMsg}>Incorrect password. Try again.</p>}

          <button type="submit" className={styles.btn}>Unlock Panel →</button>
        </form>
      </div>
    </div>
  );
}
