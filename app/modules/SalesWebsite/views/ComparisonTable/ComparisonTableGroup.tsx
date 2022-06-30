import { Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import {
  BreakPoints,
  LibroTheme,
  Margin,
} from '../../../../themes/themes';
import { allTopologies } from '../../../../topologies';
import { useSeqToArr } from '../../../Core/hooks/useSeqToArr';
import sales from '../../ontology/sales';

const THE_NUMBER_TWO = 2;
const WIDE_SCREEN_COLUMN_COUNT = 4;
const NARROW_SCREEN_COLUMN_COUNT = 2;

interface ComparisonTableGroupProps {
  first?: boolean,
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  heading: {
    borderBottom: `2px solid ${theme.palette.grey.xLight}`,
  },
  headingRowTopPadding: {
    paddingTop: `${theme.spacing(Margin.XL * THE_NUMBER_TWO)} !important`,
  },
  headingText: {
    fontSize: theme.typography.fontSizes.medium,
  },
}));

const ComparisonTableGroup: FC<ComparisonTableGroupProps> = ({ first }) => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));

  const [title] = useStrings(schema.text);
  const [itemsNode] = useIds(as.items);
  const [items, loading] = useSeqToArr(itemsNode);

  const headingClass = clsx({
    [classes.heading]: true,
    [classes.headingRowTopPadding]: !first,
  });

  return (
    <React.Fragment>
      <tr>
        <td
          className={headingClass}
          colSpan={screenIsWide ? WIDE_SCREEN_COLUMN_COUNT : NARROW_SCREEN_COLUMN_COUNT}
        >
          <Typography
            className={classes.headingText}
            gutterBottom={false}
            variant="h3"
          >
            {title}
          </Typography>
        </td>
      </tr>
      {!loading && items.map((item, index) => (
        <Resource
          first={index === 0}
          key={item.value}
          subject={item}
        />
      ))}
    </React.Fragment>
  );
};

ComparisonTableGroup.type = sales.ComparisonTableGroup;
ComparisonTableGroup.topology = allTopologies;

export default register(ComparisonTableGroup);
