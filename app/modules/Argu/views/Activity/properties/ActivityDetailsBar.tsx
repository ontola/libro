import makeStyles from '@mui/styles/makeStyles';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

import { defaultMenus } from '../../../../Common/lib/viewHelpers';
import DetailsBar from '../../../../Common/topologies/DetailsBar';

const useStyles = makeStyles(() => ({
  activityDetail: {
    '& .Link div': {
      marginRight: '.2rem',
    },
  },
}));

const ActivityDetailsBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <DetailsBar
      className={classes.activityDetail}
      right={(
        <React.Fragment>
          <Property label={schema.dateCreated} />
          <Property label={as.object}>
            {defaultMenus}
          </Property>
        </React.Fragment>
      )}
    >
      <Property label={schema.name} />
    </DetailsBar>
  );
};

export default ActivityDetailsBar;
