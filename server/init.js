import URL from 'url';

import './server';

// global.btoa = function (str) { return Buffer.from(str).toString('base64'); };
global.URL = URL.URL;
