import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React from 'react';

import { SignInFormLink } from '../../Auth/components/SignInForm';
import Button from '../../Common/components/Button';
import CardContent from '../../Common/components/Card/CardContent';
import Metadata from '../../Common/components/Metadata';
import { fullResourceTopology } from '../../Common/topologies';
import CardMain from '../../Common/topologies/Card/CardMain';
import Container from '../../Common/topologies/Container';
import { isInvalidActionStatus } from '../hooks/useValidActions';

import { ActionProps, useDoneHandler } from './helpers';

const ActionFull: FC<ActionProps> = ({
  appendix,
  sessionStore,
  onCancel,
  onDone,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);

  const onDoneHandler = useDoneHandler(onDone);
  const Appendix = appendix;

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

  return (
    <React.Fragment>
      <Metadata />
      <Container>
        <CardMain>
          <CardContent endSpacing>
            <Property label={schema.name} />
            <Property
              header
              label={schema.target}
              sessionStore={sessionStore}
              onCancel={onCancel}
              onDone={onDoneHandler}
            />
            {Appendix && <Appendix />}
          </CardContent>
        </CardMain>
      </Container>
    </React.Fragment>
  );
};

ActionFull.type = [
  schema.Action,
  schema.UpdateAction,
];

ActionFull.topology = [
  fullResourceTopology,
];

export default register(ActionFull);
