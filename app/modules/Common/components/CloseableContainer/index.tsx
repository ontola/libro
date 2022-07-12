import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useIntl } from 'react-intl';

import { formMessages } from '../../../../translations/messages';
import useStoredState from '../../hooks/useStoredState';
import Button from '../Button';

interface ClosableContainerProps {
  children: React.ReactNode;
  id: string;
}

const useStyles = makeStyles({
  closableContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const CloseableContainer: React.FC<ClosableContainerProps> = ({
  children,
  id,
}) => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const storeKey = `${id}-closeable`;
  const [opened, setOpened] = useStoredState(storeKey, true);
  const toggleCloseable = React.useCallback(
    () => setOpened(!open),
    [setOpened, open],
  );

  if (!opened) {
    return null;
  }

  return (
    <div className={classes.closableContainer}>
      {children}
      <Button
        narrow
        plain
        icon="close"
        title={formatMessage(formMessages.close)}
        onClick={toggleCloseable}
      />
    </div>
  );
};

export default CloseableContainer;
