import { createStyles, makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { formFooterTopology } from '../index';

const useStyles = makeStyles(() => createStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const FormFooterTopology = createTopologyProvider(formFooterTopology);

const FormFooter: TopologyFC = ({ children }) => {
  const classes = useStyles();

  return (
    <FormFooterTopology>
      <div className={classes.wrapper}>
        {children}
      </div>
    </FormFooterTopology>
  );
};

export default FormFooter;
