import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { CSSProperties } from 'react';

export interface SortableProps {
  attributes: {
    role: string;
    tabIndex: number;
    'aria-pressed': boolean | undefined;
    'aria-roledescription': string;
    'aria-describedby': string;
  };
  listeners: DraggableSyntheticListeners;
  setNodeRef: (node: HTMLElement | null) => void;
  style: CSSProperties;
}
