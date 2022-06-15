import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../../../themes/themes';

export const fieldLabelCID = 'CID-FieldLabel';

interface PropTypes {
  htmlFor: string;
  label: string | React.ReactNode;
  hidden?: boolean;
  optional?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  // Hides elements for regular users, but should maintain visibility for assistance technology
  ariaHidden: {
    height: '1px',
    left: '-10000px',
    overflow: 'hidden',
    position: 'absolute',
    top: 'auto',
    width: '1px',
  },
  fieldLabel: {
    color: theme.palette.grey.midDark,
    display: 'block',
    fontSize: '1em',
    fontWeight: 'bold',
  },
}));

const FieldLabel: React.FC<PropTypes> = ({
  htmlFor,
  label,
  hidden,
  optional,
}) => {
  const classes = useStyles();

  return (
    <label
      className={clsx({
        [classes.ariaHidden]: hidden,
        [classes.fieldLabel]: true,
        [fieldLabelCID]: true,
      })}
      htmlFor={htmlFor}
    >
      {label}
      {optional && (
        <span className={`${fieldLabelCID}-optional`}>
          (
          <FormattedMessage
            defaultMessage="Optional"
            id="https://app.argu.co/i18n/forms/optional/helperText"
          />
          )
        </span>
      )}
    </label>
  );
};

export default FieldLabel;
