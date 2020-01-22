import { createNS } from '@ontologies/core';

const dbo = createNS('http://dbpedia.org/ontology/');

export default {
  ns: dbo,

  abstract: dbo('abstract'),
  filename: dbo('filename'),
  thumbnail: dbo('thumbnail'),
};
