import styles from './navbar.css';
import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className={ styles.navbar }>{ this.props.children }</div>
    );
  }
}

Navbar.propTypes = {
  children: React.PropTypes.elements
};
