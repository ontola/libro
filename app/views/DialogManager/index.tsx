import { Dialog, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  Resource,
  register,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { DialogSize, isDialogSize } from '../../middleware/ontolaMiddleware';
import libro from '../../ontology/libro';
import { BreakPoints } from '../../themes/themes';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';
import retrievePath from '../../helpers/iris';

import { DialogContainer } from './DialogContainer';
import { useBackdropStyles, useDialogStyles } from './dialogStyles';

const DialogManager = () => {
  const lrs = useLRS();

  const theme = useTheme();
  const screenIsNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Medium));

  const backdropClasses = useBackdropStyles();
  const dialogClasses = useDialogStyles();

  const [resource] = useIds(libro.ns('dialog/resource'));
  const [size] = useStrings(libro.ns('dialog/size'));

  const [dialogHistory] = React.useState(() => createMemoryHistory());

  React.useEffect(() => {
    if (resource) {
      dialogHistory.push(retrievePath(resource.value));
    }
  }, [resource]);

  const maxWidth = isDialogSize(size) ? size : DialogSize.Xl;

  const close = (item: SomeNode, done: boolean) => (
    () => {
      lrs.exec(
        rdf.namedNode(`${libro.actions.dialog.close.value}?resource=${encodeURIComponent(item.value)}`),
        { done },
      );
    }
  );

  const onDone = (item: SomeNode, done: boolean) => (
    (redirect: NamedNode | undefined, method: string) => {
      if (method === 'DELETE' && redirect) {
        return lrs.actions.ontola.navigate(redirect);
      }

      return close(item, done)();
    }
  );

  if (!resource || resource === libro.ns('dialog/closed')) {
    return null;
  }

  return (
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
      classes={dialogClasses}
      fullScreen={screenIsNarrow}
      maxWidth={maxWidth}
      scroll="body"
      onClose={close(resource, false)}
    >
      <DialogTopology>
        <HistoryRouter
          history={dialogHistory}
        >
          <Resource
            forceRender
            subject={resource}
            onDone={onDone(resource, true)}
          />
        </HistoryRouter>
      </DialogTopology>
    </Dialog>
  );
};

DialogManager.type = libro.ns('dialog/Manager');

DialogManager.topology = allTopologies;

export default register(DialogManager);
