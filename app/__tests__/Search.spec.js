import { defaultNS as NS, toGraph } from 'link-lib';

import { describeView } from '../../tests/specHelper';
import { containerTopology } from '../topologies/Container';
import { pageTopology } from '../topologies/Page';
import { getViews } from '../views';
import { SearchResultPage } from '../views/SearchResult/SearchResultPage';

describe('Search', () => {
  const testIRI = NS.example('test/search?q=keyword');
  const seqIRI = NS.example('test/search/results');

  const searchResult = {
    '@id': testIRI.value,
    [NS.rdf.type]: NS.argu('SearchResult'),
    [NS.dc.identifier]: testIRI,
    [NS.argu('query')]: 'keyword',
    [NS.argu('took')]: 240,
    [NS.as.totalItems]: 3,
    [NS.as.items]: seq([
      {
        '@id': NS.example('1'),
        [NS.rdf.type]: NS.schema.CreativeWork,
        [NS.schema.name]: 'Item 1',
      },
      {
        '@id': NS.example('2'),
        [NS.rdf.type]: NS.argu('Question'),
        [NS.schema.name]: 'Item 2',
      },
      {
        '@id': NS.example('3'),
        [NS.rdf.type]: NS.schema.Thing,
        [NS.schema.name]: 'Item 3',
      },
    ], seqIRI),
  };

  const [iri, graph] = toGraph(searchResult);

  describeView('SearchResult', getViews(), graph, iri, () => {
    as(pageTopology, () => {
      it('renders a SearchResult', () => {
        expect(subject).toRenderView(SearchResultPage);
      });

      it('renders the search input', () => {
        expect(subject).toRenderResource(iri);
        within([containerTopology], (subject) => {
          expect(subject.find('Button')).toHaveText('Search');
          expect(subject.find('input')).toHaveProp('type', 'search');
          expect(subject.find('input')).toHaveProp('value', 'keyword');
        });
      });

      it('renders the search info', () => {
        expect(subject.find('p.SearchResult__query-info'))
          .toHaveText('3 results in 240ms');
      });

      it('renders the search results', () => {
        expect(subject).toRenderResource(seqIRI);
        within(seqIRI, (subject) => {
          expect(subject).toRenderResource(NS.example('1'));
          expect(subject).toRenderResource(NS.example('2'));
          expect(subject).toRenderResource(NS.example('3'));
        });
      });
    });
  });
});
