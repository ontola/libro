import styles from './box.css';
import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div className={ styles.box }>
        <p className={ styles.p }>{this.props.children}</p>
      </div>
    );
  }
}

Box.propTypes = {
  children: React.PropTypes.string.isRequired
};
