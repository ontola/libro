import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import rdf, { Node } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { useKey } from 'rooks';

import argu from '../../modules/Argu/ontology/argu';
import { expandPath } from '../../modules/Common/lib/iris';
import ontola from '../../modules/Kernel/ontology/ontola';
import dexes from '../../modules/Dexes/ontology/dexes';
import elements from '../../modules/Elements/ontology/elements';
import teamGL from '../../modules/GroenLinks/ontology/teamGL';
import sales from '../../modules/SalesWebsite/ontology/sales';

const TRIGGER_KEY = 'r';

const getShort = (value: string): string => {
  const mappedOntologies = Object.entries({
    argu,
    as,
    dexes,
    elements,
    ontola,
    rdf: rdfx,
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

const focusRed = '#ff0000';

const useStyles = makeStyles({
  hoverHelperShowBorders: {
    '& *:not([resource])': {
      pointerEvents: 'none',
    },
    '& [href]': {
      pointerEvents: 'none',
    },
    '& [resource],& [href]': {
      '&:active': {
        boxShadow: `0 0 0 4px ${focusRed}`,
        zIndex: 1,
      },
      '&:hover': {
        boxShadow: `0 0 0 3px ${focusRed}`,
        zIndex: 1,
      },
      boxShadow: `0 0 0 1px ${focusRed}`,
      pointerEvents: 'all !important',
      transition: 'box-shadow 50ms ease-in-out',
    },
  },
});

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
  const classes = useStyles();

  if (!__DEVELOPMENT__) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  const className = clsx({
    [classes.hoverHelperShowBorders]: activated,
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
