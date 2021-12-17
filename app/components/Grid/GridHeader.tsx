import { makeStyles } from '@material-ui/styles';
import React, { ReactElement } from 'react';

import ContainerFloat from '../../topologies/Container/ContainerFloat';

interface PropTypes {
  /** The header floats to the top left */
  header: ReactElement;
}

const useStyles = makeStyles({
  gridHeader: {
    display: 'flex',
  },
  header: {
    flex: 1,
  },
});

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const GridHeader: React.FC<PropTypes> = ({
  children,
  header,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.gridHeader}>
      {header && (
        <div className={classes.header}>
          {header}
        </div>
      )}
      <ContainerFloat>
        {children}
      </ContainerFloat>
    </div>
  );
};

export default GridHeader;
