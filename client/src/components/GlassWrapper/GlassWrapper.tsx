import styles from './GlassWrapper.module.css';

export default function GlassWrapper(props) {
  return (
    <div className={styles.glassFlexWrapper} {...props}>
      <div style={{ width: props.width || 'auto' }} className={styles.glassBackdrop}>
        <div className={styles.glassWrapper} style={{ padding: props.padding || '20px' }} >{props.children}</div>
      </div>
    </div>
  );
}
