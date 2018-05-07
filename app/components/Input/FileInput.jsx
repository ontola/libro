import PropTypes from 'prop-types';
import React from 'react';

import Input from './Input';

const propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }),
};

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    return (
      <Input
        type="file"
        onChange={this.onChange}
      />
    );
  }
}

FileInput.propTypes = propTypes;

export default FileInput;
