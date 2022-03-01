import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface PropTypes {
  name: string;
  value: string;
  customErrorMessage?: string;
}

const useStyles = makeStyles({
  inputHiddenField: {
    border: 0,
    height: '1px',
    left: 0,
    margin: '.1em',
    padding: 0,
    position: 'absolute',
    width: '1px',
  },
});

const HiddenRequiredInput: React.FC<PropTypes> = ({ name, value, customErrorMessage }) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current && customErrorMessage) {
      ref.current.setCustomValidity(value ? '' : customErrorMessage);
    }
  }, [customErrorMessage, value, ref.current]);

  return (
    <input
      required
      className={classes.inputHiddenField}
      id={name}
      name={name}
      ref={ref}
      type="text"
      value={value || ''}
      onChange={() => null}
    />
  );
};

export default HiddenRequiredInput;
