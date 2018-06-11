import PropTypes from 'prop-types';
import React from 'react';
import { Form as Inform } from 'informed';

import { Input } from '../Input';

const propTypes = {
  action: PropTypes.string,
  children: PropTypes.node.isRequired,
  method: PropTypes.string,
  onSubmit: PropTypes.func,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(...args) {
    this.setState({ submitting: true });
    const res = this.props.onSubmit(...args);
    if (res && typeof res.finally === 'function') {
      return res.finally(() => {
        this.setState({ submitting: false });
      });
    }
    this.setState({ submitting: false });
    return res;
  }

  render() {
    const {
      action,
      children,
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
      <Inform action={action} className="Form" method={formMethod} {...rest} onSubmit={controlledSubmit}>
        {renderFunc ? children(this.state) : children}
        {methodInput}
      </Inform>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
