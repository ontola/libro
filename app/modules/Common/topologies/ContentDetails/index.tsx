import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { contentDetailsTopology } from '../index';

const useStyles = makeStyles({
  contentDetails: {
    marginBottom: '.5em',
    overflow: 'hidden',
  },
});

const ContentDetails: TopologyFC = ({ children }) => {
  const [ContentDetailsTopology] = useTopologyProvider(contentDetailsTopology);
  const classes = useStyles();

  return (
    <ContentDetailsTopology>
      <div className={classes.contentDetails}>
        {children}
      </div>
    </ContentDetailsTopology>
  );
};

export default ContentDetails;
