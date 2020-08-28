import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { tryParseInt } from '../../helpers/numbers';

import {
  MAX_POSTAL_DIGITS,
  MIN_POSTAL_DIGITS,
  useVisitPostalCode,
} from './helpers';

const useStyles = makeStyles(() => ({
  button: {
    color: '#533bff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    display: 'flex',
  },
  iconButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: '2px 10px',
  },
}));

const SearchPostalForm = ({ setSelectedPostalCode }) => {
  const classes = useStyles();
  const [postalCode, setPostalCode] = React.useState(null);
  const {
    recentPostalCodes,
    visitPostalCode,
  } = useVisitPostalCode();
  const ref = React.useRef();

  const handlePostalClick = setSelectedPostalCode || visitPostalCode;

  return (
    <React.Fragment>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (postalCode > MIN_POSTAL_DIGITS && postalCode < MAX_POSTAL_DIGITS) {
            ref.current.blur();
            handlePostalClick(postalCode);
          }
        }}
      >
        <InputBase
          className={classes.input}
          inputProps={{ type: 'number' }}
          inputRef={ref}
          max={MAX_POSTAL_DIGITS}
          min={MIN_POSTAL_DIGITS}
          placeholder="1234"
          value={postalCode}
          onChange={(e) => {
            e.preventDefault();
            setPostalCode(tryParseInt(e.target.value));
          }}
        />
        <IconButton
          className={classes.iconButton}
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
      {recentPostalCodes.length > 0 && (
        <p>
          {recentPostalCodes.map((digits) => (
            <button
              className={classes.button}
              key={digits}
              onClick={(e) => {
                e.preventDefault();
                handlePostalClick(digits);
              }}
            >
              {digits}
            </button>
          )).reduce(
            (result, item) => [...result, result.length > 0 ? ', ' : null, item],
            []
          )}
        </p>
      )}
    </React.Fragment>
  );
};

SearchPostalForm.propTypes = {
  setSelectedPostalCode: PropTypes.func,
};

export default SearchPostalForm;
