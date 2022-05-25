import makeStyles from '@mui/styles/makeStyles';
import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../themes/themes';
import { defaultMenus } from '../../common';
import SuspendedLoader from '../../../components/Loading/SuspendedLoader';
import DetailsBar from '../../../topologies/DetailsBar';

const useStyles = makeStyles<LibroTheme>(() => ({
  inlineDetails: {
    '& .Link div': {
      marginRight: '.2rem',
    },
  },
}));

interface ActivityDetailsBar {
  inlineDetails?: boolean;
}

const ActivityDetailsBar = ({
  inlineDetails,
}: ActivityDetailsBar): JSX.Element => {
  const classes = useStyles();

  return  (
    <DetailsBar
      layoutOnly
      className={inlineDetails ? classes.inlineDetails : undefined}
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
      <Property
        label={as.object}
        onLoad={SuspendedLoader}
      >
        <Property
          label={schema.creator}
          onLoad={SuspendedLoader}
        />
        <Property
          label={schema.isPartOf}
          onLoad={SuspendedLoader}
        />
        <Property label={rdfx.type} />
      </Property>
    </DetailsBar>
  );
};

export default ActivityDetailsBar;
