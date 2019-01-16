import PropTypes from 'prop-types';
import React from 'react';

import Input from './Input';

const propTypes = {
  onChange: PropTypes.func,
};

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars, react/prop-types, File inputs can't be controlled
      value,
      ...rest
    } = this.props;

    return (
      <Input
        {...rest}
        type="file"
        onChange={this.onChange}
      />
    );
  }
}

FileInput.propTypes = propTypes;

export default FileInput;
