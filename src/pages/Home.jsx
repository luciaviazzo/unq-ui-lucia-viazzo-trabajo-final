import { useNavigate } from 'react-router-dom';
import TitleLogo from '../components/TitleLogo';
import Button from '../components/Button';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <TitleLogo />

            <div className="home__rules">
                <span>15s por palabra</span>
                <span className="home__dot">·</span>
                <span>1 punto por letra</span>
            </div>

            <div className="home__buttons">  
                <Button variant="primary" onClick={() => navigate('/game')}>
                    Jugar
                </Button>
                <Button variant="secondary" onClick={() => navigate('/leaderboard')}>
                    Ver mejores puntajes
                </Button>
            </div>
        </div>
    );
}

export default Home;