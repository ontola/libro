import { Set } from 'immutable';
import LinkedRenderStore from 'link-lib';
import {
  link,
  linkedPropType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  Omniform,
} from '../../../../components';
import { allTopologiesExcept, NS } from '../../../../helpers/LinkedRenderStore';

const propTypes = {
  formFooterButtons: PropTypes.node,
  onKeyUp: PropTypes.func,
  potentialAction: linkedPropType,
  subject: subjectType,
};

class OmniformProp extends React.PureComponent {
  /* We need to encode the IRI's to prevent redux-forms from parsing the dots as sub-resources */
  reduxFormsSafeIRI() {
    return btoa(this.props.subject);
  }

  render() {
    return (
      <Omniform
        actions={new Set(this.props.potentialAction)}
        formFooterButtons={this.props.formFooterButtons}
        parentIRI={this.reduxFormsSafeIRI()}
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
  ({ subject }) => <Card><ConnectedOmniformProp opened subject={subject} /></Card>,
  [NS.schema('Thing'), NS.link('Document')],
  NS.app('omniform'),
  allTopologiesExcept(NS.argu('card'), NS.argu('cardAppendix'))
);
