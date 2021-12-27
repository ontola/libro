import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export const fieldLabelCID = 'CID-FieldLabel';

interface PropTypes {
  htmlFor: string;
  label: string | React.ReactNode;
  hidden?: boolean;
  required?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  fieldLabel: {
    color: theme.palette.grey.xxLightForegroundSmall,
    display: 'block',
    fontSize: '1em',
    fontWeight: 'bold',
  },
}));

const FieldLabel: React.FC<PropTypes> = ({
  htmlFor,
  label,
  hidden,
  required,
}) => {
  const classes = useStyles();

  return (
    <label
      className={clsx({
        'AriaHidden': hidden,
        [classes.fieldLabel]: true,
        [fieldLabelCID]: true,
      })}
      htmlFor={htmlFor}
    >
      {label}
      {required && (
        <span className="Field__label-required">
          *
        </span>
      )}
    </label>
  );
};

export default FieldLabel;
