/* eslint-disable no-param-reassign */
import fetch from 'isomorphic-fetch';

import * as constants from '../../app/config';

const clientID = process.env.RAILS_OAUTH_CLIENT_ID;
const clientSecret = process.env.RAILS_OAUTH_CLIENT_SECRET;
const oauthToken = process.env.RAILS_OAUTH_TOKEN;

const SERVER_TIMESTAMP_MULTI = 1000;

function login(req, res) {
  fetch(
    `${constants.ARGU_API_URL}/oauth/token`,
    {
      body: JSON.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'password',
        password: req.body.password,
        scope: 'user',
        username: req.body.email,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      redirect: 'error',
      strictSSL: false,
    }
  )
  .then(response => response.json()
  .then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (response.status >= 200 && response.status < 300) {
      const expiresAt = new Date(
        (json.created_at * SERVER_TIMESTAMP_MULTI) + (json.expires_in * SERVER_TIMESTAMP_MULTI)
      );
      if (json.token_type === 'bearer' && expiresAt > Date.now()) {
        req.session.arguToken = {
          accessToken: json.access_token,
          expiresAt,
          scope: json.scope,
        };
        res.send({ status: 'LOGGED_IN' }).end();
      } else {
        throw new Error(req.access_token);
      }
    } else if (response.status === 422 && json.error.code === 'WRONG_CREDENTIALS') {
      // @TODO: Handle form error
      res.send(json).end();
    } else {
      throw new Error(req.access_token);
    }
  }).catch((e) => {
    res.status(500);
    res.end(JSON.stringify(e));
  });
}

function signUp(req, res) {
  fetch(
    `${constants.ARGU_API_URL}/users`,
    {
      body: JSON.stringify({
        user: {
          email: req.body.email
        },
      }),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      redirect: 'error',
      strictSSL: false,
    }
  )
  .then((resp) => {
    if (resp.status === 422) {
      res.send({ status: 'EMAIL_TAKEN' });
      res.end();
    } else {
      throw new Error('Unknown error code 5241 occurred');
    }
  }).catch(() => {
    res.status(500);
    res.end('error');
  });
}

export default (req, res) => {
  if (req.body.password) {
    login(req, res);
  } else {
    signUp(req, res);
  }
};
