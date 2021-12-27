import { makeStyles } from '@material-ui/styles';
import { FC, register } from 'link-redux';
import React from 'react';

import { useContainerToArr } from '../../hooks/useContainerToArr';
import ll from '../../ontology/ll';
import { LibroTheme } from '../../themes/themes';
import { allTopologies } from '../../topologies';

export const useFieldErrorStyles = makeStyles<LibroTheme>((theme) => ({
  fieldError: {
    color: theme.palette.error.main,
    display: 'block',
  },
}));

const ErrorResponse: FC = ({ subject }) => {
  const [generalErrors] = useContainerToArr(subject);
  const classes = useFieldErrorStyles();

  if (generalErrors.length === 0) {
    return null;
  }

  return (
    <div>
      {generalErrors.map((error) => (
        <div
          className={classes.fieldError}
          key={error.value}
        >
          {error.value}
        </div>
      ))}
    </div>
  );
};

ErrorResponse.type = ll.ErrorResponse;

ErrorResponse.topology = allTopologies;

export default register(ErrorResponse);
