import rdf from '@ontologies/core';
import React, {
  Component,
  MouseEvent,
} from 'react';
import { HotKeys } from 'react-hotkeys';

import { expandPath } from '../../helpers/iris';

const TRIGGER_KEYS = ['Alt', 'AltGraph'];

interface HoverHelperProps {
  children?: React.ReactNode;
}

interface HoverHelperState {
  activated?: boolean;
}

class HoverHelper extends Component<HoverHelperProps, HoverHelperState> {
  static getElement(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const x = e.clientX;
    const y = e.clientY;
    const elementMouseIsOver = document.elementFromPoint(x, y);
    let currentElement = elementMouseIsOver;
    const maxDepth = 100;

    for (let i = 0; i < maxDepth; i++) {
      if (!currentElement) {
        break;
      }

      const resourceLink = currentElement.getAttribute('resource')
        ?? expandPath(currentElement.getAttribute('href') ?? undefined);

      if (resourceLink) {
        // @ts-ignore
        const trips = dev.getLRS().tryEntity(rdf.namedNode(resourceLink));
        // @ts-ignore
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

  constructor(props: HoverHelperProps) {
    super(props);
    this.state = {
      activated: false,
    };
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (TRIGGER_KEYS.includes(e.key)) {
      this.setState({
        activated: true,
      });
    }
  }

  handleKeyUp(e: KeyboardEvent): void {
    if (TRIGGER_KEYS.includes(e.key)) {
      this.setState({
        activated: false,
      });
    }
  }

  render() {
    if (!__DEVELOPMENT__) {
      return this.props.children;
    }

    const listeners = this.state.activated ? { onClick: (e: MouseEvent) => HoverHelper.getElement(e) } : {};

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
        tabIndex={undefined}
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

export default HoverHelper;
