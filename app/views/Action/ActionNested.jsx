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

import CardContent from '../../components/Card/CardContent';
import { retrievePath } from '../../helpers/iris';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { tabPaneTopology } from '../../topologies/TabPane';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';
import { SignInFormLink } from '../../components/SignInForm';
import Button from '../../components/Button';

import NavigatableAction from './NavigatableAction';

class ActionNested extends NavigatableAction {
  static type = [
    schema.Action,
    schema.UpdateAction,
  ];

  static topology = [
    alertDialogTopology,
    tabPaneTopology,
  ];

  static mapDataToProps = {
    actionStatus: schema.actionStatus,
    object: schema.object,
  };

  static hocs = [withRouter];

  static propTypes = {
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  render() {
    if (invalidStatusIds.includes(rdf.id(this.props.actionStatus))) {
      return (
        <Container>
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
    const Appendix = this.props.appendix;
    const closeModal = this.props.topology === alertDialogTopology
      && (() => this.props.lrs.actions.ontola.hideDialog());

    return (
      <Container>
        <CardMain>
          <CardContent>
            <Property label={schema.name} />
          </CardContent>
          <Property
            header
            cancelPath={this.props.object && retrievePath(this.props.object.value)}
            label={schema.target}
            sessionStore={this.props.sessionStore}
            onCancel={this.props.onCancel || closeModal}
            onDone={this.onDoneHandler}
          />
          {Appendix && <Appendix />}
        </CardMain>
      </Container>
    );
  }
}

export default register(ActionNested);
