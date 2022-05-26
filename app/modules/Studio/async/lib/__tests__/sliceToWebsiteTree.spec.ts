import rdf from '@ontologies/core';

import { empJsonId } from '../../../../../helpers/empjsonSerializer';
import example from '../../../../../ontology/example';
import { sliceToWebsiteTree } from '../sliceToWebsiteTree';

describe('sliceToWebsiteTree', () => {
  it('processes an empty slice', () => {
    expect(sliceToWebsiteTree({})).toEqual({});
  });

  it('processes a relative origin without subresources', () => {
    const slice = {
      '/': {
        _id: empJsonId(rdf.namedNode('/')),
      },
    };

    expect(sliceToWebsiteTree(slice)).toEqual({
      '/': {
        children:  {},
        fragments: [],
        icon: undefined,
        path: '',
        segment: '/',
      },
    });
  });

  it('processes an origin without subresources', () => {
    const slice = {
      'https://example.com/': {
        _id: empJsonId(example.root),
      },
    };

    expect(sliceToWebsiteTree(slice)).toEqual({
      'http://www.example.com/': {
        children:  {},
        fragments: [],
        icon: undefined,
        path: '',
        segment: 'http://www.example.com/',
      },
    });
  });

  it('processes an origin with holes', () => {
    const slice = {
      'https://example.com/': {
        _id: empJsonId(example.root),
      },
      'https://example.com/foo/bar': {
        _id: empJsonId(example.ns('foo/bar')),
      },
    };

    expect(sliceToWebsiteTree(slice)).toEqual({
      'http://www.example.com/': {
        children: {
          'foo': {
            children: {
              'bar': {
                children: {},
                fragments: [],
                icon: undefined,
                path: 'foo/bar',
                segment: 'bar',
              },
            },
            fragments: [],
            icon: undefined,
            path: 'foo',
            segment: 'foo',
          },
        },
        fragments: [],
        icon: undefined,
        path: '',
        segment: 'http://www.example.com/',
      },
    });
  });

  it('processes an origin with subresources', () => {
    const slice = {
      'https://example.com/': {
        _id: empJsonId(example.root),
      },
      'https://example.com/foo': {
        _id: empJsonId(example.ns('foo')),
      },
      'https://example.com/foo#title': {
        _id: empJsonId(example.ns('foo#title')),
      },
      'https://example.com/foo/bar': {
        _id: empJsonId(example.ns('foo/bar')),
      },
    };

    expect(sliceToWebsiteTree(slice)).toEqual({
      'http://www.example.com/': {
        children: {
          'foo': {
            children: {
              'bar': {
                children: {},
                fragments: [],
                icon: undefined,
                path: 'foo/bar',
                segment: 'bar',
              },
            },
            fragments: [
              'title',
            ],
            icon: undefined,
            path: 'foo',
            segment: 'foo',
          },
        },
        fragments: [],
        icon: undefined,
        path: '',
        segment: 'http://www.example.com/',
      },
    });
  });

  it('processes an origin with fragments', () => {
    const slice = {
      'https://argu.localdev/info': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info')) },
      'https://argu.localdev/info#CTABlock': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#CTABlock')) },
      'https://argu.localdev/info#CoverImage': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#CoverImage')) },
      'https://argu.localdev/info#budgetting': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#budgetting')) },
      'https://argu.localdev/info#bullhorn': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#bullhorn')) },
      'https://argu.localdev/info#checklist': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#checklist')) },
      'https://argu.localdev/info#filtration': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#filtration')) },
      'https://argu.localdev/info#flag': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#flag')) },
      'https://argu.localdev/info#highlightedCases': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#highlightedCases')) },
      'https://argu.localdev/info#infographic': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#infographic')) },
      'https://argu.localdev/info#lock': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#lock')) },
      'https://argu.localdev/info#moreInformation': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#moreInformation')) },
      'https://argu.localdev/info#notification': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#notification')) },
      'https://argu.localdev/info#photo': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#photo')) },
      'https://argu.localdev/info#propositions': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#propositions')) },
      'https://argu.localdev/info#scenario-discussion': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#scenario-discussion')) },
      'https://argu.localdev/info#tenantFiltration': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#tenantFiltration')) },
      'https://argu.localdev/info#vote': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info#vote')) },
      'https://argu.localdev/info/community': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info/community')) },
      'https://argu.localdev/info/energietransitie': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info/energietransitie')) },
      'https://argu.localdev/info/menus/footer': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info/menus/footer')) },
      'https://argu.localdev/info/participatie': { _id: empJsonId(rdf.namedNode('https://argu.localdev/info/participatie')) },
      'https://argu.localdev/menus/footer/argu': { _id: empJsonId(rdf.namedNode('https://argu.localdev/menus/footer/argu')) },
    };

    expect(sliceToWebsiteTree(slice)).toEqual({
      'https://argu.localdev/': {
        children: {
          info: {
            children: {
              community: {
                children: {},
                fragments: [],
                icon: undefined,
                path: 'info/community',
                segment: 'community',
              },
              energietransitie: {
                children: {},
                fragments: [],
                icon: undefined,
                path: 'info/energietransitie',
                segment: 'energietransitie',
              },
              menus: {
                children: {
                  footer: {
                    children: {},
                    fragments: [],
                    icon: undefined,
                    path: 'info/menus/footer',
                    segment: 'footer',
                  },
                },
                fragments: [],
                icon: undefined,
                path: 'info/menus',
                segment: 'menus',
              },
              participatie: {
                children: {},
                fragments: [],
                icon: undefined,
                path: 'info/participatie',
                segment: 'participatie',
              },
            },
            fragments: [
              'CTABlock',
              'CoverImage',
              'budgetting',
              'bullhorn',
              'checklist',
              'filtration',
              'flag',
              'highlightedCases',
              'infographic',
              'lock',
              'moreInformation',
              'notification',
              'photo',
              'propositions',
              'scenario-discussion',
              'tenantFiltration',
              'vote',
            ],
            icon: undefined,
            path: 'info',
            segment: 'info',
          },
          menus: {
            children: {
              footer: {
                children: {
                  argu: {
                    children: {},
                    fragments: [],
                    icon: undefined,
                    path: 'menus/footer/argu',
                    segment: 'argu',
                  },
                },
                fragments: [],
                icon: undefined,
                path: 'menus/footer',
                segment: 'footer',
              },
            },
            fragments: [],
            icon: undefined,
            path: 'menus',
            segment: 'menus',
          },
        },
        fragments: [],
        icon: undefined,
        path: '',
        segment: 'https://argu.localdev/',
      },
    });
  });
});
