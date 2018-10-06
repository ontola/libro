import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { animated, Spring } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

import Button from '../Button';

import './Snackbar.scss';

const propTypes = {
  /** Snackbar body */
  children: PropTypes.string,
  close: PropTypes.func.isRequired,
  countdownTime: PropTypes.number,
  type: PropTypes.oneOf([
    'error',
    'message',
  ]),
};

const defaultProps = {
  countdownTime: 2750,
  type: 'message',
};

class SnackbarComponent extends React.PureComponent {
  progressBar() {
    return (
      <Spring
        native
        config={{ duration: this.props.countdownTime, easing: Easing.linear }}
        from={{ width: '0%' }}
        impl={TimingAnimation}
        to={{ width: '100%' }}
        onRest={this.props.close}
      >
        {props => <animated.div className="Snackbar__progress-bar" style={props} />}
      </Spring>
    );
  }

  render() {
    const {
      type,
      children,
      close,
    } = this.props;

    const className = classNames({
      Snackbar: true,
      [`Snackbar--${type}`]: type,
    });

    return (
      <div className={className}>
        <div className="Snackbar__text">{children}</div>
        <Button
          plain
          className="Button--snackbar"
          icon="times"
          title="Sluiten"
          onClick={close}
        />
        {this.progressBar()}
      </div>
    );
  }
}

SnackbarComponent.propTypes = propTypes;
SnackbarComponent.defaultProps = defaultProps;

export default SnackbarComponent;
