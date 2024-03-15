import styles from './CardGlassWrapper.module.css';

export default function CardGlassWrapper(props) {
  return (
    <div {...props}>
      <div style={{ width: props.width || 'auto' }} className={styles.cardGlassBackdrop}>
        <div className={styles.cardGlassWrapper}>{props.children}</div>
      </div>
    </div>
  );
}
