import {
  LinkedResourceContainer,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { Transition } from 'react-spring';
import ReactModal from 'react-modal';

import { APP_ELEMENT } from '../../config';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';
import Dialog from '../../topologies/Dialog';

ReactModal.setAppElement(document.getElementById(APP_ELEMENT));

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

    const close = () => this.props.lrs.exec(NS.ontola('actions/dialog/close'));

    return (
      <Transition
        enter={{ opacity: 1 }}
        from={{ opacity: 0 }}
        items={items}
        leave={{ opacity: 0 }}
      >
        {item => props => (
          <ReactModal
            isOpen
            style={{
              content: {
                background: 'none',
                border: 'none',
                bottom: 'auto',
                left: 'auto',
                maxHeight: '100%',
                overflow: 'visible',
                padding: 0,
                right: 'auto',
                top: 'auto',
                ...props,
              },
              overlay: {
                alignItems: 'center',
                backgroundColor: 'rgba(82, 82, 82, 0.75)',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'scroll',
                zIndex: '10',
                ...props,
              },
            }}
            onRequestClose={close}
          >
            <Dialog>
              <LinkedResourceContainer subject={item} onDone={close} />
            </Dialog>
          </ReactModal>
        )}
      </Transition>
    );
  }
}

export default register(SnackbarManager);
