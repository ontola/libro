import equal from 'fast-deep-equal';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { Input } from '../Input';

const propTypes = {
  action: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  formID: PropTypes.string.isRequired,
  method: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Literal),
  ]),
  onSubmit: PropTypes.func.isRequired,
  validateOnBlur: PropTypes.bool,
};

const defaultProps = {
  method: 'post',
  validateOnBlur: false,
};

export const FormContext = React.createContext();

class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(...args) {
    return this
      .props
      .onSubmit(...args)
      .then(() => {
        const formApi = args[1];

        if (__CLIENT__) {
          Object
            .keys(sessionStorage)
            .forEach(k => k.startsWith(this.props.formID) && sessionStorage.removeItem(k));
        }

        formApi.reset();
      });
  }

  render() {
    const {
      action,
      children,
      className,
      formID,
      method,
      onSubmit,
      validateOnBlur,
    } = this.props;

    const renderFunc = typeof children === 'function';
    const controlledSubmit = renderFunc ? this.onSubmit : onSubmit;
    const lowerMethod = method.toString().toLowerCase();
    const methodInput = !['get', 'post'].includes(lowerMethod) && <Input name="_method" type="hidden" value={method} />;
    const formMethod = lowerMethod === 'get' ? 'get' : 'post';

    return (
      <FormContext.Provider value={formID}>
        <FinalForm
          initialValuesEqual={equal}
          validateOnBlur={validateOnBlur}
          onSubmit={controlledSubmit}
        >
          {({ handleSubmit, ...childProps }) => (
            <form
              action={action}
              className={className || 'Form'}
              method={formMethod}
              onSubmit={handleSubmit}
            >
              {renderFunc ? children(childProps) : children}
              {methodInput}
            </form>
          )}
        </FinalForm>
      </FormContext.Provider>
    );
  }
}

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default Form;
