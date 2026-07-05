import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found">
            <h1>Página no encontrada</h1>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default NotFound;