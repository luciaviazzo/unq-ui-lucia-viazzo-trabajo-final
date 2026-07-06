import { useState } from 'react';
import Button from './Button';
import './WordInput.css';

function WordInput({ onSubmit, error }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
    };

    return (
        <div className="word-input">
            <form className="word-input__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="word-input__field"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Escribí una palabra..."
                />
                <Button type="submit" variant="primary">
                    Enviar
                </Button>
            </form>

            {error && <p className="word-input__error">{error}</p>}
        </div>
    );
}

export default WordInput;