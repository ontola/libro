import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { MAX_POSTAL_DIGITS, MIN_POSTAL_DIGITS } from '../../../../components/Input/PostalRangeInput';
import { tryParseInt } from '../../../../helpers/numbers';

import { useVisitPostalCode } from './helpers';

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

const inputProps = {
  max: MAX_POSTAL_DIGITS,
  min: MIN_POSTAL_DIGITS,
  type: 'number',
};

interface SearchPostalFormProps {
  setSelectedPostalCode?: (digits: number) => void;
}

const SearchPostalForm: React.FC<SearchPostalFormProps> = ({
  setSelectedPostalCode,
}) => {
  const classes = useStyles();
  const [postalCode, setPostalCode] = React.useState<number | undefined>(undefined);
  const {
    recentPostalCodes,
    visitPostalCode,
  } = useVisitPostalCode();
  const ref = React.useRef<HTMLElement>();

  const handlePostalClick = setSelectedPostalCode || visitPostalCode;

  return (
    <React.Fragment>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (postalCode && postalCode > MIN_POSTAL_DIGITS && postalCode < MAX_POSTAL_DIGITS) {
            ref.current?.blur();
            handlePostalClick(postalCode);
          }
        }}
      >
        <InputBase
          className={classes.input}
          inputProps={inputProps}
          inputRef={ref}
          name="postal-input"
          placeholder="1234"
          value={postalCode}
          onChange={(e) => {
            e.preventDefault();
            setPostalCode(tryParseInt(e.target.value));
          }}
        />
        <IconButton
          className={classes.iconButton}
          name="submit-search"
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
      {recentPostalCodes.length > 0 && (
        <p>
          {recentPostalCodes.map<JSX.Element>((digits) => (
            <button
              className={classes.button}
              key={digits}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handlePostalClick(parseInt(digits));
              }}
            >
              {digits}
            </button>
          )).reduce<JSX.Element[]>((result, item, index) => ([
            ...result,
            <React.Fragment key={index}>
              {result.length > 0 ? ', ' : ''}
            </React.Fragment>,
            item,
          ]), [])}
        </p>
      )}
    </React.Fragment>
  );
};

export default SearchPostalForm;
