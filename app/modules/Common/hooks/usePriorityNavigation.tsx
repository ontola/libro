import { Node } from '@ontologies/core';
import React from 'react';

export type AddItemCallback = (iri: Node, ref: HTMLElement) => void;

type Observable = {
  domNode: HTMLElement;
  isVisible: boolean;
};

interface UsePriorityNavigation {
  addObservedItem: AddItemCallback,
  hiddenItems: Node[],
}

/**
 * Checks which of the input items are visible on the containing element,
 * then returns a list of items that are not visible.
 * Also returns a callback function to start observing the items.
 */
export const usePriorityNavigation = (navBarRef: HTMLElement | null, menuItems: Node[]): UsePriorityNavigation  => {
  const [observedItems, setObservedItems] = React.useState<Map<Node, Observable>>(new Map());
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const addObservedItem = React.useCallback((iri: Node, ref: HTMLElement) =>
    setObservedItems((current) => new Map(current.set(iri, {
      domNode: ref,
      isVisible: false,
    }))),
  []);

  React.useEffect(() => {
    const observer = new IntersectionObserver((changedEntries) => {
      for (const entry of changedEntries) {
        for (const [key, value] of observedItems) {
          if (value.domNode === entry.target) {
            observedItems.set(key, {
              domNode: value.domNode,
              isVisible: entry.isIntersecting,
            });
          }
        }
      }

      forceUpdate();
    }, {
      root: navBarRef,
      threshold: 0.5,
    });

    for (const [_key, value] of observedItems) {
      if (value.domNode) {
        observer.observe(value.domNode);
      }
    }

    return () => observer.disconnect();
  }, [observedItems]);

  const hiddenItems = menuItems.filter((iri: Node) => !observedItems.get(iri)?.isVisible);

  return {
    addObservedItem,
    hiddenItems,
  };
};
