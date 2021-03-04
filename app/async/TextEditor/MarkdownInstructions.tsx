import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

import Button, { ButtonTheme } from '../../components/Button';
import Markdown from '../../components/Markdown';

import instructions from './instructions';

/* eslint-disable no-magic-numbers */
const useStyles = makeStyles((theme: any) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: 'auto',
    padding: theme.spacing(4, 4, 4),
    position: 'relative',
    top: '10vh',
    width: 400,
  },
}));
/* eslint-enable no-magic-numbers */

const MarkdownInstructions = (): JSX.Element => {
  const classes = useStyles();
  const [showModal, setModal] = useState(false);

  return (
    <div>
      <Button
        small
        icon="info"
        theme={ButtonTheme.Transparant}
        onClick={() => setModal(true)}
      >
        Markdown hulp
      </Button>
      <Modal
        aria-labelledby="Instructies voor opmaak tonen"
        open={showModal}
        onClose={() => setModal(false)}
      >
        <div className={classes.paper}>
          <Button
            corner
            icon="times"
            theme={ButtonTheme.Transparant}
            onClick={() => setModal(false)}
          >
            Sluiten
          </Button>
          <Markdown
            text={instructions}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MarkdownInstructions;
