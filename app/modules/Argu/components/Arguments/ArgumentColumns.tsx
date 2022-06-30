import { useLinkRenderContext } from 'link-redux';
import React from 'react';

import Collection from '../../../Collection/components';
import Columns from '../../../Common/components/Columns';
import { ListDirection } from '../../../Common/topologies/List';
import argu from '../../lib/argu';

interface ArgumentColumns {
  omniform?: boolean;
}

const ArgumentColumns = ({
  omniform,
}: ArgumentColumns): JSX.Element => {
  const { subject } = useLinkRenderContext();

  return (
    <Columns>
      <Collection
        renderWhenEmpty
        direction={ListDirection.Column}
        key="pro"
        label={argu.proArguments}
        omniform={omniform}
        to={subject}
      />
      <Collection
        renderWhenEmpty
        direction={ListDirection.Column}
        key="con"
        label={argu.conArguments}
        omniform={omniform}
        to={subject}
      />
    </Columns>
  );
};

export default ArgumentColumns;
