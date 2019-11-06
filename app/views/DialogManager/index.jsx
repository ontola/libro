import { namedNodeShape } from '@ontola/mash';
import {
  LinkedResourceContainer,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { Transition } from 'react-spring';

import Modal from '../../components/Modal';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';
import Dialog from '../../topologies/Dialog';

const DialogManager = ({ resource }) => {
  const lrs = useLRS();
  const items = [resource];

  const close = item => (
    () => lrs.exec(NS.ontola(`actions/dialog/close?resource=${encodeURIComponent(item.value)}`))
  );

  return (
    <Transition
      enter={{ opacity: 1 }}
      from={{ opacity: 0 }}
      items={items}
      leave={{ opacity: 0 }}
    >
      {item => props => (
        <Modal
          isOpen
          modalAnimationProps={props}
          onRequestClose={close(item)}
        >
          <Dialog>
            <LinkedResourceContainer subject={item} onDone={close(item)} />
          </Dialog>
        </Modal>
      )}
    </Transition>
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
