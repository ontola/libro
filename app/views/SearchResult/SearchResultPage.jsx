import {
  linkType,
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import Button from '../../components/Button';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../topologies';
import { navbarTopology } from '../../topologies/Navbar';
import Container from '../../topologies/Container';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'Enter a query',
    id: 'https://app.argu.co/i18n/search/input/placeholder',
  },
});

export const SearchResultPage = ({
  collectionDisplay,
  history,
  intl: { formatMessage },
  location,
  query,
  took,
  totalItems,
}) => {
  const queryNormalized = query?.value ?? '';
  const search = new URLSearchParams(location.search);

  return (
    <React.Fragment>
      <Container>
        <div className="SearchResult__header">
          <Property label={NS.schema('isPartOf')} />
        </div>
        <Form
          initialValues={{ q: queryNormalized }}
          render={({ handleSubmit }) => (
            <form className="SearchResult__form" onSubmit={handleSubmit}>
              <Field
                autoFocus
                className="SearchResult__form-input"
                component="input"
                name="q"
                placeholder={formatMessage(messages.placeholder)}
                type="search"
              />
              <Button className="SearchResult__form-submit" type="submit">
                <FormattedMessage
                  defaultMessage="Search"
                  id="https://app.argu.co/i18n/search/button/label"
                />
              </Button>
            </form>
          )}
          onSubmit={({ q }) => {
            if (q === queryNormalized) {
              return;
            }

            if (q) {
              search.set('q', q);
            } else {
              search.delete('q');
            }

            history.push(`${location.pathname}${search ? `?${search}` : ''}${location.hash}`);
          }}
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
          collectionDisplay={collectionDisplay}
          empty={() => (
            <div className="SearchResult__empty">
              {formatMessage(messages.placeholder)}
            </div>
          )}
          label={NS.as('items')}
        />
        <Property label={NS.as('last')} />
      </Container>
    </React.Fragment>
  );
};

SearchResultPage.type = NS.argu('SearchResult');

SearchResultPage.topology = allTopologiesExcept(navbarTopology);

SearchResultPage.hocs = [injectIntl, withRouter];

SearchResultPage.mapDataToProps = [
  NS.argu('query'),
  NS.argu('took'),
  NS.as('totalItems'),
  NS.ontola('collectionDisplay'),
];

SearchResultPage.propTypes = {
  collectionDisplay: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  query: linkType,
  took: linkType,
  totalItems: linkType,
};

export default register(SearchResultPage);
