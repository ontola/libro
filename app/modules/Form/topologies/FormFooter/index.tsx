import { createStyles, makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import form from '../../ontology/form';

export const formFooterTopology = form.topologies.footer;

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
