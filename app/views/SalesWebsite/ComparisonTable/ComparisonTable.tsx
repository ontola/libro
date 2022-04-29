import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import * as schema from '@ontologies/schema';
import {
  Collapse,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles, useTheme } from '@mui/styles';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import { useSeqToArr } from '../../../hooks/useSeqToArr';
import TableHeaderRow from '../../../topologies/TableHeaderRow';
import { LibroTheme, Margin } from '../../../themes/themes';

interface StyleProps {
  animating: boolean;
}

const THE_NUMBER_TWO = 2;

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  headerRow: {
    '@supports not (backdrop-filter: blur(3px))': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(255 255 255 / 0.8)',
    position: 'sticky',
    top: ({ animating }) => animating ? 0 : '4.05rem',
  },
  heading: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  headingText: {
    fontSize: theme.typography.fontSizes.medium,
    marginBottom: 0,
  },
  infoCell: {
    width: '20%',
  },
  table: {
    '&, th, td': {
      padding: theme.spacing(Margin.Small),
      paddingLeft: 0,
    },
    borderCollapse: 'collapse',
    marginTop: theme.spacing(Margin.XL * THE_NUMBER_TWO),
    width: '100%',
  },
  tier: {
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    textAlign: 'center',
  },
  titleCell: {
    width: '40%',
  },
}));

const ComparisonTable: FC = () => {
  const [open, setOpen] = React.useState(true);
  const [animating, setAnimating] = React.useState(false);

  const classes = useStyles({ animating });
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up('md'));

  const [title] = useStrings(schema.text);

  const [tiersNode] = useIds(sales.tiers);
  const [tiers, loadingTiers] = useSeqToArr(tiersNode);

  const [tableGroupsNode] = useIds(sales.sections);
  const [tableGroups, loadingTables] = useSeqToArr(tableGroupsNode);

  const onChevronClick = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  const onAnimationStart = React.useCallback(() => {
    setAnimating(true);
  }, [setAnimating]);

  const onAnimationEnd = React.useCallback(() => {
    setAnimating(false);
  }, [setAnimating]);

  if (loadingTiers || loadingTables) {
    return null;
  }

  return (
    <React.Fragment>
      <span className={classes.heading}>
        <Typography
          className={classes.headingText}
          gutterBottom={false}
          variant="h2"
        >
          {title}
        </Typography>
        <IconButton onClick={onChevronClick}>
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
      </span>
      <Collapse
        in={open}
        onEnter={onAnimationStart}
        onEntered={onAnimationEnd}
        onExit={onAnimationStart}
        onExited={onAnimationEnd}
      >
        <table className={classes.table}>
          <thead className={classes.head}>
            <TableHeaderRow className={classes.headerRow}>
              {screenIsWide && (
                <React.Fragment>
                  <th className={classes.titleCell} />
                  <th className={classes.infoCell} />
                </React.Fragment>
              )}
              {tiers.map((tier) => (
                <th
                  className={classes.tier}
                  key={tier.value}
                >
                  <Resource subject={tier} />
                </th>
              ))}
            </TableHeaderRow>
          </thead>
          <tbody>
            {tableGroups.map((tableGroup, index) => (
              <Resource
                first={index === 0}
                key={tableGroup.value}
                subject={tableGroup}
              />
            ))}
          </tbody>
        </table>
      </Collapse>
    </React.Fragment>
  );
};

ComparisonTable.type = sales.ComparisonTable;
ComparisonTable.topology = allTopologies;

export default register(ComparisonTable);
