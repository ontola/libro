import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import Loading, { loadingParagraphCID, loadingStyles } from '../../Common/components/Loading';
import Spinner from '../../Common/components/Loading/Spinner';
import { LibroTheme } from '../../Kernel/lib/themes';
import ll from '../../Kernel/ontology/ll';
import { formFooterTopology } from '../topologies/FormFooter';
import { selectTopology } from '../topologies/Select';
import { selectedValueTopology } from '../topologies/SelectedValue';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  ...loadingStyles(theme),
  loadingSelect: {
    alignItems: 'center',
    display: 'flex',
    height: 42,
    padding: '.5em',
    width: '100%',
  },
  loadingSelectParagraph: {
    height: '1em',
    marginBottom: '1em',
    width: '100%',
  },
}));

export const LoadingSelect: React.FC<{ style: any }> = ({ style }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.loadingSelect}
      style={style}
    >
      <div
        className={clsx(
          loadingParagraphCID,
          classes.loadingSelectParagraph,
          classes.loadingBackground,
        )}
      />
    </div>
  );
};

export default [
  LinkedRenderStore.registerRenderer(
    LoadingSelect,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    selectTopology,
  ),
  LinkedRenderStore.registerRenderer(
    Loading,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      formFooterTopology,
      selectedValueTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    Spinner,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    formFooterTopology,
  ),
];
