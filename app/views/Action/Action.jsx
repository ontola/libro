import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

import NavigatableAction from './NavigatableAction';

export class Action extends NavigatableAction {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
  ];

  static topology = [
    primaryResourceTopology,
  ];

  static mapDataToProps = [NS.schema('object')];

  static hocs = [withRouter];

  static propTypes = {
    appendix: PropTypes.func,
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  render() {
    const Appendix = this.props.appendix;
    return (
      <Container>
        <Property label={NS.schema('isPartOf')} />
        <CardMain>
          <CardContent>
            <Property label={NS.schema('name')} />
          </CardContent>
          <Property
            header
            action={this.props.subject}
            cancelPath={retrievePath(this.props.object.value)}
            label={NS.schema('target')}
            onDone={this.onDoneHandler}
          />
          {Appendix && <Appendix />}
        </CardMain>
      </Container>
    );
  }
}

export default register(Action);
