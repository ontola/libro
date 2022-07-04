import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
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
} from '../../../Kernel/lib/themes';
import { allTopologies } from '../../../../topologies';
import { useSeqToArr } from '../../../Kernel/hooks/useSeqToArr';
import TableCell from '../../../Table/topologies/TableCell';
import { CollapsibleComparisonTitle } from '../../components/CollapsibleComparisonTitle';
import sales from '../../ontology/sales';

const TWO_SMALL_COLUMNS = 2;
const ONE_BIG_COLUMN = 1;

interface ComparisonTableItemProps {
  first?: boolean,
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  infoIcon: {
    color: theme.palette.grey.light,
  },
  itemRowTopPadding: {
    paddingTop: `${theme.spacing(Margin.XL)} !important`,
  },
}));

const useTooltipClasses = makeStyles<LibroTheme>((theme) => ({
  tooltip: {
    fontSize: theme.typography.fontSizes.small,
  },
}));

const ComparisonTableItem: FC<ComparisonTableItemProps> = ({ first }) => {
  const classes = useStyles();
  const tooltipClasses = useTooltipClasses();
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));

  const [title] = useStrings(schema.name);
  const [description] = useStrings(schema.text);
  const [tiersNode] = useIds(sales.tiers);
  const [tiers, loading] = useSeqToArr(tiersNode);

  const Tiers = React.useCallback(() => (
    <React.Fragment>
      {!loading && tiers.map((tier) => (
        <TableCell
          noBorder
          align="center"
          key={tier.value}
        >
          <Resource subject={tier} />
        </TableCell>
      ))}
    </React.Fragment>
  ), [loading, tiers]);

  const titleClass = clsx({
    [classes.itemRowTopPadding]: first,
  });

  return (
    <React.Fragment>
      <tr>
        <td
          className={titleClass}
          colSpan={screenIsWide ? ONE_BIG_COLUMN : TWO_SMALL_COLUMNS}
        >
          {screenIsWide ?
            title :
            (
              <CollapsibleComparisonTitle
                description={description}
                title={title}
              />
            )}
        </td>
        {screenIsWide && (
          <React.Fragment>
            <td>
              <Tooltip
                arrow
                classes={tooltipClasses}
                title={description}
              >
                <InfoIcon className={classes.infoIcon} />
              </Tooltip>
            </td>
            <Tiers />
          </React.Fragment>
        )}
      </tr>
      {!screenIsWide && (
        <tr>
          <Tiers />
        </tr>
      )}
    </React.Fragment>

  );
};

ComparisonTableItem.type = sales.ComparisonTableItem;
ComparisonTableItem.topology = allTopologies;

export default register(ComparisonTableItem);
