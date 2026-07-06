import './Letter.css';

function Letter({ letter, highlighted = false }) {
    const className = `letter ${highlighted ? 'letter--highlighted' : ''}`;
    return <span className={className}>{letter}</span>;
}

export default Letter;