export const handleRecord = record => ({
  type: record.getIn(['apiDesc', 'actions', 'resource']),
  payload: {
    record,
  },
});

export const handleRequest = ({ type, payload }) => ({
  type,
  payload: {
    loading: true,
    id: payload.id,
  },
});

export const handleError = ({ type, payload }, { message }) => ({
  type,
  error: true,
  payload: {
    message,
    id: payload.id,
  },
});
