import './app.scss';
import React, {Component} from 'react';
import { Navbar } from '../';
import { RouteTransition } from 'react-router-transition';

export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar location={this.props.location} />

        <RouteTransition
          pathname={this.props.location.pathname}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <div className="page">
            {this.props.children}
          </div>
        </RouteTransition>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string
  })
};
