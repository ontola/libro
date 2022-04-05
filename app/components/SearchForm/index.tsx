import { makeStyles } from '@material-ui/styles';
import rdf, { SomeTerm } from '@ontologies/core';
import equal from 'fast-deep-equal';
import { useLRS, useLinkRenderContext } from 'link-redux';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { useIRITemplate } from '../../hooks/useIRITemplate';
import { LibroTheme, Margin } from '../../themes/themes';
import Button from '../Button';
import { useCollectionOptions } from '../Collection/CollectionContext';

interface SearchFormProps {
  autoFocus?: boolean;
  placeholder: SomeTerm;
  query: SomeTerm;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  searchResultForm: {
    display: 'flex',
    marginBottom: '1em',
  },
  searchResultFormInput: {
    WebkitAppearance: 'none',
    border: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    boxShadow: theme.boxShadow.base,
    flex: '1 0 8em',
    fontSize: theme.typography.fontSizes.medium,
    padding: theme.spacing(0, Margin.Large),
  },
  searchResultFormSubmit: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
}));

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
  const classes = useStyles();

  return (
    <Form
      initialValues={{ q: queryNormalized }}
      initialValuesEqual={equal}
      render={({ handleSubmit }) => (
        <form
          className={classes.searchResultForm}
          data-testid="search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <Field
            autoFocus={autoFocus}
            className={classes.searchResultFormInput}
            component="input"
            name="q"
            placeholder={placeholder?.value}
            type="search"
          />
          <Button
            className={classes.searchResultFormSubmit}
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
