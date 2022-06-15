import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../themes/themes';

export interface SearchTextProps {
  text: string;
  input: string;
}

const STRING_PADDING = 30;
const MATCH_LENGTH = 2;

const sentenceBoundaryRegex = /(\.|\?|”|:|!)\s*[A-Z]?(?!\.)/gm;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  input: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const findClosestSentenceStart = (text: string): number => {
  const match = Array.from(text.matchAll(sentenceBoundaryRegex)).pop()?.index;

  return match ? match + MATCH_LENGTH : 0;
};

export const SearchText = ({ text, input }: SearchTextProps): JSX.Element => {
  const classes = useStyles();

  const [prefix, setPrefix] = React.useState('');
  const [suffix, setSuffix] = React.useState('');

  React.useEffect(() => {
    const inputPosition = text.toLowerCase().indexOf(input.toLowerCase());

    const strPrefix = text.substring(findClosestSentenceStart(text.substring(0, inputPosition)), inputPosition);
    const strSuffix = text.substring(inputPosition + input.length, inputPosition + input.length + STRING_PADDING);

    setPrefix(strPrefix);
    setSuffix(strSuffix.trimEnd());
  }, [text, input]);

  return (
    <div>
      <span>
        {prefix}
      </span>
      <span className={classes.input}>
        {input}
      </span>
      <span>
        {`${suffix}...`}
      </span>
    </div>
  );
};
