export const handleRecord = record => ({
  payload: {
    record,
  },
  type: record.getIn(['apiDesc', 'actions', 'resource']),
});

export const handleRequest = ({
  payload,
  type,
}) => ({
  payload: {
    id: payload.id,
    loading: true,
  },
  type,
});

export const handleError = ({
  payload,
  type,
}, error) => ({
  error: true,
  payload: {
    id: payload.id,
    message: error.message || 'Something bad happened...',
  },
  type,
});
