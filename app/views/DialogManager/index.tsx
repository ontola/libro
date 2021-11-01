import Dialog from '@material-ui/core/Dialog';
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

const DialogManager = () => {
  const lrs = useLRS();
  const { theme } = React.useContext(appContext);
  const [resource] = useIds(ontola.ns('dialog/resource'));
  const [size] = useStrings(ontola.ns('dialog/size'));

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
    <Dialog
      fullWidth
      open
      // @ts-ignore
      PaperComponent="div"
      className={theme}
      maxWidth={isDialogSize(size) ? size : DialogSize.Lg}
      onClose={close(resource, false)}
    >
      <DialogTopology>
        <Resource
          subject={resource}
          onDone={close(resource, true)}
        />
      </DialogTopology>
    </Dialog>
  );
};

DialogManager.type = ontola.ns('dialog/Manager');

DialogManager.topology = allTopologies;

export default register(DialogManager);
