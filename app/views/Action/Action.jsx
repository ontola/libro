import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDone: () => dispatch(push(retrievePath(ownProps.object.value))),
});

class Action extends PureComponent {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
    NS.schema('CreateAction'),
    NS.argu('TrashAction'),
    NS.argu('UntrashAction'),
  ];

  static topology = [
    pageTopology,
    primaryResourceTopology,
  ];

  static mapDataToProps = [NS.schema('object')];

  static hocs = [connect(null, mapDispatchToProps)];

  static propTypes = {
    onDone: PropTypes.func,
    subject: subjectType,
  };

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

export default register(Action);
