import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <h1>Palabras Encadenadas</h1>
            <Link to="/game">Jugar</Link>
        </div>
    );
}

export default Home;