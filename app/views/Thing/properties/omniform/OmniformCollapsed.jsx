import Collapse from '@material-ui/core/Collapse';
import {
  linkType,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, OmniformPreview } from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';
import {
  getOmniformOpenState,
  omniformCloseInline,
  omniformOpenInline,
} from '../../../../state/omniform';
import { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import CardRow from '../../../../topologies/Card/CardRow';

import { actionsAreAllDisabled, filterActions } from './helpers';
import OmniformConnector from './OmniformConnector';

const KEY_ESCAPE = 27;

const mapInlineStateToProps = (state, ownProps) => ({
  opened: getOmniformOpenState(state, ownProps.subject),
});

const mapInlineDispatchToProps = (dispatch, ownProps) => ({
  closeForm: () => Promise.resolve(dispatch(omniformCloseInline(ownProps.subject))),
  openForm: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.subject))),
});

class CollapsedOmniformProp extends Component {
  static type = [NS.schema('Thing'), NS.link('Document')];

  static property = NS.app('omniform');

  static topology = [
    cardAppendixTopology,
    cardMainTopology,
    cardTopology,
  ];

  static mapDataToProps = {
    potentialAction: {
      label: NS.schema('potentialAction'),
      limit: Infinity,
    },
  };

  static hocs = [connect(mapInlineStateToProps, mapInlineDispatchToProps)];

  static propTypes = {
    clickToOpen: PropTypes.bool,
    closeForm: PropTypes.func,
    lrs: lrsType,
    openForm: PropTypes.func,
    opened: PropTypes.bool.isRequired,
    potentialAction: linkType,
  };

  static defaultProps = {
    clickToOpen: true,
  };

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
    const {
      clickToOpen,
      closeForm,
      lrs,
      opened,
      potentialAction,
    } = this.props;

    if (opened) {
      const backButton = (
        <Button
          theme="transparant"
          onClick={closeForm}
        >
          <FormattedMessage id="https://app.argu.co/i18n/forms/actions/cancel" />
        </Button>
      );

      return (
        <CardRow>
          <OmniformConnector
            autofocusForm
            formFooterButtons={backButton}
            onDone={this.toggle}
            onKeyUp={this.handleKey}
            {...this.props}
          />
        </CardRow>
      );
    }

    const items = filterActions(lrs, potentialAction);

    const shouldShow = !(!clickToOpen || items.length === 0 || actionsAreAllDisabled(items, lrs));

    return (
      <Collapse mountOnEnter in={shouldShow}>
        <CardRow>
          <OmniformPreview
            lrs={lrs}
            primaryAction={items[0]}
            onClick={this.toggle}
          />
        </CardRow>
      </Collapse>
    );
  }
}

export default register(CollapsedOmniformProp);
