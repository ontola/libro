import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import { SignInFormLink } from '../../../components/SignInForm';
import { isInvalidActionStatus } from '../../../hooks/useEnabledActions';
import { flowTopology } from '../../../topologies';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { ActionProps, useDoneHandler } from '../../../views/Action/helpers';

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
