const SPACE_KEY = 32;
const ENTER_KEY = 13;

export const defaultKeymap = {
  exit: 'escape',
  next: ['k', 'right'],
  previous: ['j', 'left'],
  rotate: 'r',
  zoomIn: '=',
  zoomOut: '-',
  zoomReset: '0',
};

export const devKeymap = {
  startHoverHelper: {
    action: 'keydown',
    sequence: 'alt',
  },
  stopHoverHelper: {
    action: 'keyup',
    sequence: 'alt',
  },
  ...defaultKeymap,
};

export const convertOnClick = (e: KeyboardEvent, onAction: (e: unknown) => void): void => {
  if ([SPACE_KEY, ENTER_KEY].includes(e.keyCode) && onAction) {
    onAction(e);
  }
};
