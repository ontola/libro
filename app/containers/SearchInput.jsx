import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';

import { text as currentQuerySelector } from 'state/speeches/selectors';

import {
  Button,
} from '../components';

const propTypes = {
  currentValue: PropTypes.string,
  handleClear: PropTypes.func.isRequired,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  lastSearchValue: PropTypes.string,
};

const SearchInput = ({
  currentValue,
  handleClear,
  handleSubmit,
  lastSearchValue,
}) => (
  <form
    onSubmit={handleSubmit}
    className="SideBar__search-form"
  >
    <Field
      className="SideBar__search"
      component="input"
      name="search"
      placeholder="Zoeken..."
      type="text"
    />
    {(currentValue || lastSearchValue) &&
    <Button
      type="reset"
      onClick={() => handleClear()}
      theme="transparant"
      icon="close"
    />
    }
    {currentValue && (currentValue !== lastSearchValue) &&
    <Button
      type="submit"
    >
      Zoek
    </Button>
    }
  </form>
);
SearchInput.propTypes = propTypes;

const formName = 'searchLocalInput';

const SearchInputForm = reduxForm({
  form: formName,
})(SearchInput);

const SearchInputContainer = connect(state => ({
  currentValue: formValueSelector(formName)(state, 'search'),
  lastSearchValue: currentQuerySelector(state),
}))(SearchInputForm);

export default SearchInputContainer;
