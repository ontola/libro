import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology, tabPaneTopology } from '../../../../Common/topologies';
import { LibroTheme } from '../../../../Kernel/lib/themes';
import { MapVariant } from '../../../../Map/components/ControlledMap';
import argu from '../../../ontology/argu';

import { ArguLocationProps } from './arguLocation';

const paddingAmount = 10;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  wrapper: {
    padding: theme.spacing(paddingAmount),
    paddingBotton: 0,
    paddingTop: 0,
  },
}));

const ArguLocationTabPane: FC<ArguLocationProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Property
        {...props}
        topology={fullResourceTopology}
        variant={MapVariant.MapQuestion}
      />
    </div>
  );
};

ArguLocationTabPane.type = schema.Thing;

ArguLocationTabPane.property = [argu.mapQuestion, schema.location];
ArguLocationTabPane.topology = tabPaneTopology;

export default register(ArguLocationTabPane);
