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

import { NS } from '../../helpers/LinkedRenderStore';
import { retrievePath } from '../../helpers/iris';
import { allTopologiesExcept } from '../../topologies';
import { navbarTopology } from '../../topologies/Navbar';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import Container from '../../topologies/Container';
import SearchForm from '../../components/SearchForm';

export const SearchResultPage = ({
  collectionDisplay,
  history,
  query,
  searchTemplate,
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
      label={NS.ontola('defaultPagination')}
      onPageChange={url => history.push(retrievePath(url))}
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
          query={query}
          searchTemplate={searchTemplate}
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
          label={NS.ontola('collectionFrame')}
          pagination={pagination}
        />
      </Container>
    </React.Fragment>
  );
};

SearchResultPage.type = NS.argu('SearchResult');

SearchResultPage.topology = allTopologiesExcept(navbarTopology, widgetTopologyTopology);

SearchResultPage.hocs = [withRouter];

SearchResultPage.mapDataToProps = {
  collectionDisplay: NS.ontola('collectionDisplay'),
  query: NS.argu('query'),
  searchTemplate: NS.ontola('searchTemplate'),
  took: NS.argu('took'),
  totalItems: as.totalItems,
};

SearchResultPage.propTypes = {
  collectionDisplay: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  query: linkType,
  searchTemplate: PropTypes.string,
  subject: subjectType,
  took: linkType,
  totalItems: linkType,
};

export default register(SearchResultPage);
