import React from 'react';

export const DefaultElement = (props) => {
  const ElemType = props.elementType || 'p';

  return <ElemType {...props.attributes}>{props.children}</ElemType>;
};
