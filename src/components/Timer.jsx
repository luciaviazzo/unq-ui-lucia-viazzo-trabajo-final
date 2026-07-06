import './Timer.css';

const TOTAL_TIME = 15;
const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Timer({ timeLeft }) {
    const progress = timeLeft / TOTAL_TIME;
    const offset = CIRCUMFERENCE * (1 - progress);
    const isLow = timeLeft <= 5;

    return (
        <div className="timer">
            <svg width="56" height="56" className="timer__svg">
                <circle
                    cx="28"
                    cy="28"
                    r={RADIUS}
                    className="timer__track"
                />
                <circle
                    cx="28"
                    cy="28"
                    r={RADIUS}
                    className={`timer__progress ${isLow ? 'timer__progress--low' : ''}`}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                />
            </svg>
            <span className={`timer__number ${isLow ? 'timer__number--low' : ''}`}>
                {timeLeft}
            </span>
        </div>
    );
}

export default Timer;