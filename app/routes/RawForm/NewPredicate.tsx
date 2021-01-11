import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import rdfx from '@ontologies/rdf';
import { useLRS } from 'link-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

import useStyles from './useStyles';

export const NewPredicate = ({ input }: FieldRenderProps<any>) => {
  const classes = useStyles();
  const lrs = useLRS();
  const [newValue, setNewValue] = useState('');

  const options = useMemo(() => (
    lrs.store
      .match(null, rdfx.type, rdfx.Property, null, false)
      .map((s) => s.subject.value)
      .sort()
  ), []);

  useEffect(() => (
    setNewValue(input.value)
  ), [input.value]);

  return (
    <div className={classes.rowWrapper}>
      <Autocomplete
        clearOnBlur
        id="newPredicateAutocomplete"
        filterOptions={(options1, params) => (
          createFilterOptions<string>()(options1, {
            getOptionLabel: params.getOptionLabel,
            inputValue: newValue,
          })
        )}
        freeSolo
        handleHomeEndKeys
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            input.onChange(newValue);
          }
        }}
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} style={{ display: 'flex', flexGrow: 1 }}>
            <input
              {...params.inputProps}
              onChange={(e) => setNewValue(e.target.value.trim())}
              type="text"
            />
          </div>
        )}
        selectOnFocus
        style={{ flexGrow: 1 }}
        value={newValue}
      />
      <Button
        className={classes.button}
        color="primary"
        disabled={!newValue}
        onClick={() => {
          input.onChange(newValue);
        }}
        variant="contained"
      >
        Toevoegen
      </Button>
    </div>
  );
};

export default NewPredicate;
