let styles = require('./heading.css');
import React, {Component} from 'react';

export default class Heading extends Component {
  render() {
    return (
      <h2 className={styles.heading}>{this.props.children}</h2>
    );
  }
}

Heading.propTypes = {
  children: React.PropTypes.string.isRequired
};
