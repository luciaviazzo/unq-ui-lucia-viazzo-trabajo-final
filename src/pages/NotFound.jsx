import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found">
            <p className="not-found__code">404</p>
            <h1 className="not-found__title">Esta página no existe</h1>
            <p className="not-found__text">
                Revisá la dirección o volvé al inicio para jugar.
            </p>
            <Link to="/" className="not-found__link">
                <Button variant="primary">Ir al inicio</Button>
            </Link>
        </div>
    );
}

export default NotFound;