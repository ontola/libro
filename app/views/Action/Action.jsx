import LinkedRenderStore from 'link-lib';
import { link, Property, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Container } from '../../components';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  onDone: PropTypes.func,
  subject: subjectType,
};

class Action extends PureComponent {
  render() {
    return (
      <Container>
        <Property
          action={this.props.subject}
          label={NS.schema('target')}
          onDone={this.props.onDone}
        />
      </Container>
    );
  }
}

Action.propTypes = propTypes;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDone: () => dispatch(push(retrievePath(ownProps.object.value))),
});

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('object')])(connect(null, mapDispatchToProps)(Action)),
  [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
    NS.schema('CreateAction'),
    NS.argu('TrashAction'),
    NS.argu('UntrashAction'),
  ]
);
