import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { APP_ELEMENT } from '../../config';

import './Modal.scss';

ReactModal.setAppElement(document.getElementById(APP_ELEMENT));

const propTypes = {
  children: PropTypes.node.isRequired,
  modalAnimationProps: PropTypes.shape({
    opacity: PropTypes.string,
  }),
};

const Modal = ({ modalAnimationProps, ...rest }) => (
  <ReactModal
    {...rest}
    className="Modal"
    overlayClassName="Modal__overlay"
    portalClassName="Modal__portal"
    style={{
      content: modalAnimationProps,
      overlay: modalAnimationProps,
    }}
  />
);


Modal.propTypes = propTypes;

export default Modal;
