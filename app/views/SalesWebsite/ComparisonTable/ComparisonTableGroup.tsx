import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import * as as from '@ontologies/as';
import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import sales from '../../../ontology/sales';
import { LibroTheme, Margin } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';
import { useSeqToArr } from '../../../hooks/useSeqToArr';

const THE_NUMBER_TWO = 2;
const LARGE_SCREEN_COLUMN_COUNT = 4;
const SMALL_SCREEN_COLUMN_COUNT = 2;

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
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

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
          colSpan={largeScreen ? LARGE_SCREEN_COLUMN_COUNT : SMALL_SCREEN_COLUMN_COUNT}
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