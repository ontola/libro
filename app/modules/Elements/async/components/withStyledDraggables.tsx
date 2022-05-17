import { DragIndicator } from '@material-ui/icons';
import { PlatePluginComponent } from '@udecode/plate-core';
import React from 'react';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  withDraggables,
} from '@udecode/plate';
import Tippy, { TippyProps } from '@tippyjs/react';

const GrabberTooltipContent = () => (
  <div style={{ fontSize: 12 }}>
    <div>
      Drag
      {' '}
      <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
        to move
      </span>
    </div>
  </div>
);

export const grabberTooltipProps: TippyProps = {
  arrow: false,
  content: <GrabberTooltipContent />,
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  offset: [0, 0],
  placement: 'bottom',
  theme: 'small',
};

export const withStyledDraggables = (components: Record<string, PlatePluginComponent>): Record<string, PlatePluginComponent> => withDraggables(components, [
  {
    keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
    level: 0,
  },
  {
    keys: [
      ELEMENT_PARAGRAPH,
      ELEMENT_BLOCKQUOTE,
      ELEMENT_TODO_LI,
      ELEMENT_H1,
      ELEMENT_H2,
      ELEMENT_H3,
      ELEMENT_H4,
      ELEMENT_H5,
      ELEMENT_H6,
      ELEMENT_IMAGE,
      ELEMENT_OL,
      ELEMENT_UL,
      ELEMENT_TABLE,
      ELEMENT_MEDIA_EMBED,
      ELEMENT_CODE_BLOCK,
    ],
    onRenderDragHandle: ({ className, styles }) => (
      <Tippy {...grabberTooltipProps}>
        <button
          className={className}
          style={(styles as any).reduce((acc: React.CSSProperties, cur: React.CSSProperties) => ({
            ...acc,
            ...cur,
          }), {})}
          type="button"
        >
          <DragIndicator
            style={{
              color: 'rgba(55, 53, 47, 0.3)',
              height: 18,
              width: 18,
            }}
          />
        </button>
      </Tippy>
    ),
  },
  {
    key: ELEMENT_H1,
    styles: {
      blockToolbarWrapper: {
        height: '1.3em',
      },
      gutterLeft: {
        fontSize: '1.875em',
        padding: '2em 0 4px',
      },
    },
  },
  {
    key: ELEMENT_H2,
    styles: {
      blockToolbarWrapper: {
        height: '1.3em',
      },
      gutterLeft: {
        fontSize: '1.5em',
        padding: '1.4em 0 1px',
      },
    },
  },
  {
    key: ELEMENT_H3,
    styles: {
      blockToolbarWrapper: {
        height: '1.3em',
      },
      gutterLeft: {
        fontSize: '1.25em',
        padding: '1em 0 1px',
      },
    },
  },
  {
    keys: [ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
    styles: {
      blockToolbarWrapper: {
        height: '1.3em',
      },
      gutterLeft: {
        fontSize: '1.1em',
        padding: '0.75em 0 0',
      },
    },
  },
  {
    keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
    styles: {
      gutterLeft: {
        padding: '4px 0 0',
      },
    },
  },
  {
    key: ELEMENT_BLOCKQUOTE,
    styles: {
      gutterLeft: {
        padding: '18px 0 0',
      },
    },
  },
  {
    key: ELEMENT_CODE_BLOCK,
    styles: {
      gutterLeft: {
        padding: '12px 0 0',
      },
    },
  },
]);
