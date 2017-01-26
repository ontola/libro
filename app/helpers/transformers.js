import formatProvider from 'rdf-formats-common';
import { transformers } from 'link-lib';

const formats = formatProvider();
const PRIO_MAX = 1.0;
const PRIO_HIGH = 0.8;

const SPLICE_ONE = 1;
const mediaTypes = Object.keys(formats.parsers);
mediaTypes.splice(mediaTypes.indexOf('text/html'), SPLICE_ONE);
const rdf = mediaTypes.splice(mediaTypes.indexOf('application/rdf+xml'), SPLICE_ONE);

let rdfxml;
if (rdf[0]) {
  rdfxml = {
    transformer: transformers.rdfFormatsCommon,
    mediaTypes: 'application/rdf+xml',
    acceptValue: PRIO_MAX,
  };
}

export default {
  transformers: [
    {
      transformer: transformers.jsonapi,
      mediaTypes: 'application/vnd.api+json',
      acceptValue: PRIO_MAX,
    },
    {
      transformer: transformers.rdfFormatsCommon,
      mediaTypes,
      acceptValue: PRIO_HIGH,
    },
    rdfxml,
  ],
};
