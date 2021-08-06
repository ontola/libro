import React from 'react';

import Link, { LinkPropTypes } from '../Link';

const CardLink: React.FC<LinkPropTypes> = (props) => (
  <Link
    {...props}
    className="CardLink"
  />
);

export default CardLink;
