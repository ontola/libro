import rdf from '@ontologies/core';
import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { useKey } from 'rooks';

import { expandPath } from '../../helpers/iris';

const TRIGGER_KEY = 'Alt';

const getElement = (e: MouseEvent): void => {
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
};

const HoverHelper = ({ children }: React.PropsWithChildren<unknown>): JSX.Element => {
  const [activated, setActivated] = React.useState(false);

  if (!__DEVELOPMENT__) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  const className = clsx({
    'HoverHelper--show-borders': activated,
  });

  useKey(TRIGGER_KEY, () => setActivated(true), { eventTypes: ['keydown'] });
  useKey(TRIGGER_KEY, () => setActivated(false), { eventTypes: ['keyup'] });

  const listeners = activated ? { onClick: (e: MouseEvent) => getElement(e) } : {};

  return (
    <div
      className={className}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default HoverHelper;
