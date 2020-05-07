import { Literal } from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import xsd from '@ontologies/xsd';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

const DateTimeRenderer: FC<{ linkedProp: Literal }> = ({ linkedProp }) => {
  const date = new Date(linkedProp.value);

  return (
    <React.Fragment>
      {date.toLocaleString()}
    </React.Fragment>
  );
};

DateTimeRenderer.type = rdfs.Literal;

DateTimeRenderer.topology = allTopologies;

DateTimeRenderer.property = xsd.date;

export default register(DateTimeRenderer);
