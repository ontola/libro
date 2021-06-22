import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import {
  Resource,
  useDig,
  useLRS,
} from 'link-redux';
import React from 'react';

import { SearchObject, useChapterSearch } from '../../../hooks/Academy/useChapterSearch';
import app from '../../../ontology/app';
import Select from '../../../topologies/Select';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FBFBFB',
  },
  search: {
    alignSelf: 'strech',
    flexGrow: 1,
  },
});

export const ChapterSearch = (): JSX.Element => {
  const lrs = useLRS();
  const classNames = useStyles();
  const [target] = useDig([app.target], app['individuals/searchTarget']);

  const searchObject = useChapterSearch(target?.[0]);

  const filterOptions = createFilterOptions({
    stringify: (option: { key: string, text: string }) => option.text,
  });

  const handleChange = (_: React.ChangeEvent<Record<string, unknown>>, value: string | SearchObject) => {
    if (!value || typeof value === 'string') {
      return;
    }

    lrs.actions.ontola.navigate(rdf.namedNode(value.key));
  };

  return (
    <Autocomplete
      blurOnSelect
      clearOnBlur
      debug
      disableClearable
      freeSolo
      PaperComponent={(({ children }) => (<Select>{children}</Select>))}
      className={classNames.search}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.key ?? ''}
      options={searchObject ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            classes: { root: classNames.root },
            type: 'search',
          }}
          label="Type hier jouw zoekopdracht"
          margin="dense"
          variant="outlined"
        />
      )}
      renderOption={(option) => (
        <Resource subject={rdf.namedNode(option.key)} />
      )}
      onChange={handleChange}
    />
  );
};
