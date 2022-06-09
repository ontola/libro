import { Dialog, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import rdf from '@ontologies/core';
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
import { useLocation } from 'react-router';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { frontendOrigin } from '../../helpers/frontendIRIComponents';
import retrievePath from '../../helpers/iris';
import { DialogSize, isDialogSize } from '../../middleware/ontolaMiddleware';
import libro from '../../ontology/libro';
import { BreakPoints } from '../../themes/themes';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';
import { OnDoneHandler } from '../Action/helpers';

import { DialogContainer } from './DialogContainer';
import { useBackdropStyles, useDialogStyles } from './dialogStyles';

const DialogResource = ({
  onDone,
}: {
  onDone: OnDoneHandler,
}) => {
  const location = useLocation();
  const routerLocation = rdf.namedNode(frontendOrigin + location.pathname + location.search + location.hash);

  return (
    <Resource
      forceRender
      subject={routerLocation}
      onDone={onDone}
    />
  );
};

const DialogManager = () => {
  const lrs = useLRS();

  const theme = useTheme();
  const screenIsNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Medium));

  const backdropClasses = useBackdropStyles();
  const dialogClasses = useDialogStyles();

  const [resource] = useIds(libro.ns('dialog/resource'));
  const [size] = useStrings(libro.ns('dialog/size'));
  const [mounted, setMounted] = React.useState(false);

  const [dialogHistory, setDialogHistory] = React.useState(() => createMemoryHistory());

  React.useEffect(() => {
    if (!resource || resource === libro.ns('dialog/closed')) {
      setMounted(false);
    } else if (resource) {
      if (mounted) {
        const routerLocation = frontendOrigin + location.pathname + location.search + location.hash;

        if (routerLocation !== resource.value) {
          dialogHistory.push(retrievePath(resource.value));
        }
      } else {
        const newHistory = createMemoryHistory({ initialEntries: [retrievePath(resource.value)] });

        setDialogHistory(newHistory);

        setMounted(true);
      }
    }
  }, [resource]);

  const close = React.useCallback((done = false) => {
    const currentResource = lrs.getResourceProperty(libro.ns('dialog/manager'), libro.ns('dialog/resource'));

    if (resource == currentResource) {
      lrs.actions.ontola.hideDialog(resource, done);
    }
  }, [resource]);
  const back = React.useCallback(() => {
    if (dialogHistory.index === 0) {
      close();
    } else {
      dialogHistory.back();
    }
  }, [close, dialogHistory]);
  const onDone = React.useCallback<OnDoneHandler>((redirect, method) => {
    if (method === 'DELETE' && redirect) {
      return lrs.actions.ontola.navigate(redirect);
    }

    return close(true);
  }, [close]);

  if (!mounted) {
    return null;
  }

  const maxWidth = isDialogSize(size) ? size : DialogSize.Xl;

  return (
    <HistoryRouter
      history={dialogHistory}
    >
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
          close: back,
          maxWidth: maxWidth,
        }}
        classes={dialogClasses}
        fullScreen={screenIsNarrow}
        maxWidth={maxWidth}
        scroll="body"
        onClose={close}
      >
        <DialogTopology>
          <DialogResource onDone={onDone} />
        </DialogTopology>
      </Dialog>
    </HistoryRouter>
  );
};

DialogManager.type = libro.ns('dialog/Manager');

DialogManager.topology = allTopologies;

export default register(DialogManager);
