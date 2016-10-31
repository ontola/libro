/* eslint react/jsx-no-bind: 0 */
import React, { PropTypes } from 'react';
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
  sections: PropTypes.array,
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
            () => { this.innerLeaveTimeout = window.setTimeout(callback, 200); });
        }, 0);
      });
  }

  componentWillUnmount() {
    window.clearTimeout(this.enterTimeout);
    window.clearTimeout(this.leaveTimeout);
    window.clearTimeout(this.innerLeaveTimeout);
  }

  render() {
    const { children, contentClassName } = this.props;
    const collapseClass = this.props.renderLeft ? 'Dropdown--left ' : 'Dropdown-right ';

    return (
      <div
        className={`Dropdown__content ${collapseClass}${contentClassName} ${this.state.appearState}`}
        onWheel={this.onScrollHandler.bind(this)}
        style={null}
      >
        {children}
      </div>
    );
  }
}

DropdownContent.propTypes = dropdownContentPropTypes;

export default DropdownContent;
