import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useAction,
  useProperty,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { flowTopology } from '../../topologies/Flow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

const useStyles = makeStyles({
  controlStrip: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  flowContent: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem',
    width: '100%',
  },
});

const ActionFlow: FC<ActionProps> = ({
  appendix: Appendix,
  onCancel,
  onDone,
  responseCallback,
  sessionStore,
}) => {
  const onDoneHandler = useDoneHandler(onDone);
  const hideDialog = useAction('ontola.hideDialog');
  const classes = useStyles();
  const [actionStatus] = useProperty(schema.actionStatus);
  const [object] = useProperty(schema.object);

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

  const closeModal = (() => hideDialog());

  return (
    <div className={classes.flowContent}>
      <div className={classes.controlStrip}>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <Property
        header
        cancelPath={object ? retrievePath(object.value) : undefined}
        label={schema.target}
        responseCallback={responseCallback}
        sessionStore={sessionStore}
        onCancel={onCancel ?? hideDialog}
        onDone={onDoneHandler}
      />
      {Appendix && <Appendix />}
    </div>
  );
};

ActionFlow.type = [
  schema.Action,
  schema.UpdateAction,
];

ActionFlow.topology = [
  flowTopology,
];

export default register(ActionFlow);