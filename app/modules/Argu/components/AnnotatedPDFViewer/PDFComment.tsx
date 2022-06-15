import { makeStyles } from '@mui/styles';
import { NamedNode } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../../../themes/themes';

export interface CommentProps {
  subject: NamedNode;
  text?: string;
  x?: number;
  y?: number;
  page?: number;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  comment: {
    '&:active': {
      boxShadow: theme.shadows['4'],
      transform: 'scale(1)',
      transition: 'all 0s',
    },
    '&:hover': {
      boxShadow: theme.shadows['10'],
      cursor: 'pointer',
      transform: 'scale(1.1)',
    },
    'alignItems': 'center',
    'backgroundColor': theme.palette.primary.main,
    'borderRadius': '999px',
    'boxShadow': theme.shadows['4'],
    'color': 'white',
    'display': 'flex',
    'flex': 1,
    'height': '1.5rem',
    'justifyContent': 'center',
    'position': 'absolute',
    'transition': 'box-shadow .2s, transform .2s',
    'width': '1.5rem',
  },
}));

const PDFComment = ({
  subject,
  text,
  x,
  y,
}: CommentProps): JSX.Element => {
  const lrs = useLRS();
  const classes = useStyles();
  const showDialog = React.useCallback(
    () => lrs.actions.ontola.showDialog(subject),
    [lrs, subject],
  );

  return (
    <div
      className={classes.comment}
      style={{
        left: `${x}%`,
        marginLeft: '-.5rem',
        marginTop: '-.5rem',
        top: `${y}%`,
      }}
      title={text}
      onClick={showDialog}
      onKeyUp={showDialog}
    >
      <FontAwesome name="comment" />
    </div>
  );
};

export default PDFComment;

