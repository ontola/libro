export const handleRecord = record => ({
  type: record.getIn(['apiDesc', 'actions', 'resource']),
  payload: {
    record,
  },
});

export const handleRequest = ({
  payload,
  type,
}) => ({
  type,
  payload: {
    loading: true,
    id: payload.id,
  },
});

export const handleError = ({
  payload,
  type,
}, error) => ({
  type,
  error: true,
  payload: {
    message: error.message || 'Something bad happened...',
    id: payload.id,
  },
});
