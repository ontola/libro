import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { formFooterTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

const useStyles = makeStyles(() => createStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const FormFooter: TopologyFC = ({ children }) => {
  const [FormFooterTopology] = useTopologyProvider(formFooterTopology);
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
