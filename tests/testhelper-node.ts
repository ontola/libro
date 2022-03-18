import '@testing-library/jest-dom';

global.atob = require('atob');
global.btoa = require('btoa');
global.fetch = require('jest-fetch-mock');
