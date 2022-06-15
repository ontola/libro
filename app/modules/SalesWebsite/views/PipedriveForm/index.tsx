import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import sales from '../../ontology/sales';
import {
  BreakPoints,
  LibroTheme,
  Margin,
} from '../../../../themes/themes';
import { allTopologies } from '../../../../topologies';
import { PipedriveForm as PipedriveFormComp } from '../../components/PipedriveForm';

interface StyleProps {
  approximateHeight: string;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  card: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 9px 107px rgba(0, 0, 0, 0.12), 0px 2.01027px 23.8999px rgba(0, 0, 0, 0.0715329), 0px 0.598509px 7.11561px rgba(0, 0, 0, 0.0484671);',
    minHeight: ({ approximateHeight }) => approximateHeight,
    padding: theme.spacing(Margin.Large),
    width: '100%',
    zIndex: 1,
    [theme.breakpoints.down(BreakPoints.Small)]: {
      boxShadow: 'unset',
      padding: theme.spacing(Margin.Small),
    },
  },
}));

const PipedriveForm: FC = () => {
  const [approximateHeight] = useStrings(sales.approximateHeight);
  const classes = useStyles({ approximateHeight });
  const [url] = useIds(schema.fromLocation);

  return (
    <div className={classes.card}>
      <PipedriveFormComp url={url.value} />
    </div>
  );
};

PipedriveForm.type = sales.PipedriveForm;
PipedriveForm.topology = allTopologies;

export default register(PipedriveForm);
