import React, { ChildrenProp } from 'react';

import { headingContext } from '../../state/headings';

export interface HeadingContextProps {
  overrideStartLevel?: number;
}

const HeadingContext: React.FC<HeadingContextProps & ChildrenProp> = ({ children, overrideStartLevel }) => {
  const headingLevel = React.useContext(headingContext);

  return (
    <headingContext.Provider value={overrideStartLevel ?? headingLevel + 1}>
      {children}
    </headingContext.Provider>
  );
};

export default HeadingContext;
