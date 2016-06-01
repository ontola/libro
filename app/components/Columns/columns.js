import './columns.scss';
import React from 'react';

export default class Columns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cols">{this.props.children}</div>
    );
  }
}

Columns.propTypes = {
  children: React.PropTypes.node.isRequired
};
