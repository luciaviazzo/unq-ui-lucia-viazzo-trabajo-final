import WordChain from './WordChain';
import Button from './Button';
import './GameOver.css';

function GameOver({ chain, score, onPlayAgain, onGoHome }) {
    return (
        <div className="game-over">
            <h2 className="game-over__title">Partida terminada</h2>

            <div className="game-over__stats">
                <div className="game-over__stat game-over__stat--pink">
                    <p className="game-over__stat-label">Palabras</p>
                    <p className="game-over__stat-value">{chain.length}</p>
                </div>
                <div className="game-over__stat game-over__stat--violet">
                    <p className="game-over__stat-label">Puntaje</p>
                    <p className="game-over__stat-value">{score}</p>
                </div>
            </div>

            {chain.length > 0 && (
                <div className="game-over__chain">
                    <WordChain words={chain} />
                </div>
            )}

            <div className="game-over__buttons">
                <Button variant="primary" onClick={onPlayAgain}>
                    Jugar de nuevo
                </Button>
                <Button variant="secondary" onClick={onGoHome}>
                    Ir al inicio
                </Button>
            </div>
        </div>
    );
}

export default GameOver;