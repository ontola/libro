import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { CONTAINER_ELEMENT, CONTENT_ELEMENT } from '../../config';

import './Modal.scss';


const propTypes = {
  children: PropTypes.node.isRequired,
  modalAnimationProps: PropTypes.shape({
    opacity: PropTypes.string,
  }),
};

const Modal = ({ modalAnimationProps, ...rest }) => {
  ReactModal.setAppElement(`#${CONTENT_ELEMENT}`);

  return (
    <ReactModal
      {...rest}
      className="Modal"
      overlayClassName="Modal__overlay"
      parentSelector={() => document.getElementById(CONTAINER_ELEMENT)}
      portalClassName="Modal__portal"
      style={{
        content: modalAnimationProps,
        overlay: modalAnimationProps,
      }}
    />
  );
};

Modal.propTypes = propTypes;

export default Modal;
