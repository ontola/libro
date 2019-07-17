export const getNumPages = (state, id) => state.getIn(['PDFViewer', 'items', id, 'numPages']);

export const getShowComments = state => state.getIn(['PDFViewer', 'showComments']);

export const getRotation = (state, id) => {
  const rotation = state.getIn(['PDFViewer', 'items', id, 'rotation']);
  if (rotation === undefined) {
    return 0;
  }

  return rotation;
};

export const getZoomlevel = state => state.getIn(['PDFViewer', 'zoomLevel']);
