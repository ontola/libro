import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface PropTypes {
  name: string;
  value: string;
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

const HiddenRequiredInput: React.FC<PropTypes> = ({ name, value }) => {
  const classes = useStyles();

  return (
    <input
      required
      className={classes.inputHiddenField}
      id={name}
      name={name}
      type="text"
      value={value || ''}
      onChange={() => null}
    />
  );
};

export default HiddenRequiredInput;
