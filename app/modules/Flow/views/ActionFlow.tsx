import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { isInvalidActionStatus } from '../../Action/hooks/useEnabledActions';
import { ActionProps, useDoneHandler } from '../../Action/views/helpers';
import { SignInFormLink } from '../../Auth/components/SignInForm';
import Button from '../../Common/components/Button';
import CardContent from '../../Common/components/Card/CardContent';
import CardMain from '../../Common/topologies/Card/CardMain';
import Container from '../../Common/topologies/Container';
import { flowTopology } from '../topologies/Flow';

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
  sessionStore,
}) => {
  const lrs = useLRS();
  const onDoneHandler = useDoneHandler(onDone);
  const closeModal = lrs.actions.ontola.hideDialog;
  const classes = useStyles();
  const [actionStatus] = useProperty(schema.actionStatus);

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
    <div className={classes.flowContent}>
      <div className={classes.controlStrip}>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <Property
        header
        label={schema.target}
        sessionStore={sessionStore}
        onCancel={onCancel ?? closeModal}
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
