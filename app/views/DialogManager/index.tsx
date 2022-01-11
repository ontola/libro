import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  Resource,
  register,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';

import { appContext } from '../../appContext';
import { DialogSize, isDialogSize } from '../../middleware/ontolaMiddleware';
import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';

import { DialogContainer } from './DialogContainer';
import { useBackdropStyles, useDialogStyles } from './dialogStyles';

const DialogManager = () => {
  const lrs = useLRS();

  const theme = useTheme();
  const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const backdropClasses = useBackdropStyles();
  const dialogClasses = useDialogStyles();

  const { theme: dialogTheme } = React.useContext(appContext);
  const [resource] = useIds(ontola.ns('dialog/resource'));
  const [size] = useStrings(ontola.ns('dialog/size'));

  const maxWidth = isDialogSize(size) ? size : DialogSize.Xl;
  const close = (item: SomeNode, done: boolean) => (
    () => lrs.exec(
      rdf.namedNode(`${libro.actions.dialog.close.value}?resource=${encodeURIComponent(item.value)}`),
      { done },
    )
  );

  if (!resource || resource === ontola.ns('dialog/closed')) {
    return null;
  }

  return (
    <React.Fragment>

      <Dialog
        fullWidth
        open
        BackdropProps={{
          classes: backdropClasses,
        }}
        // @ts-ignore
        PaperComponent={DialogContainer}
        PaperProps={{
          // @ts-ignore
          close: close(resource, false),
          maxWidth: maxWidth,
        }}
        className={dialogTheme}
        classes={dialogClasses}
        fullScreen={showFullScreen}
        maxWidth={maxWidth}
        scroll="body"
        onClose={close(resource, false)}
      >
        <DialogTopology>
          <Resource
            forceRender
            subject={resource}
            onDone={close(resource, true)}
          />
        </DialogTopology>
      </Dialog>
    </React.Fragment>
  );
};

DialogManager.type = ontola.ns('dialog/Manager');

DialogManager.topology = allTopologies;

export default register(DialogManager);
