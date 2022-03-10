import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import { useSeqToArr } from '../../../hooks/useSeqToArr';
import TableCell from '../../../topologies/TableCell';
import { LibroTheme, Margin } from '../../../themes/themes';
import { CollapsibleComparisonTitle } from '../../../components/SalesWebsite/CollapsibleComparisonTitle';

const SMALL_COLSPAN = 2;
const LARGE_COLSPAN = 1;

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
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

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
          colSpan={largeScreen ? LARGE_COLSPAN : SMALL_COLSPAN}
        >
          {largeScreen ?
            title :
            (
              <CollapsibleComparisonTitle
                description={description}
                title={title}
              />
            )}
        </td>
        {largeScreen && (
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
      {!largeScreen && (
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
