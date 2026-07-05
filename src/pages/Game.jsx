import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateWord } from '../services/wordApi';

const TIME_LIMIT = 15;

function Game() {
    const navigate = useNavigate();
    const [chain, setChain] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
            const previousWord = chain[chain.length - 1];
            const expectedLetter = previousWord.slice(-1).toLowerCase();
            const firstLetter = formattedWord.charAt(0).toLowerCase();

            if (firstLetter !== expectedLetter) {
                setError(`La palabra debe empezar con "${expectedLetter}"`);
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
        setHasStarted(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitWord(inputValue);
        setInputValue('');
    };

    const handlePlayAgain = () => {
        setChain([]);
        setScore(0);
        setError('');
        setIsGameOver(false);
        setInputValue('');
        setTimeLeft(TIME_LIMIT);
        setHasStarted(false);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="game">
            {isGameOver ? (
                <div className="game-over">
                    <h2>¡Partida terminada!</h2>
                    <p>Palabras encadenadas: {chain.length}</p>
                    <p>Puntaje final: {score}</p>
                    <button onClick={handlePlayAgain}>Jugar de nuevo</button>
                    <button onClick={handleGoHome}>Ir al inicio</button>
                </div>
            ) : (
                <>
                    <h1>Partida en curso</h1>
                    <p>Tiempo restante: {timeLeft}</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit">Enviar</button>
                    </form>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <p>Cadena: {chain.join(', ')}</p>
                    <p>Puntaje: {score}</p>
                </>
            )}
        </div>
    );
}

export default Game;