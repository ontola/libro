import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import ContainerFloat from '../../topologies/Container/ContainerFloat';

export interface ContainerHeaderProps {
  /** The children float to the left */
  children: React.ReactNode,
  /** The float content floats to the right */
  float: React.ReactNode,
}

const HEADER_GAP = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  containerHeader: {
    '& .Heading': {
      marginBottom: 0,
    },
    alignItems: 'center',
    display: 'flex',
    marginBottom: '1rem',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    gap: theme.spacing(HEADER_GAP),
  },
}));

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const ContainerHeader = ({
  children,
  float,
}: ContainerHeaderProps): JSX.Element => {
  const classNames = useStyles();

  return (
    <div className={classNames.containerHeader}>
      <div className={classNames.header}>{children}</div>
      <ContainerFloat>
        {float}
      </ContainerFloat>
    </div>
  );
};

export default ContainerHeader;
