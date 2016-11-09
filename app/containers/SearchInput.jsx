import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { text as currentQuerySelector } from 'state/speeches/selectors';

import {
  Button,
} from 'components';

const propTypes = {
  currentValue: PropTypes.string,
  lastSearchValue: PropTypes.string,
  handleClear: PropTypes.func.isRequired,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
};

const SearchInput = ({
  currentValue,
  handleClear,
  handleSubmit,
  lastSearchValue,
}) =>
  <form
    onSubmit={handleSubmit}
    className="SideBar__search-form"
  >
    <Field
      name="search"
      placeholder="Zoeken..."
      className="SideBar__search"
      component="input"
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
;

SearchInput.propTypes = propTypes;

const formName = 'searchLocalInput';

const SearchInputForm = reduxForm({
  form: formName,
})(SearchInput);

const SearchInputContainer = connect(
  state => ({
    lastSearchValue: currentQuerySelector(state),
    currentValue: formValueSelector(formName)(state, 'search'),
  })
)(SearchInputForm);

export default SearchInputContainer;
