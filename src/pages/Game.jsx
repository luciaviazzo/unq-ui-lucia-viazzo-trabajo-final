import { useState } from 'react';

function Game() {
    const [chain, setChain] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const submitWord = (word) => {
        const formattedWord = word.trim();

        if (formattedWord === '') {
            setError('Tenés que escribir una palabra');
            return;
        }
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