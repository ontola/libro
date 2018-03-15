import PropTypes from 'prop-types';
import React from 'react';
import { formValueSelector, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import {
  getOmniformType,
  omniformInitialize,
  omniformSetType,
} from '../../state/omniform/duck';
import Card from '../Card';
import Button from '../Button';

import ArgumentFields from './ArgumentFields';
import CommentFields from './CommentFields';

import './Omniform.scss';

const propTypes = {
  // The NamedNode of the currently selected form.
  currentType: PropTypes.string.isRequired,
  error: PropTypes.string,
  // Unique name of the form
  form: PropTypes.string.isRequired,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  // From redux-form
  invalid: PropTypes.bool,
  onInitialize: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const currentForm = (currentType, formName) => {
  switch (currentType) {
    case 'pro':
      return <ArgumentFields formName={formName} side="pro" />;
    case 'con':
      return <ArgumentFields formName={formName} side="con" />;
    case 'comment':
      return <CommentFields formName={formName} />;
    default:
      return null;
  }
};

const typeIcon = (type) => {
  switch (type) {
    case 'pro':
      return 'plus';
    case 'con':
      return 'minus';
    case 'comment':
      return 'comment';
    default:
      return 'exclamation-triangle';
  }
};

const typeName = (type) => {
  switch (type) {
    case 'pro':
      return 'Voordeel';
    case 'con':
      return 'Probleem';
    case 'comment':
      return 'Reactie';
    default:
      return type;
  }
};

class Omniform extends React.Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  buttonCreator(type) {
    return (
      <Button
        className={`Button--omniform-switcher Button--omniform-switcher--${type} ${(type === this.props.currentType) ? 'Button--omniform-switcher--current' : null}`}
        icon={typeIcon(type)}
        theme="omniform-switcher"
        onClick={this.props.onTypeChange(type)}
      >
        {typeName(type)}
      </Button>
    );
  }

  render() {
    const {
      currentType,
      error,
      form,
      invalid,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <Card>
        <form
          className="Omniform"
          onSubmit={handleSubmit}
        >
          {error &&
            <div className="Omniform__error">
              <FontAwesome name="exclamation-triangle" />
              {error}
            </div>
          }
          {currentForm(currentType, form)}
          <div className="Omniform__footer">
            <div className="Omniform__actor-switcher" />
            {this.buttonCreator('comment')}
            {this.buttonCreator('pro')}
            {this.buttonCreator('con')}
            <Button
              plain
              className="Omniform__submit"
              disabled={invalid}
              icon="send"
              loading={submitting}
              type="submit"
            >
              Opslaan
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const formName = `Omniform-${ownProps.parentIRI}`;

  return ({
    currentType: getOmniformType(state, ownProps.parentIRI),
    currentValue: formValueSelector(formName)(state, 'search'),
    form: formName,
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  onInitialize: () => dispatch(omniformInitialize({
    currentType: 'comment',
    parentIRI: props.parentIRI,
  })),
  onTypeChange: type => () => {
    dispatch(omniformSetType({
      currentType: type,
      parentIRI: props.parentIRI,
    }));
  },
});

const OmniformContainer =
  connect(mapStateToProps, mapDispatchToProps)(reduxForm({})(Omniform));

export default OmniformContainer;
