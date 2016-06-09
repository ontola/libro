import request from 'superagent-bluebird-promise';

export const apiFetch = (action, host) => {
  const apiUrl = `http://${host}:3030/api/`;

  let promise = request.get(apiUrl + action.url)
    .query({
      ...action.data,
    });

  return promise
    .promise()
    .then(res => res.body);
};
