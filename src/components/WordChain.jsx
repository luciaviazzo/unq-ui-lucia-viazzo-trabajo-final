import { useRef, useEffect } from 'react';
import Letter from './Letter';
import './WordChain.css';

function WordChain({ words }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [words]);

    return (
        <div className="word-chain" ref={containerRef}>
            {words.map((word, wordIndex) => (
                    <div className="word-chain__word" key={`${word}-${wordIndex}`}>
                        {word.split('').map((letter, letterIndex) => (
                            <Letter
                                key={letterIndex}
                                letter={letter}
                                highlighted={letterIndex === word.length - 1}
                            />
                        ))}
                    </div>
                ))}
        </div>
    );
}

export default WordChain;