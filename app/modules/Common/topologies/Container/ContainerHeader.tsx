import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { headingCID } from '../../components/Heading';
import { containerHeaderTopology } from '../index';

import ContainerFloat from './ContainerFloat';

export interface ContainerHeaderProps {
  /** The float content floats to the right */
  float: React.ReactNode,
}

const HEADER_GAP = 4;

const useStyles = makeStyles((theme: LibroTheme) => ({
  containerHeader: {
    [`& .${headingCID}`]: {
      marginBottom: 0,
    },
    alignItems: 'center',
    display: 'flex',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    gap: theme.spacing(HEADER_GAP),
    paddingBottom: '5px',
    paddingTop: '5px',
  },
}));

const ContainerHeaderTopology = createTopologyProvider(containerHeaderTopology);

/**
 * Holds a header and menu items that float to the top right of the container
 */
const ContainerHeader: TopologyFC<ContainerHeaderProps> = ({ children, float }) => {
  const classes = useStyles();

  return (
    <ContainerHeaderTopology>
      <div className={classes.containerHeader}>
        <div className={classes.header}>
          {children}
        </div>
        <ContainerFloat>
          {float}
        </ContainerFloat>
      </div>
    </ContainerHeaderTopology>
  );
};

export default ContainerHeader;
