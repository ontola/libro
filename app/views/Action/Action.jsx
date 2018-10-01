import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

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
