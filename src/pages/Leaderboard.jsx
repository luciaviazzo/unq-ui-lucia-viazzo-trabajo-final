import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../services/leaderboardStorage';
import LeaderboardItem from '../components/LeaderboardItem';
import Button from '../components/Button';
import './Leaderboard.css';

function Leaderboard() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        setEntries(getLeaderboard());
    }, []);

    return (
        <div className="leaderboard">
            <h1 className="leaderboard__title">Mejores puntajes</h1>

            {entries.length === 0 ? (
                <>
                    <p className="leaderboard__empty">Todavía no hay partidas jugadas</p>
                    <Button variant="primary" onClick={() => navigate('/game')}>
                        Jugar
                    </Button>
                </>
            ) : (
                <ol className="leaderboard__list">
                    {entries.map((entry, index) => (
                        <LeaderboardItem
                            key={index}
                            position={index + 1}
                            score={entry.score}
                            wordCount={entry.wordCount}
                        />
                    ))}
                </ol>
            )}

            {entries.length > 0 && (
                <Button variant="primary" onClick={() => navigate('/')}>
                    Ir al inicio
                </Button>
            )}
        </div>
    );
}

export default Leaderboard;