import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateWord } from '../services/wordApi';
import Timer from '../components/Timer';
import WordChain from '../components/WordChain';
import WordInput from '../components/WordInput';
import GameOver from '../components/GameOver';
import './Game.css';

const TIME_LIMIT = 15;

function Game() {
    const navigate = useNavigate();
    const [chain, setChain] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!hasStarted || isGameOver) return;

        if (timeLeft === 0) {
            setIsGameOver(true);
            return;
        }

        const timeoutId = setTimeout(() => {
            setTimeLeft((currentTime) => currentTime - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [timeLeft, isGameOver, hasStarted]);

    const submitWord = async (word) => {
        setHasStarted(true);

        const formattedWord = word.trim();

        if (formattedWord === '') {
            setError('Tenés que escribir una palabra');
            return;
        }

        const alreadyUsed = chain.some(
            (usedWord) => usedWord.toLowerCase() === formattedWord.toLowerCase()
        );

        if (alreadyUsed) {
            setError('Esa palabra ya fue utilizada');
            return;
        }

        if (chain.length > 0) {
            const normalize = (str) =>
                str.normalize('NFD').replace(/[̀-ͯ]/g, '');

            const previousWord = chain[chain.length - 1];
            const expectedLetter = normalize(previousWord.slice(-1)).toLowerCase();
            const firstLetter = normalize(formattedWord.charAt(0)).toLowerCase();

            if (firstLetter !== expectedLetter) {
                setError(`La palabra debe empezar con "${previousWord.slice(-1).toLowerCase()}"`);
                return;
            }
        }

        try {
            const wordExists = await validateWord(formattedWord);
            if (!wordExists) {
                setError('Esa palabra no existe');
                return;
            }
        } catch {
            setError('No se pudo validar la palabra, intentá de nuevo');
            return;
        }

        setChain((currentChain) => [...currentChain, formattedWord]);
        setScore((currentScore) => currentScore + formattedWord.length);
        setError('');
        setTimeLeft(TIME_LIMIT);
    };

    const handlePlayAgain = () => {
        setChain([]);
        setScore(0);
        setError('');
        setIsGameOver(false);
        setTimeLeft(TIME_LIMIT);
        setHasStarted(false);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (isGameOver) {
        return (
            <div className="game">
                <GameOver
                    chain={chain}
                    score={score}
                    onPlayAgain={handlePlayAgain}
                    onGoHome={handleGoHome}
                />
            </div>
        );
    }

    return (
        <div className="game">
            <div className="game__header">
                <div className="game__score">
                    <p className="game__score-label">Puntaje</p>
                    <p className="game__score-value">{score}</p>
                </div>
                <Timer timeLeft={timeLeft} />
            </div>

            <div className="game__chain">
                <WordChain words={chain} />
            </div>

            <WordInput onSubmit={submitWord} error={error} />
        </div>
    );
}

export default Game;