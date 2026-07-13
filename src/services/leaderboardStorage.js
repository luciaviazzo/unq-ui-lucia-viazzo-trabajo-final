const STORAGE_KEY = 'palabras-encadenadas-leaderboard';
const MAX_ENTRIES = 10;

export function getLeaderboard() {
    const stored = localStorage.getItem(STORAGE_KEY);
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
        .slice(0, MAX_ENTRIES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
}