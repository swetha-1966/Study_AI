export function filterHistorySessions(sessions = [], query = '', difficulty = 'all', status = 'all') {
  return sessions.filter((s) => {
    const matchesQuery = s.topic.toLowerCase().includes(query.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || s.difficulty?.toLowerCase() === difficulty.toLowerCase();
    const matchesStatus = status === 'all' || s.status?.toLowerCase() === status.toLowerCase();
    return matchesQuery && matchesDifficulty && matchesStatus;
  });
}
