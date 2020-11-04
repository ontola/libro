import Dialog from '@material-ui/core/Dialog';
import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { getMetaContent } from '../../helpers/arguHelpers';
import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';

interface DialogManagerProps {
  resource: SomeNode;
}

const DialogManager: FC<DialogManagerProps> = ({ resource }) => {
  const lrs = useLRS();
  const theme = getMetaContent('theme');

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
      open
      // @ts-ignore
      PaperComponent="div"
      className={theme}
      maxWidth="md"
      onClose={close(resource, false)}
    >
      <DialogTopology>
        <Resource subject={resource} onDone={close(resource, true)} />
      </DialogTopology>
    </Dialog>
  );
};

DialogManager.type = ontola.ns('dialog/Manager');

DialogManager.topology = allTopologies;

DialogManager.mapDataToProps = {
  resource: ontola.ns('dialog/resource'),
};

export default register(DialogManager);
