import rdf from '@ontologies/core';

import { seedToSlice } from '../seed';

describe('seed', () => {
  it('handles empty seed', () => {
    const slice = seedToSlice(JSON.stringify({}));

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
    }));

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
    }));

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
    const websiteIRI = 'https://example.com';
    const slice = seedToSlice(data, websiteIRI);

    expect(slice).toEqual({
      'https://example.com/1': {
        _id: rdf.namedNode('https://example.com/1'),
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
    }));

    expect(slice).toEqual({
      1: {
        _id: rdf.namedNode('1'),
        myName: rdf.literal('name'),
      },
    });
  });

  it('handles shortened field names', () => {
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
    }));

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
    }));

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
});
