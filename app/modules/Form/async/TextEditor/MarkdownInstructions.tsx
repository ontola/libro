import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { formMessages } from '../../../../translations/messages';
import Button, { ButtonVariant } from '../../../Common/components/Button';
import Markdown from '../../../Common/components/Markdown';

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
  const classes = useStyles();
  const [showModal, setModal] = useState(false);

  return (
    <div>
      <Button
        small
        icon="info"
        variant={ButtonVariant.Transparent}
        onClick={() => setModal(true)}
      >
        <span id="show-markdown-instructions-button">
          <FormattedMessage {...formMessages.showMarkdownInstructions} />
        </span>
      </Button>
      <Modal
        aria-describedby="markdown-instructions-modal-content"
        aria-labelledby="show-markdown-instructions-button"
        open={showModal}
        onClose={() => setModal(false)}
      >
        <div className={classes.paper}>
          <Button
            corner
            icon="times"
            variant={ButtonVariant.Transparent}
            onClick={() => setModal(false)}
          >
            <FormattedMessage {...formMessages.close} />
          </Button>
          <div id="markdown-instructions-modal-content">
            <Markdown
              text={instructions}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarkdownInstructions;
