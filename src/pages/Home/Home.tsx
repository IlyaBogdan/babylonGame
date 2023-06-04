import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <div>Hello. Let's go to play</div>
            <div>
                <button onClick={() => navigate('/basic-scene', { replace: false })} type="button">Yes</button>
                <button type="button">No</button>
            </div>
        </>
    );
}