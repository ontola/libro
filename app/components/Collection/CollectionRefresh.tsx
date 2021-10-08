import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { useCollectionOptions } from './CollectionProvider';

const CollectionRefresh = (): JSX.Element | null => {
  const { refreshing } = useCollectionOptions();

  if (!refreshing) {
    return null;
  }

  return (
    <IconButton size="small">
      <FontAwesome
        spin
        name="spinner"
      />
    </IconButton>
  );
};

export default CollectionRefresh;
