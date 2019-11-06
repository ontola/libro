import URL from 'url';

import './useFactory';
import './server';

// global.btoa = function (str) { return Buffer.from(str).toString('base64'); };
global.URL = URL.URL;
