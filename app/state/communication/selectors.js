export const getLoadingBool = state => state.getIn(['communication', 'isLoading']);
export const getErrorBool = state => state.getIn(['communication', 'isError']);
export const getErrorMsg = state => state.getIn(['communication', 'errorMessage']);
