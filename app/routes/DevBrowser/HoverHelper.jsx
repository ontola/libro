import { namedNodeByIRI } from 'link-lib';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { HotKeys } from 'react-hotkeys';

import { expandPath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
};

const TRIGGER_KEYS = ['Alt', 'AltGraph'];

class HoverHelper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
    };
  }

  static getElement(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const x = e.clientX;
    const y = e.clientY;
    const elementMouseIsOver = document.elementFromPoint(x, y);
    let currentElement = elementMouseIsOver;
    const maxDepth = 100;
    for (let i = 0; i < maxDepth; i++) {
      const resourceLink = currentElement.getAttribute('resource')
        || expandPath(currentElement.getAttribute('href'));
      if (resourceLink) {
        /* global dev:true */
        const trips = dev.getLRS().tryEntity(namedNodeByIRI(resourceLink));
        console.log(dev.toObject(trips)); // eslint-disable-line no-console
        break;
      }
      if (currentElement.tagName === 'BODY') {
        console.log('Nothing found!'); // eslint-disable-line no-console
        break;
      }
      currentElement = currentElement.parentElement;
    }
  }

  handleKeyDown(e) {
    if (e.key === TRIGGER_KEYS) {
      this.setState({
        activated: true,
      });
    }
  }

  handleKeyUp(e) {
    if (e.key === TRIGGER_KEYS) {
      this.setState({
        activated: false,
      });
    }
  }

  render() {
    if (!__DEVELOPMENT__) {
      return this.props.children;
    }

    const listeners = this.state.activated ? { onClick: e => HoverHelper.getElement(e) } : {};

    const handlers = {
      startHoverHelper: () => this.setState({
        activated: true,
      }),
      stopHoverHelper: () => this.setState({
        activated: false,
      }),
    };

    return (
      <HotKeys
        handlers={handlers}
      >
        <div
          className={`${this.state.activated ? 'HoverHelper--show-borders' : ''}`}
          {...listeners}
        >
          {this.props.children}
        </div>
      </HotKeys>
    );
  }
}

HoverHelper.propTypes = propTypes;

export default HoverHelper;
