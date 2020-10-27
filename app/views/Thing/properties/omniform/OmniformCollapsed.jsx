import Collapse from '@material-ui/core/Collapse';
import schema from '@ontologies/schema';
import {
  ReturnType,
  linkType,
  register,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../../../components/Button';
import OmniformPreview from '../../../../components/Omniform/OmniformPreview';
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

import { actionsAreAllDisabled, useActions } from './helpers';
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
    openForm,
    opened,
    potentialAction,
  } = props;
  const lrs = useLRS();
  const items = useActions(potentialAction);

  const toggle = React.useCallback(() => {
    if (opened) {
      closeForm();
    } else {
      openForm();
    }
  }, [opened, closeForm, openForm]);

  const handleKey = React.useCallback((e) => {
    if (e.keyCode === KEY_ESCAPE) {
      closeForm();
    }
  }, [closeForm]);

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
          items={items}
          onDone={toggle}
          onKeyUp={handleKey}
          {...props}
        />
      </CardRow>
    );
  } else if (!clickToOpen) {
    return null;
  }

  const shouldShow = !(!clickToOpen || items.length === 0 || actionsAreAllDisabled(items, lrs));

  return (
    <Collapse mountOnEnter in={shouldShow}>
      <CardRow>
        <OmniformPreview
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
  openForm: PropTypes.func,
  opened: PropTypes.bool.isRequired,
  potentialAction: linkType,
};

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

export default register(CollapsedOmniformProp);
