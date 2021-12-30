import * as as from '@ontologies/as';
import rdf, { Node } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { useKey } from 'rooks';

import { expandPath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import elements from '../../ontology/elements';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import sales from '../../ontology/sales';
import teamGL from '../../ontology/teamGL';

const TRIGGER_KEY = 'r';

const getShort = (value: string): string => {
  const mappedOntologies = Object.entries({
    argu,
    as,
    dexes,
    elements,
    ontola,
    rdf: rdfx,
    rivm,
    sales,
    schema,
    teamGL,
  }).map(([key, val]) => ({
    key,
    prefix: val.ns('').value,
  }));

  const trimmedValue = value.replace(/^<|>$/g, '');

  for (const { key, prefix } of mappedOntologies) {
    if (trimmedValue.startsWith(prefix)) {
      return `${key}:${trimmedValue.replace(prefix, '')}`;
    }
  }

  return trimmedValue;
};

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
      const obj = dev.toObject(trips) as Record<string, Node | Node[]>;
      const mapped = Object.entries(obj).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [getShort(key)]: {
            ...value,
            computedValue: Array.isArray(value) ? value : getShort(value.value),
          },
        }),
        {},
      );
      // @ts-ignore
      console.table(mapped, ['computedValue']); // eslint-disable-line no-console
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

  useKey(TRIGGER_KEY, (e) => {
    if ((e.target as HTMLElement)?.tagName === 'INPUT') {
      return;
    }

    setActivated(true);
  }, { eventTypes: ['keydown'] });
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
