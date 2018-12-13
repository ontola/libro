import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';
import { Form as Inform } from 'informed';

import { Input } from '../Input';

const propTypes = {
  action: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  method: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Literal),
  ]),
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  method: 'post',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { submitting: false };
  }

  onSubmit(...args) {
    this.setState({ submitting: true });
    return this
      .props
      .onSubmit(...args)
      .finally(() => {
        this.setState({ submitting: false });
      });
  }

  render() {
    const {
      action,
      children,
      className,
      method,
      onSubmit,
      ...rest
    } = this.props;

    const renderFunc = typeof children === 'function';
    const controlledSubmit = renderFunc ? this.onSubmit : onSubmit;
    const lowerMethod = method.toString().toLowerCase();
    const methodInput = !['get', 'post'].includes(lowerMethod) && <Input name="_method" type="hidden" value={method} />;
    const formMethod = lowerMethod === 'get' ? 'get' : 'post';

    return (
      <Inform
        action={action}
        className={className || 'Form'}
        method={formMethod}
        {...rest}
        onSubmit={controlledSubmit}
      >
        {renderFunc ? children(this.state) : children}
        {methodInput}
      </Inform>
    );
  }
}

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default Form;
