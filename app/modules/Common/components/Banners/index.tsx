import { makeStyles } from '@mui/styles';
import { Resource } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../theme/types';
import app from '../../../Core/ontology/app';

const useStyles = makeStyles((theme: LibroTheme) => ({
  wrapper: {
    zIndex: theme.zIndex.appBar,
  },
}));

const Banners = (): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Resource subject={app.bannerMembers} />
    </div>
  );
};

export default Banners;
