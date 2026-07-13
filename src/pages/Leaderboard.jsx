import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../services/leaderboardStorage';
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
                <p className="leaderboard__empty">Todavía no hay partidas jugadas</p>
            ) : (
                <ol className="leaderboard__list">
                    {entries.map((entry, index) => (
                        <li className="leaderboard__item" key={index}>
                            <span className="leaderboard__position">{index + 1}</span>
                            <span className="leaderboard__score">{entry.score} pts</span>
                            <span className="leaderboard__words">{entry.wordCount} palabras</span>
                        </li>
                    ))}
                </ol>
            )}

            <Button variant="secondary" onClick={() => navigate('/')}>
                Ir al inicio
            </Button>
        </div>
    );
}

export default Leaderboard;