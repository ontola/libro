import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { selectTopology } from '../../../Form/topologies';
import { LibroTheme } from '../../../Kernel/lib/themes';
import argu from '../../../Argu/ontology/argu';
import { SearchText } from '../../components/SearchText';

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
  const [title] = useProperty(schema.title);

  const trackingId = `${title.value?.toLowerCase().replace(/[^a-zA-Z]+/g, '-')}-search-result`;

  return (
    <div
      className={classes.wrapper}
      id={trackingId}
    >
      <span className={classes.title}>
        <Property label={schema.title} />
      </span>
      {text && input && (
        <SearchText
          input={input}
          text={text}
        />
      )}
    </div>
  );
};

ChapterSelect.type = argu.Chapter;

ChapterSelect.topology = selectTopology;

export default register(ChapterSelect);
