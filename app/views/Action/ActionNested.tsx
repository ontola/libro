import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { tabPaneTopology } from '../../topologies/TabPane';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

const PROPS_BLACKLIST = [
  argu.isDraft,
].map((t) => rdf.id(t));

const ActionNested: FC<ActionProps> = ({
  actionStatus,
  appendix,
  object,
  onCancel,
  onDone,
  responseCallback,
  sessionStore,
  topology,
}) => {
  const onDoneHandler = useDoneHandler(onDone);
  const lrs = useLRS();

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
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
  const closeModal = topology === alertDialogTopology
    && (() => lrs.actions.ontola.hideDialog());

  return (
    <Container>
      <CardMain>
        <CardContent>
          <Property label={schema.name} />
        </CardContent>
        <Property
          header
          blacklist={PROPS_BLACKLIST}
          cancelPath={object && retrievePath(object.value)}
          label={schema.target}
          responseCallback={responseCallback}
          sessionStore={sessionStore}
          onCancel={onCancel || closeModal}
          onDone={onDoneHandler}
        />
        {Appendix && <Appendix />}
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

ActionNested.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
};

export default register(ActionNested);
