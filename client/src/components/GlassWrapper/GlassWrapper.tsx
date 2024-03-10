import styles from './GlassWrapper.module.css';

export default function GlassWrapper({ children, width }) {
  return (
    <div className={styles.glassFlexWrapper}>
      <div style={{ width: width }} className={styles.glassBackdrop}>
        <div className={styles.glassWrapper}>{children}</div>
      </div>
    </div>
  );
}
