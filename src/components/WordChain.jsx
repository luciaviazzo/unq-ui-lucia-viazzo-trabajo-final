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
            {words.map((word, wordIndex) => {
                const nextWordExists = wordIndex < words.length - 1;

                return (
                    <div className="word-chain__word" key={`${word}-${wordIndex}`}>
                        {word.split('').map((letter, letterIndex) => {
                            const isFirstLetter = letterIndex === 0;
                            const isLastLetter = letterIndex === word.length - 1;

                            const highlighted =
                                (isFirstLetter && wordIndex > 0) ||
                                (isLastLetter && nextWordExists);

                            return (
                                <Letter key={letterIndex} letter={letter} highlighted={highlighted} />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default WordChain;