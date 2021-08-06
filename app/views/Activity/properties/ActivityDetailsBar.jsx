import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

import { defaultMenus } from '../../common';
import SuspendedLoader from '../../../components/Loading/SuspendedLoader';
import DetailsBar from '../../../topologies/DetailsBar';

const ActivityDetailsBar = () => (
  <DetailsBar
    className="ActivityDetail"
    right={(
      <React.Fragment>
        <Property label={schema.dateCreated} />
        <Property
          label={as.object}
          onLoad={SuspendedLoader}
        >
          {defaultMenus}
        </Property>
      </React.Fragment>
    )}
  >
    <Property label={schema.name} />
  </DetailsBar>
);

export default ActivityDetailsBar;
