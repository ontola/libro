import { DataWorker as dataWorker } from 'link-lib';
import { DOMParser } from 'xmldom';

self.DOMParser = DOMParser;

import transformers from '../helpers/transformers';

dataWorker(transformers);
