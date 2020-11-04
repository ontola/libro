import Dialog from '@material-ui/core/Dialog';
import rdf from '@ontologies/core';
import {
  Resource,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { getMetaContent } from '../../helpers/arguHelpers';
import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';

const DialogManager = () => {
  const lrs = useLRS();
  const [resource] = useProperty(ontola.ns('dialog/resource'));
  const theme = getMetaContent('theme');

  const close = (item, done) => (
    () => lrs.exec(rdf.namedNode(`${libro.actions.dialog.close.value}?resource=${encodeURIComponent(item.value)}`), { done })
  );

  if (!resource || resource === ontola.ns('dialog/closed')) {
    return null;
  }

  return (
    <Dialog
      open
      className={theme}
      maxWidth="md"
      PaperComponent="div"
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

export default register(DialogManager);
