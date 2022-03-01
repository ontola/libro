import React from 'react';

import { headingContext } from '../../state/headings';

const HeadingContext:React.FC = ({ children }) => {
  const headingLevel = React.useContext(headingContext);

  return (
    <headingContext.Provider value={headingLevel+1}>
      {children}
    </headingContext.Provider>
  );
};

export default HeadingContext;
