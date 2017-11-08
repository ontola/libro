import { DataWorker as dataWorker } from 'link-lib';
import { DOMParser } from 'xmldom';

// eslint-disable-next-line no-restricted-globals
self.DOMParser = DOMParser;

import transformers from '../helpers/transformers';

dataWorker(transformers);
