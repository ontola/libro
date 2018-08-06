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
  startHoverHelper: { action: 'keydown', sequence: 'alt' },
  stopHoverHelper: { action: 'keyup', sequence: 'alt' },
  ...defaultKeymap,
};
