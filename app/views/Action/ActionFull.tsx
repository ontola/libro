import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import Metadata from '../../components/Metadata';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

interface ActionFullProps extends ActionProps {
  renderPartOf: boolean;
}

const ActionFull: FC<ActionFullProps> = ({
  appendix,
  sessionStore,
  onCancel,
  onDone,
  renderPartOf,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [object] = useProperty(schema.object);

  const onDoneHandler = useDoneHandler(onDone);
  const Appendix = appendix;

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return (
      <Container>
        {renderPartOf && <Property label={schema.isPartOf} />}
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
        {renderPartOf && <Property label={schema.isPartOf} />}
        <CardMain>
          <CardContent>
            <Property label={schema.name} />
          </CardContent>
          <Property
            header
            cancelPath={object && retrievePath(object.value)}
            label={schema.target}
            sessionStore={sessionStore}
            onCancel={onCancel}
            onDone={onDoneHandler}
          />
          {Appendix && <Appendix />}
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
