import { createNS } from '@ontologies/core';

const dbo = createNS('http://dbpedia.org/ontology/');

export default {
  ns: dbo,

  // eslint-disable-next-line sort-keys
  abstract: dbo('abstract'),
  filename: dbo('filename'),
  thumbnail: dbo('thumbnail'),
};
