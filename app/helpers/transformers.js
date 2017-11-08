import { transformers } from 'link-lib';

const PRIO_MAX = 1.0;

export default {
  transformers: [
    {
      acceptValue: PRIO_MAX,
      mediaTypes: 'application/vnd.api+json',
      transformer: transformers.jsonapi,
    },
  ],
};
