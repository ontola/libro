import LinkedRenderStore from 'link-lib';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, OmniformPreview } from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';
import {
  getOmniformOpenState,
  omniformCloseInline,
  omniformOpenInline,
} from '../../../../state/omniform';
import CardRow from '../../../../topologies/Card/CardRow';

import { ConnectedOmniformProp } from './omniform';

const KEY_ESCAPE = 27;

class CollapsedOmniformProp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  toggle() {
    if (this.props.opened) {
      this.props.closeForm();
    } else {
      this.props.openForm();
    }
  }

  handleKey(e) {
    if (e.keyCode === KEY_ESCAPE) {
      this.props.closeForm();
    }
  }

  render() {
    if (this.props.opened) {
      const backButton = (
        <Button
          theme="transparant"
          onClick={this.props.closeForm}
        >
          Annuleren
        </Button>
      );

      return (
        <CardRow>
          <ConnectedOmniformProp
            formFooterButtons={backButton}
            onDone={this.toggle}
            onKeyUp={this.handleKey}
            {...this.props}
          />
        </CardRow>
      );
    }

    if (!this.props.clickToOpen) {
      return null;
    }

    return (
      <CardRow>
        <OmniformPreview onClick={this.toggle} />
      </CardRow>
    );
  }
}

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

CollapsedOmniformProp.propTypes = {
  clickToOpen: PropTypes.bool,
  closeForm: PropTypes.func,
  openForm: PropTypes.func,
  opened: PropTypes.bool.isRequired,
};


const mapInlineStateToProps = (state, ownProps) => ({
  opened: getOmniformOpenState(state, ownProps.subject),
});

const mapInlineDispatchToProps = (dispatch, ownProps) => ({
  closeForm: () => Promise.resolve(dispatch(omniformCloseInline(ownProps.subject))),
  openForm: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.subject))),
});

export default LinkedRenderStore.registerRenderer(
  connect(mapInlineStateToProps, mapInlineDispatchToProps)(CollapsedOmniformProp),
  [NS.schema('Thing'), NS.link('Document')],
  NS.app('omniform'),
  [NS.argu('card'), NS.argu('cardAppendix'), NS.argu('cardMain')]
);
