/* eslint react/jsx-no-bind: 0 */
/* eslint react/no-find-dom-node: 0 */
import HttpStatus from 'http-status-codes';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

const ANIMATION_DURATION = 10;

export const dropdownContentTopology = NS.argu('dropdownContent');

class DropdownContent extends Topology {
  static cancelScrollEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.func,
    contentClassName: PropTypes.string,
    renderLeft: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      appearState: '',
    };
    this.topology = dropdownContentTopology;
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

  getClassName() {
    const { contentClassName } = this.props;
    const collapseClass = this.props.renderLeft ? 'Dropdown--left ' : 'Dropdown-right ';

    return `Dropdown__content ${collapseClass}${contentClassName} ${this.state.appearState}`;
  }

  onScrollHandler(e) {
    const elem = ReactDOM.findDOMNode(e.currentTarget);
    const { scrollHeight, scrollTop } = elem;
    const height = elem.clientHeight;
    const wheelDelta = e.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      elem.scrollTop = scrollHeight;
      return this.constructor.cancelScrollEvent(e);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0;
      return this.constructor.cancelScrollEvent(e);
    }
    return true;
  }
}

export default DropdownContent;
