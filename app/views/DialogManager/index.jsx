import Dialog from '@material-ui/core/Dialog';
import rdf from '@ontologies/core';
import RDFTypes from '@rdfdev/prop-types';
import {
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';

const DialogManager = ({ resource }) => {
  const lrs = useLRS();

  const close = (item, done) => (
    () => lrs.exec(rdf.namedNode(`${libro.actions.dialog.close.value}?resource=${encodeURIComponent(item.value)}`), { done })
  );

  if (!resource) {
    return null;
  }

  return (
    <Dialog
      open
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

DialogManager.mapDataToProps = {
  resource: ontola.ns('dialog/resource'),
};

DialogManager.propTypes = {
  resource: RDFTypes.namedNode,
};

export default register(DialogManager);
