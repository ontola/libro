import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import FontAwesome from 'react-fontawesome';
import { text } from 'state/search/selectors';

const propTypes = {
  currentValue: PropTypes.string,
  handleClear: PropTypes.func.isRequired,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
};

console.log(text);

let SearchInput = ({
  currentValue,
  handleClear,
  handleSubmit,
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
    {currentValue &&
      <button
        type="reset"
        onClick={handleClear}
        className="SideBar__search-clear"
      >
        <FontAwesome name="close" />
      </button>}
  </form>
;

SearchInput.propTypes = propTypes;

const formName = 'searchLocalInput';

SearchInput = reduxForm({
  form: formName,
})(SearchInput);

SearchInput = connect(
  (state, ownProps) => ({
    initialValues: { search: text },
    currentValue: formValueSelector(formName),
  }),
  {}
)(SearchInput);

export default SearchInput;
