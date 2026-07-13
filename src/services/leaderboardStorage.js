import { LEADERBOARD_STORAGE_KEY, LEADERBOARD_MAX_ENTRIES } from '../constants';

export function getLeaderboard() {
    const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveScore(score, wordCount) {
    const entries = getLeaderboard();

    const newEntry = {
        score,
        wordCount,
        date: new Date().toISOString(),
    };

    const updatedEntries = [...entries, newEntry]
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return b.wordCount - a.wordCount;
        })
        .slice(0, LEADERBOARD_MAX_ENTRIES);

    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedEntries));
}