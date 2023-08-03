import styles from "./discover-side-bar.module.scss";

export default function DiscoverSideBar() {
    return (
        <aside className={styles.sidebar}>
            <strong>Popular tags</strong>

            <div className={styles.tagList}>
                <div className={styles.tagItem}>#stories</div>
                <div className={styles.tagItem}>#history</div>
                <div className={styles.tagItem}>#medieval</div>
                <div className={styles.tagItem}>#games</div>
                <div className={styles.tagItem}>#education</div>
            </div>
        </aside>
    );
}