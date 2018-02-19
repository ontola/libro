/* eslint react/jsx-no-bind: 0 */
import HttpStatus from 'http-status-codes';
import PropTypes from 'prop-types';
import React from 'react';

import ScrollLockedComponent from './ScrollLockedComponent';

const ANIMATION_DURATION = 10;

const dropdownContentPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  close: PropTypes.func,
  contentClassName: PropTypes.string,
  renderLeft: PropTypes.bool,
};

class DropdownContent extends ScrollLockedComponent {
  constructor(props) {
    super(props);

    this.state = {
      appearState: '',
    };
  }

  componentWillEnter(callback) {
    this.setState(
      { appearState: 'Dropdown--enter' },
      () => {
        this.enterTimeout = window.setTimeout(() => {
          this.setState({ appearState: 'Dropdown--enter Dropdown--enter-active' }, callback);
        }, ANIMATION_DURATION);
      }
    );
  }

  componentWillLeave(callback) {
    this.setState(
      { appearState: 'Dropdown--leave' },
      () => {
        this.leaveTimeout = window.setTimeout(() => {
          this.setState(
            { appearState: 'Dropdown--leave Dropdown--leave-active' },
            () => { this.innerLeaveTimeout = window.setTimeout(callback, HttpStatus.OK); }
          );
        }, 0);
      }
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this.enterTimeout);
    window.clearTimeout(this.leaveTimeout);
    window.clearTimeout(this.innerLeaveTimeout);
  }

  render() {
    const { children, contentClassName } = this.props;
    const collapseClass = this.props.renderLeft ? 'Dropdown--left ' : 'Dropdown-right ';
    // const topClass = this.props.renderTop ? 'Dropdown--top ' : ' ';

    return (
      <div
        className={`Dropdown__content ${collapseClass}${contentClassName} ${this.state.appearState}`}
        style={{ display: 'flex', flexDirection: 'column' }}
        onWheel={this.onScrollHandler.bind(this)}
      >
        {children}
      </div>
    );
  }
}

DropdownContent.propTypes = dropdownContentPropTypes;

export default DropdownContent;
