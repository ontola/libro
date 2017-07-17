import { transformers } from 'link-lib';

const PRIO_MAX = 1.0;

export default {
  transformers: [
    {
      transformer: transformers.jsonapi,
      mediaTypes: 'application/vnd.api+json',
      acceptValue: PRIO_MAX,
    },
  ],
};
