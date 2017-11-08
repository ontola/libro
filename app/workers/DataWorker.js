import { DataWorker as dataWorker } from 'link-lib';
import { DOMParser } from 'xmldom';

import transformers from '../helpers/transformers';

// eslint-disable-next-line no-restricted-globals
self.DOMParser = DOMParser;

dataWorker(transformers);
