import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

export interface InnerTextProps {
  text: string,
  bold?: boolean,
  color?: string,
  italic?: boolean,
  underline?: boolean,
}

const useStyles = makeStyles<undefined, Partial<InnerTextProps>>({
  bold: {
    color: ({ color }) => color ?? 'inherit',
    fontWeight: 700,
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecoration: 'underline',
  },
});

export const InnerText = ({
  text,
  bold,
  color,
  italic,
  underline,
}: InnerTextProps): JSX.Element => {
  const classes = useStyles({ color });
  const className = clsx({
    [classes.bold]: bold,
    [classes.italic]: italic,
    [classes.underline]: underline,
  });

  return (
    <span className={className}>
      {text}
    </span>
  );
};
