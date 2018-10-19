
export default date => ((date && date.termType) ? new Date(date.value) : date) < Date.now();
