import rdf, { SomeTerm } from '@ontologies/core';
import equal from 'fast-deep-equal';
import {
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { useIRITemplate } from '../../hooks/useIRITemplate';
import Button from '../Button';
import { useCollectionOptions } from '../Collection/CollectionProvider';

interface SearchFormProps {
  autoFocus?: boolean;
  placeholder: SomeTerm;
  query: SomeTerm;
}

const SearchForm: React.FC<SearchFormProps> = ({
  autoFocus,
  placeholder,
  query,
}) => {
  const lrs = useLRS();
  const queryNormalized = query?.value ?? '';
  const { subject } = useLinkRenderContext();
  const iriTemplate = useIRITemplate(subject);
  const { setCollectionResource } = useCollectionOptions();

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
          return;
        }
        const newPage = iriTemplate.replace('q', q || []);

        if (newPage) {
          if (setCollectionResource) {
            return setCollectionResource(newPage);
          }

          return lrs.actions.ontola.navigate(newPage);
        }
      }}
    />
  );
};

SearchForm.defaultProps = {
  autoFocus: true,
};

export default SearchForm;
