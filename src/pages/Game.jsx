import { useState } from 'react';
import { validateWord } from '../services/wordApi';

function Game() {
    const [chain, setChain] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitWord(inputValue);
        setInputValue('');
    };

    return (
        <div className="game">
            <h1>Partida en curso</h1>

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
            <p>Game over: {isGameOver ? 'sí' : 'no'}</p>
        </div>
    );
}

export default Game;