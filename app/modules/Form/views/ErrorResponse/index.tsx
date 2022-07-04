import { makeStyles } from '@mui/styles';
import { FC, register } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { allTopologies } from '../../../../topologies';
import { useContainerToArr } from '../../../Kernel/hooks/useContainerToArr';
import ll from '../../../Kernel/ontology/ll';

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
