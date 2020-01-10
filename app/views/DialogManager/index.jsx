import Dialog from '@material-ui/core/Dialog';
import { namedNodeShape } from '@ontola/mash';
import {
  LinkedResourceContainer,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';
import DialogTopology from '../../topologies/Dialog';

const DialogManager = ({ resource }) => {
  const lrs = useLRS();

  const close = (item, done) => (
    () => lrs.exec(NS.ontola(`actions/dialog/close?resource=${encodeURIComponent(item.value)}`), { done })
  );

  return (
    <Dialog
      open
      PaperComponent="div"
      maxWidth="md"
      onClose={close(resource, false)}
    >
      <DialogTopology>
        <LinkedResourceContainer subject={resource} onDone={close(resource, true)} />
      </DialogTopology>
    </Dialog>
  );
};

DialogManager.type = NS.ontola('dialog/Manager');

DialogManager.topology = allTopologies;

DialogManager.mapDataToProps = {
  resource: NS.ontola('dialog/resource'),
};

DialogManager.propTypes = {
  resource: namedNodeShape,
};

export default register(DialogManager);
