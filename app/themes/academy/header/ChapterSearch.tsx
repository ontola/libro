import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  InputAdornment,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Resource,
  dig,
  useFields,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { SearchObject, useChapterSearch } from '../../../hooks/Academy/useChapterSearch';
import app from '../../../ontology/app';
import Select from '../../../topologies/Select';
import { academyMessages } from '../../../translations/messages';
import { LibroTheme } from '../../themes';

const SHADOW_ELEVATION = 2;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  listbox: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[SHADOW_ELEVATION],
  },
  root: {
    backgroundColor: '#FBFBFB',
  },
  search: {
    alignSelf: 'strech',
    flexGrow: 1,
  },
}));

export const ChapterSearch = (): JSX.Element => {
  const lrs = useLRS();
  const intl = useIntl();
  const classNames = useStyles();

  const [target] = useIds(app['individuals/searchTarget'], dig(app.target));
  const [title] = useFields(target, schema.title);

  const searchObject = useChapterSearch(target);

  const [inputValue, setInputValue] = React.useState('');

  const filterOptions = createFilterOptions({
    stringify: (option: { key: string; text: string; }) => option.text,
  });

  const handleChange = (_: unknown, value: string | SearchObject) => {
    if (!value || typeof value === 'string') {
      return;
    }

    lrs.actions.ontola.navigate(rdf.namedNode(value.key));
    setInputValue('');
  };

  const handleInputChange = (_: unknown, value: string) => {
    setInputValue(value);
  };

  return (
    <Autocomplete
      blurOnSelect
      clearOnBlur
      disableClearable
      freeSolo
      PaperComponent={(({ children }) => (
        <div
          id="academy-search-popup"
          role="listbox"
        >
          <Select>
            {children}
          </Select>
        </div>
      ))}
      aria-controls="academy-search-popup"
      className={classNames.search}
      classes={{ listbox: classNames.listbox }}
      filterOptions={filterOptions}
      getOptionLabel={(option) => typeof option === 'string' ? '' : option.key}
      open={!!inputValue}
      options={searchObject ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            classes: { root: classNames.root },
            role: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            type: 'search',
          }}
          margin="dense"
          placeholder={intl.formatMessage(academyMessages.searchIn, { title: title?.value })}
          variant="outlined"
        />
      )}
      renderOption={(_, option, state) => (
        <Resource
          input={state.inputValue}
          subject={rdf.namedNode(option.key)}
          text={option.text}
        />
      )}
      value=""
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
};
