import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';

import { Button } from '../components';

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
    className="SideBar__search-form"
    onSubmit={handleSubmit}
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
      icon="close"
      theme="transparant"
      type="reset"
      onClick={() => handleClear()}
    />
    }
    {currentValue && (currentValue !== lastSearchValue) &&
    <Button type="submit">
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
  lastSearchValue: '',
}))(SearchInputForm);

export default SearchInputContainer;
