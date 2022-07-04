import MUIContainer from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const parentTopology = libro.topologies.parent;

const useStyles = makeStyles((theme: LibroTheme) => ({
  breadcrumbsBar: {
    backgroundColor: theme.palette.grey.xxLight,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    width: '100%',
    ...(theme.appBar.background === 'white' ? {
      borderTop: `1px solid ${theme.palette.divider}`,
    } : {}),
  },
  flex: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '.3rem',
  },
}));

const BreadcrumbsBar: TopologyFC = ({ children }) => {
  const [BreadcrumbsBarTopology] = useTopologyProvider(parentTopology);
  const classes = useStyles();

  return (
    <BreadcrumbsBarTopology>
      <div className={classes.breadcrumbsBar}>
        <MUIContainer maxWidth="xl">
          <div className={classes.flex}>
            {children}
          </div>
        </MUIContainer>
      </div>
    </BreadcrumbsBarTopology>
  );
};

export default BreadcrumbsBar;
