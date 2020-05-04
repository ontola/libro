import rdf from '@ontologies/core';
import equal from 'fast-deep-equal';
import { linkType, useLinkRenderContext } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button from '../Button';
import { useIRITemplate } from '../../hooks/useIRITemplate';

const SearchForm = ({
  autoFocus,
  placeholder,
  query,
  setCurrentPage,
}) => {
  const queryNormalized = query?.value ?? '';
  const { subject } = useLinkRenderContext();
  const { iriSetParam } = useIRITemplate(subject);

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
            autoFocus={autoFocus}
            className="SearchResult__form-input"
            component="input"
            name="q"
            placeholder={placeholder?.value}
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
        if (rdf.equals(q === queryNormalized)) {
          return null;
        }

        return setCurrentPage(iriSetParam('q', q));
      }}
    />
  );
};

SearchForm.defaultProps = {
  autoFocus: true,
};

SearchForm.propTypes = {
  autoFocus: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  placeholder: linkType,
  query: linkType,
  setCurrentPage: PropTypes.func,
};

export default SearchForm;
