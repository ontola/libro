const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

const useDisplayPercentage = (count: number, totalCount: number): [percentage: number, displayPercentage: number] => {
  if (totalCount === 0) {
    return [0, THREE_SIDE_STALEMATE];
  }

  const percentage = (count / totalCount) * HUNDRED_PERCENT;
  const displayPercentage = percentage < LOWER_LIMIT ? LOWER_LIMIT : percentage;

  return [percentage, displayPercentage];
};

export default useDisplayPercentage;
