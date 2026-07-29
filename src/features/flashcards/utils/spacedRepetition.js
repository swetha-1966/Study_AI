export function calculateNextReviewInterval(currentBox = 1, isKnown = true) {
  if (isKnown) {
    const nextBox = Math.min(5, currentBox + 1);
    const intervalsInDays = [1, 3, 7, 14, 30];
    return {
      box: nextBox,
      intervalDays: intervalsInDays[nextBox - 1],
    };
  }

  return {
    box: 1,
    intervalDays: 1,
  };
}
