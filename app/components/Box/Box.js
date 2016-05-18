var styles = require('./Box.scss');
import React, {Component} from 'react';

export default class Box extends React.Component {

  render() {
    return (
      <div className={ styles.box }>{this.props.children}</div>
    )
  }
}
