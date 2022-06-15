import { makeStyles } from '@mui/styles';
import React from 'react';

import { CardFloat } from '../../../../topologies/Card';

interface PropTypes {
  menu: React.ReactNode;
  noMargin?: boolean;
}

const useStyles = makeStyles(() => ({
  header: {
    flexGrow: 1,
  },
  menuWithMargin: {
    marginRight: '-1rem',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const HeaderWithMenu: React.FC<PropTypes> = ({
  children,
  menu,
  noMargin,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {children}
      </div>
      <div className={noMargin ? undefined : styles.menuWithMargin}>
        <CardFloat>
          {menu}
        </CardFloat>
      </div>
    </div>
  );
};

export default HeaderWithMenu;
