import { createNS } from '@ontologies/core';

import { OntologyMap, generateOntologyDeclerations } from '../generateEditorLibs/generateOntologyDeclerations';
import { generateEditorLibs } from '../generateEditorLibs/index';

const ns = createNS('https://fuckblockchain.com/ns#');

const fakeOntology = {
  ns,
  // eslint-disable-next-line sort-keys
  TrendGraph: ns('TrendGraph'),
  ['Weird:Variable//Thing']: ns('Weird:Variable//Thing'),
  trend: ns('trend'),
};

const ontologyMap: OntologyMap = [
  [fakeOntology, 'fakeOntology'],
];

describe('generateEditorLibs', () => {
  it('should return a string', () => {
    const result = generateEditorLibs();
    expect(typeof result).toBe('string');
  });

  describe('generateOntologyDeclerations', () => {
    it('should return a string', () => {
      const result = generateOntologyDeclerations([]);
      const result2 = generateOntologyDeclerations(ontologyMap);

      expect(typeof result).toEqual('string');
      expect(typeof result2).toEqual('string');
    });

    it('should parse the ontology correctly', () => {
      const result = generateOntologyDeclerations(ontologyMap);
      expect(result).toMatchSnapshot();
    });
  });
});
