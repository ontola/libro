import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { SearchText } from '../../../components/Academy/SearchText';
import argu from '../../../ontology/argu';
import { LibroTheme } from '../../../themes/themes';
import { selectTopology } from '../../../topologies/Select';

export interface ChapterSelectProps {
  text: string;
  input: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  title: {
    fontSize: '1.1rem',
    fontWeight: theme.typography.fontWeightBold,
  },
  wrapper: {
    padding: '1rem',
    width: '100%',
  },
}));

const ChapterSelect: FC<ChapterSelectProps> = ({ text, input }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <span className={classes.title}>
        <Property label={schema.title} />
      </span>
      {text && input && (
        <SearchText input={input} text={text} />
      )}
    </div>
  );
};

ChapterSelect.type = argu.Chapter;

ChapterSelect.topology = selectTopology;

export default register(ChapterSelect);
