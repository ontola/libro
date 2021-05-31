import React from 'react';

import useStoredState from '../hooks/useStoredState';
import Button from '../components/Button';

export interface CloseableContainerProps {
  children: React.ReactNode;
  id: string;
}

const style: React.CSSProperties = { position: 'relative' };

const CloseableContainer = ({
  children,
  id,
}: CloseableContainerProps): JSX.Element | null => {
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
    <div style={style}>
      <Button
        corner
        plain
        icon="close"
        title="Sluiten"
        onClick={toggleCloseable}
      />
      {children}
    </div>
  );
};

export default CloseableContainer;
