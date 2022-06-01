import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';

import { headingCID } from '../../modules/Common/components/Heading';
import { LibroTheme } from '../../themes/themes';
import { containerHeaderTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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

/**
 * Holds a header and menu items that float to the top right of the container
 */
const ContainerHeader: TopologyFC<ContainerHeaderProps> = ({ children, float }) => {
  const [ContainerHeaderTopology] = useTopologyProvider(containerHeaderTopology);
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
