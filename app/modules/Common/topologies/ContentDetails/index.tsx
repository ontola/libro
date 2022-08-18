import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { contentDetailsTopology } from '../index';

const useStyles = makeStyles({
  contentDetails: {
    marginBottom: '.5em',
    overflow: 'hidden',
  },
});

const ContentDetailsTopology = createTopologyProvider(contentDetailsTopology);

const ContentDetails: TopologyFC = ({ children }) => {
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
