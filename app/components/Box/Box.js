import './box.scss';
import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div className="box">{this.props.children}</div>
    );
  }
}

Box.propTypes = {
  children: React.PropTypes.node.isRequired
};
