import styles from './styles.module.css';

export const LevelUI: React.FC = () => {

    return (
        <>
            <nav className={styles.levelMenu}>
                <div>Level name</div>
                <div>Pause</div>
                <div>Exit</div>
            </nav>
        </>
    );
}