import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { APP_ELEMENT } from '../../config';
import Button from '../../components/Button';
import Markdown from '../../components/Markdown';

import './Modal.scss';
import instructions from './instructions';

ReactModal.setAppElement(document.getElementById(APP_ELEMENT));

const getParent = () => document.querySelector('#start-of-content');

class MarkdownInstructions extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Button
          small
          icon="info"
          theme="transparant"
          onClick={this.handleOpenModal}
        >
        Markdown hulp
        </Button>
        <ReactModal
          className="Modal"
          contentLabel="onRequestClose Example"
          isOpen={this.state.showModal}
          overlayClassName="Modal__overlay"
          parentSelector={getParent}
          onRequestClose={this.handleCloseModal}
        >
          <Button
            className="Modal__close"
            icon="times"
            theme="transparant"
            onClick={this.handleCloseModal}
          >
            Sluiten
          </Button>
          <Markdown
            text={instructions}
          />
        </ReactModal>
      </div>
    );
  }
}


export default MarkdownInstructions;
