import React from 'react';

import './UnorderedList.scss';

export interface UnorderedListProps {
  children: React.ReactNode;
}

const UnorderedList = ({ children }: UnorderedListProps): JSX.Element => (
  <ul className="UnorderedList">
    {children}
  </ul>
);

export default UnorderedList;
