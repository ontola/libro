import equal from 'fast-deep-equal';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form } from 'react-final-form';
import {
  FormattedMessage,
  defineMessages,
  useIntl,
} from 'react-intl';

import Button from '../Button';
import { retrievePath } from '../../helpers/iris';
import { searchIri } from '../../views/SearchResult/searchHelper';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'Enter a query',
    id: 'https://app.argu.co/i18n/search/input/placeholder',
  },
});

const SearchForm = ({
  history,
  query,
  searchTemplate,
}) => {
  const { formatMessage } = useIntl();
  const queryNormalized = query?.value ?? '';

  return (
    <Form
      initialValues={{ q: queryNormalized }}
      initialValuesEqual={equal}
      render={({ handleSubmit }) => (
        <form
          className="SearchResult__form"
          data-testid="search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <Field
            autoFocus
            className="SearchResult__form-input"
            component="input"
            name="q"
            placeholder={formatMessage(messages.placeholder)}
            type="search"
          />
          <Button
            className="SearchResult__form-submit"
            type="submit"
          >
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

        history.push(retrievePath(searchIri(searchTemplate.value, q, 1).value));
      }}
    />
  );
};

SearchForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  query: linkType,
  searchTemplate: PropTypes.string,
};

export default SearchForm;