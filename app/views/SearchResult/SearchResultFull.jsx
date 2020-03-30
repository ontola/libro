import as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import SearchForm from '../../components/SearchForm';
import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import Container from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { navbarTopology } from '../../topologies/Navbar';
import { pageTopology } from '../../topologies/Page';

export const SearchResultFull = ({
  collectionDisplay,
  history,
  iriTemplate,
  query,
  subject,
  took,
  totalItems,
}) => {
  const body = (
    <Property
      collectionDisplay={collectionDisplay}
      empty={() => null}
      label={as.items}
    />
  );
  const pagination = (
    <Property
      forceRender
      redirectPagination
      currentPage={subject.value}
      label={ontola.defaultPagination}
      onPageChange={(url) => history.push(retrievePath(url))}
    />
  );

  return (
    <React.Fragment>
      <Container>
        <div className="SearchResult__header">
          <Property label={schema.isPartOf} />
        </div>
        <SearchForm
          history={history}
          iriTemplate={iriTemplate}
          query={query}
        />
        {totalItems && took && (
          <p className="SearchResult__query-info">
            <FormattedMessage
              defaultMessage="{totalItems} results in {took}ms"
              description="Gives info on query execution, with {took} in ms"
              id="https://app.argu.co/i18n/search/info/message"
              values={{
                took: took?.value,
                totalItems: totalItems?.value,
              }}
            />
          </p>
        )}
      </Container>
      <Container size="large">
        <Property
          forceRender
          body={body}
          label={ontola.collectionFrame}
          pagination={pagination}
        />
      </Container>
    </React.Fragment>
  );
};

SearchResultFull.type = argu.SearchResult;

SearchResultFull.topology = allTopologiesExcept(gridTopology, navbarTopology, pageTopology);

SearchResultFull.hocs = [withRouter];

SearchResultFull.mapDataToProps = {
  collectionDisplay: ontola.collectionDisplay,
  iriTemplate: ontola.iriTemplate,
  query: argu.query,
  took: argu.took,
  totalItems: as.totalItems,
};

SearchResultFull.propTypes = {
  collectionDisplay: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  iriTemplate: linkType,
  query: linkType,
  subject: subjectType,
  took: linkType,
  totalItems: linkType,
};

export default register(SearchResultFull);
