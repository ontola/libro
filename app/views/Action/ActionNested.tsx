import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
  useTopology,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { tabPaneTopology } from '../../topologies/TabPane';
import { isInvalidActionStatus } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

const ActionNested: FC<ActionProps> = ({
  appendix,
  onCancel,
  onDone,
  responseCallback,
  sessionStore,
}) => {
  const topology = useTopology();
  const [actionStatus] = useProperty(schema.actionStatus);

  const onDoneHandler = useDoneHandler(onDone);
  const lrs = useLRS();
  const isModal = topology === alertDialogTopology;

  if (isInvalidActionStatus(actionStatus)) {
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

  const Appendix = appendix;
  const closeModal = isModal ? (() => lrs.actions.ontola.hideDialog()) : undefined;

  return (
    <Container>
      <CardMain>
        <CardContent endSpacing>
          <Property label={schema.name} />
          <Property
            header
            label={schema.target}
            responseCallback={responseCallback}
            sessionStore={sessionStore}
            onCancel={onCancel ?? closeModal}
            onDone={onDoneHandler}
          />
          {Appendix && <Appendix />}
        </CardContent>
      </CardMain>
    </Container>
  );
};

ActionNested.type = [
  schema.Action,
  schema.UpdateAction,
];

ActionNested.topology = [
  alertDialogTopology,
  tabPaneTopology,
];

export default register(ActionNested);
