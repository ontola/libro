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

import { SignInFormLink } from '../../Auth/components/SignInForm';
import Button from '../../Common/components/Button';
import CardContent from '../../Common/components/Card/CardContent';
import HeadingContext from '../../Common/components/Heading/HeadingContext';
import { HideDialog } from '../../Common/middleware/actions';
import { alertDialogTopology, tabPaneTopology } from '../../Common/topologies';
import CardMain from '../../Common/topologies/Card/CardMain';
import Container from '../../Common/topologies/Container';
import { isInvalidActionStatus } from '../hooks/useEnabledActions';

import { ActionProps, useDoneHandler } from './helpers';

const ActionNested: FC<ActionProps> = ({
  appendix,
  onCancel,
  onDone,
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
        <HeadingContext>
          <CardMain>
            <CardContent endSpacing>
              <Property label={schema.name} />
              <Property label={schema.error} />
              <SignInFormLink Component={Button} />
            </CardContent>
          </CardMain>
        </HeadingContext>
      </Container>
    );
  }

  const Appendix = appendix;
  const closeModal = isModal ? (() => lrs.actions.get(HideDialog)()) : undefined;

  return (
    <Container>
      <HeadingContext>
        <CardMain>
          <CardContent endSpacing>
            <Property label={schema.name} />
            <Property
              header
              label={schema.target}
              sessionStore={sessionStore}
              onCancel={onCancel ?? closeModal}
              onDone={onDoneHandler}
            />
            {Appendix && <Appendix />}
          </CardContent>
        </CardMain>
      </HeadingContext>
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
