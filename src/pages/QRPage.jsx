import { QRCodeSVG } from 'qrcode.react';
import styles from './QRPage.module.css';

const MENU_URL = 'https://rockmystall.in/jalsacorner';

export default function QRPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>Scan to view menu</p>
          <h1 className={styles.brand}>JALSA<br />CORNER</h1>
          <p className={styles.hindi}>जलसा कॉर्नर</p>
        </div>

        <div className={styles.qrWrap}>
          <QRCodeSVG
            value={MENU_URL}
            size={220}
            bgColor="#FFFFF0"
            fgColor="#0D0D0D"
            level="M"
          />
        </div>

        <div className={styles.bottom}>
          <p className={styles.tag}>स्वाद का सिकंदर</p>
          <p className={styles.url}>rockmystall.in/jalsacorner</p>
        </div>
      </div>

      <button className={styles.printBtn} onClick={() => window.print()}>
        Print QR Code
      </button>
    </div>
  );
}
