import {
  LinkedResourceContainer,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { Transition } from 'react-spring';

import Modal from '../../components/Modal';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';
import Dialog from '../../topologies/Dialog';

class SnackbarManager extends React.PureComponent {
  static type = NS.ontola('dialog/Manager');

  static topology = allTopologies;

  static mapDataToProps = [NS.ontola('dialog/resource')];

  static propTypes = {
    'dialog/resource': PropTypes.instanceOf(NamedNode),
    lrs: lrsType,
  };

  render() {
    const items = [this.props['dialog/resource']];

    const close = item => (
      () => this.props.lrs.exec(NS.ontola(`actions/dialog/close?resource=${encodeURIComponent(item.value)}`))
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
  }
}

export default register(SnackbarManager);
