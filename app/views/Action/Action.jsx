import { push } from 'connected-react-router';
import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

const mapDispatchToProps = dispatch => ({
  navigate: iri => dispatch(push(retrievePath(iri))),
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
    navigate: PropTypes.func,
    subject: subjectType,
  };

  constructor(props) {
    super(props);

    this.onDoneHandler = this.onDoneHandler.bind(this);
  }

  onDoneHandler(response) {
    this.props.navigate(response.iri.value);
  }

  render() {
    return (
      <Container>
        <Property label={NS.schema('name')} />
        <Property
          action={this.props.subject}
          label={NS.schema('target')}
          onDone={this.onDoneHandler}
        />
      </Container>
    );
  }
}

export default register(Action);
