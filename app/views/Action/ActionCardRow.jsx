import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { Action } from './Action';

class ActionCardRow extends Action {
  static topology = cardRowTopology;

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
