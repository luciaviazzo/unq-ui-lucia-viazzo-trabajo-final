import './LeaderboardItem.css';

function LeaderboardItem({ position, score, wordCount }) {
    const variant = position % 2 === 0 ? 'light' : 'strong';

    return (
        <li className={`leaderboard-item leaderboard-item--${variant}`}>
            <span className="leaderboard-item__position">{position}</span>
            <div className="leaderboard-item__info">
                <span className="leaderboard-item__score">{score} pts</span>
                <span className="leaderboard-item__words">{wordCount} palabras</span>
            </div>
        </li>
    );
}

export default LeaderboardItem;