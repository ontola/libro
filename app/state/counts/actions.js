import Count from 'models/Count';

export const fetchCount = id => Count.fetch(id);

export default fetchCount;
