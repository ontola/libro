import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import Markdown from '../../components/Markdown';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';

import instructions from './instructions';

/* eslint-disable @typescript-eslint/no-magic-numbers */
const useStyles = makeStyles<LibroTheme>((theme) => ({
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
/* eslint-enable @typescript-eslint/no-magic-numbers */

const MarkdownInstructions = (): JSX.Element => {
  const { formatMessage } = useIntl();
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
            {formatMessage(formMessages.close)}
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
