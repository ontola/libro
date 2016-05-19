import styles from './app.css';
import React, {Component} from 'react';
import { Link } from 'react-router';
import { Navbar } from '../';


export default class App extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Navbar>
          <ul className={ styles.list }>
            <li><Link className={ styles.link } to="/">Home</Link></li>
            <li><Link className={ styles.link } to="/about">About</Link></li>
          </ul>
        </Navbar>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
};
