import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Metadata from '../../components/Metadata';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';
import CardContent from '../../components/Card/CardContent';
import { retrievePath } from '../../helpers/iris';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { SignInFormLink } from '../../components/SignInForm';
import Button from '../../components/Button';

import NavigatableAction from './NavigatableAction';

export class Action extends NavigatableAction {
  static type = [
    schema.Action,
    schema.UpdateAction,
  ];

  static topology = [
    primaryResourceTopology,
  ];

  static mapDataToProps = {
    actionStatus: schema.actionStatus,
    object: schema.object,
  };

  static hocs = [withRouter];

  static propTypes = {
    appendix: PropTypes.func,
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  render() {
    const Appendix = this.props.appendix;

    if (invalidStatusIds.includes(rdf.id(this.props.actionStatus))) {
      return (
        <Container>
          <Property label={schema.isPartOf} />
          <CardMain>
            <CardContent endSpacing>
              <Property label={schema.name} />
              <Property label={schema.error} />
              <SignInFormLink Component={Button} />
            </CardContent>
          </CardMain>
        </Container>
      );
    }

    return (
      <Container>
        <Metadata />
        <Property label={schema.isPartOf} />
        <CardMain>
          <CardContent>
            <Property label={schema.name} />
          </CardContent>
          <Property
            header
            action={this.props.subject}
            cancelPath={retrievePath(this.props.object.value)}
            label={schema.target}
            onDone={this.onDoneHandler}
          />
          {Appendix && <Appendix />}
        </CardMain>
      </Container>
    );
  }
}

export default register(Action);
