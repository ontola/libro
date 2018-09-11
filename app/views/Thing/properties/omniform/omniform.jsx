import { Set } from 'immutable';
import LinkedRenderStore from 'link-lib';
import {
  link,
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Omniform,
} from '../../../../components';
import { NS } from '../../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../../topologies';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';

const propTypes = {
  autofocusForm: PropTypes.bool,
  formFooterButtons: PropTypes.node,
  onDone: PropTypes.func,
  onKeyUp: PropTypes.func,
  potentialAction: linkType,
  subject: subjectType,
};

class OmniformProp extends React.PureComponent {
  keynameSafeIRI() {
    return btoa(this.props.subject);
  }

  render() {
    return (
      <Omniform
        actions={new Set(this.props.potentialAction)}
        autofocusForm={this.props.autofocusForm}
        formFooterButtons={this.props.formFooterButtons}
        parentIRI={this.keynameSafeIRI()}
        onDone={this.props.onDone}
        onKeyUp={this.props.onKeyUp}
      />
    );
  }
}

OmniformProp.propTypes = propTypes;

export const ConnectedOmniformProp = link({
  potentialAction: {
    label: NS.schema('potentialAction'),
    limit: Infinity,
  },
})(OmniformProp);

export default LinkedRenderStore.registerRenderer(
  ({ subject }) => (
    <Card><ConnectedOmniformProp opened autofocusForm={false} subject={subject} /></Card>
  ),
  [NS.schema('Thing'), NS.link('Document')],
  NS.app('omniform'),
  allTopologiesExcept(cardTopology, cardMainTopology, cardAppendixTopology)
);
