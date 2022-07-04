import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  fieldButtons: {
    '& button, & [role="button"]': {
      color: '#707070',
      float: 'right',
      padding: '0.1em',
    },
    paddingRight: '0.5em',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndexFormInputButtons,
  },
}));

interface FormInputButtons {
  children: React.ReactNode;
}

const FormInputButtons = ({
  children,
}: FormInputButtons): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.fieldButtons}>
      {children}
    </div>
  );
};

export default FormInputButtons;
