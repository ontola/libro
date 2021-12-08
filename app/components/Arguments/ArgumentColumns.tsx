import { useLinkRenderContext } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { ListDirection } from '../../topologies/List';
import Collection from '../Collection';
import Columns from '../Columns';

const ArgumentColumns = (): JSX.Element => {
  const { subject } = useLinkRenderContext();

  return (
    <Columns>
      <Collection
        renderWhenEmpty
        direction={ListDirection.Column}
        key="pro"
        label={argu.proArguments}
        to={subject}
      />
      <Collection
        renderWhenEmpty
        direction={ListDirection.Column}
        key="con"
        label={argu.conArguments}
        to={subject}
      />
    </Columns>
  );
};

export default ArgumentColumns;
