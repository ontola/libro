import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import NavigatableAction from './NavigatableAction';

class ActionCardRow extends NavigatableAction {
  static type = [
    schema.Action,
    schema.UpdateAction,
  ];

  static topology = cardRowTopology;

  static mapDataToProps = {
    actionStatus: schema.actionStatus,
    object: schema.object,
  };

  static propTypes = {
    actionStatus: linkType,
    object: subjectType,
    onCancel: PropTypes.func,
    sessionStore: PropTypes.objectOf(PropTypes.any),
  };

  render() {
    if (invalidStatusIds.includes(rdf.id(this.props.actionStatus))) {
      return (
        <CardContent endSpacing>
          <Property label={schema.name} />
          <Property label={schema.error} />
          <SignInFormLink Component={Button} />
        </CardContent>
      );
    }

    return (
      <Property
        header
        cancelPath={this.props.object && retrievePath(this.props.object.value)}
        label={schema.target}
        sessionStore={this.props.sessionStore}
        topology={cardMainTopology}
        onCancel={this.props.onCancel}
        onDone={this.onDoneHandler}
      />
    );
  }
}

export default register(ActionCardRow);
