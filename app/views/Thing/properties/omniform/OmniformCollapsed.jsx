import Collapse from '@material-ui/core/Collapse';
import schema from '@ontologies/schema';
import {
  ReturnType,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../../../components/Button';
import OmniformPreview from '../../../../components/Omniform/OmniformPreview';
import { entityIsLoaded } from '../../../../helpers/data';
import app from '../../../../ontology/app';
import link from '../../../../ontology/link';
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

const CollapsedOmniformProp = (props) => {
  const {
    clickToOpen,
    closeForm,
    lrs,
    openForm,
    opened,
    potentialAction,
  } = props;

  const toggle = () => {
    if (opened) {
      closeForm();
    } else {
      openForm();
    }
  };

  const handleKey = (e) => {
    if (e.keyCode === KEY_ESCAPE) {
      closeForm();
    }
  };

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
          closeForm={closeForm}
          formFooterButtons={backButton}
          onDone={toggle}
          onKeyUp={handleKey}
          {...props}
        />
      </CardRow>
    );
  } else if (!clickToOpen) {
    return null;
  }

  if (__CLIENT__) {
    potentialAction.forEach((action) => {
      if (!entityIsLoaded(lrs, action)) {
        lrs.queueEntity(action);
      }
    });
  }

  const items = filterActions(lrs, potentialAction);

  const shouldShow = !(!clickToOpen || items.length === 0 || actionsAreAllDisabled(items, lrs));

  return (
    <Collapse mountOnEnter in={shouldShow}>
      <CardRow>
        <OmniformPreview
          lrs={lrs}
          primaryAction={items[0]}
          onClick={toggle}
        />
      </CardRow>
    </Collapse>
  );
};

CollapsedOmniformProp.type = [schema.Thing, link.Document];

CollapsedOmniformProp.property = app.omniform;

CollapsedOmniformProp.topology = [
  cardAppendixTopology,
  cardMainTopology,
  cardTopology,
];

CollapsedOmniformProp.mapDataToProps = {
  potentialAction: {
    label: schema.potentialAction,
    returnType: ReturnType.AllTerms,
  },
};

CollapsedOmniformProp.hocs = [
  connect(mapInlineStateToProps, mapInlineDispatchToProps),
];

CollapsedOmniformProp.propTypes = {
  clickToOpen: PropTypes.bool,
  closeForm: PropTypes.func,
  lrs: lrsType,
  openForm: PropTypes.func,
  opened: PropTypes.bool.isRequired,
  potentialAction: linkType,
};

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

export default register(CollapsedOmniformProp);
