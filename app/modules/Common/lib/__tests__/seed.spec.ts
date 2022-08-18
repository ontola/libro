import rdf from '@ontologies/core';

import { seedToSlice } from '../seed';

describe('seed', () => {
  const seedTests = (websiteIRI: string, answers: Record<string, string>) => {
    it('handles empty seed', () => {
      const slice = seedToSlice(JSON.stringify({}), websiteIRI, {});

      expect(slice).toEqual({});
    });

    it('handles empty object', () => {
      const slice = seedToSlice(JSON.stringify({
        1: {
          _id: {
            type: 'id',
            v: '1',
          },
        },
      }), websiteIRI, {});

      expect(slice).toEqual({
        1: {
          _id: rdf.namedNode('1'),
        },
      });
    });

    it('handles blank nodes', () => {
      const slice = seedToSlice(JSON.stringify({
        '_:abc': {
          _id: {
            type: 'lid',
            v: '_:abc',
          },
        },
      }), websiteIRI, {});

      expect(slice).toEqual({
        '_:abc': {
          _id: rdf.blankNode('_:abc'),
        },
      });
    });

    it('handles absolute paths', () => {
      const data = JSON.stringify({
        '/1': {
          _id: {
            type: 'id',
            v: '/1',
          },
        },
      });
      const slice = seedToSlice(data, websiteIRI, {});

      expect(slice).toEqual({
        [answers.absolutePath]: {
          _id: rdf.namedNode(answers.absolutePath),
        },
      });
    });

    it('handles root', () => {
      const data = JSON.stringify({
        '/': {
          _id: {
            type: 'id',
            v: '/',
          },
        },
      });
      const slice = seedToSlice(data, websiteIRI, {});

      expect(slice).toEqual({
        [answers.root]: {
          _id: rdf.namedNode(answers.root),
        },
      });
    });

    it('handles single fields', () => {
      const slice = seedToSlice(JSON.stringify({
        1: {
          _id: {
            type: 'id',
            v: '1',
          },
          myName: {
            type: 's',
            v: 'name',
          },
        },
      }), websiteIRI, {});

      expect(slice).toEqual({
        1: {
          _id: rdf.namedNode('1'),
          myName: rdf.literal('name'),
        },
      });
    });

    it('handles shortened field names', () => {
      const symbolMap = {
        'attachments': 'https://argu.co/ns/core#attachments',
      };
      const slice = seedToSlice(JSON.stringify({
        1: {
          _id: {
            type: 'id',
            v: '1',
          },
          attachments: {
            type: 's',
            v: 'name',
          },
        },
      }), websiteIRI, symbolMap);

      expect(slice).toEqual({
        1: {
          _id: rdf.namedNode('1'),
          'https://argu.co/ns/core#attachments': rdf.literal('name'),
        },
      });
    });

    it('handles multimap fields', () => {
      const slice = seedToSlice(JSON.stringify({
        1: {
          _id: {
            type: 'id',
            v: '1',
          },
          myName: [
            {
              l: 'en',
              type: 'ls',
              v: 'name',
            },
            {
              l: 'nl',
              type: 'ls',
              v: 'naam',
            },
          ],
        },
      }), websiteIRI, {});

      expect(slice).toEqual({
        1: {
          _id: rdf.namedNode('1'),
          myName: [
            rdf.literal('name', 'en'),
            rdf.literal('naam', 'nl'),
          ],
        },
      });
    });
  };

  describe('apex', () => {
    const websiteIRI = 'https://example.com/';

    seedTests(websiteIRI, {
      absolutePath: 'https://example.com/1',
      root: 'https://example.com/',
    });
  });

  describe('subpath', () => {
    const websiteIRI = 'https://example.com/info';

    seedTests(websiteIRI, {
      absolutePath: 'https://example.com/info/1',
      root: 'https://example.com/info',
    });
  });
});
