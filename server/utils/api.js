import request from 'superagent-bluebird-promise';

export const apiFetch = (action, host) => {
  const apiUrl = `http://${host}:3030/api/`;
  
  console.log(action);

  let promise = request.get(apiUrl + 'motions')
    .query({
      ...action.data,
    });

  return promise
    .promise()
    .then(res => res.body);
};
