import Letter from './Letter';
import './TitleLogo.css';

function TitleLogo() {
    const word1 = 'palabras';
    const word2 = 'encadenadas';

    return (
        <div className="title-logo">
            <div className="title-logo__word">
                {word1.split('').map((letter, index) => (
                    <Letter key={index} letter={letter} variant="pink" highlighted />
                ))}
            </div>
            <div className="title-logo__word">
                {word2.split('').map((letter, index) => (
                    <Letter key={index} letter={letter} variant="violet" highlighted />
                ))}
            </div>
        </div>
    );
}

export default TitleLogo;