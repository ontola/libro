import { Literal } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as xsd from '@ontologies/xsd';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

const DateRenderer: FC<{ linkedProp: Literal }> = ({ linkedProp }) => {
  const date = new Date(linkedProp.value);

  return (
    <React.Fragment>
      {date.toLocaleDateString()}
    </React.Fragment>
  );
};

DateRenderer.type = rdfs.Literal;

DateRenderer.topology = allTopologies;

DateRenderer.property = xsd.date;

export default register(DateRenderer);
