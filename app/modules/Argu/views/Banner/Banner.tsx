import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React, { useEffect, useState } from 'react';

import { gridTopology } from '../../../Common/topologies';
import { Size } from '../../../Kernel/lib/themes';
import CardContent from '../../../Common/components/Card/CardContent';
import Container from '../../../Common/topologies/Container';
import { LoadingHidden } from '../../../Common/components/Loading';
import Suspense from '../../../Kernel/components/Suspense';
import ontola from '../../../Kernel/ontology/ontola';

const useStyles = makeStyles(() => ({
  banner: {
    '& .fa': {
      marginRight: '.5em',
    },
    background: 'white',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
  },
}));

const cardStyle = {
  flexDirection: 'row',
  paddingLeft: 0,
  paddingRight: 0,
};

const divStyle = {
  flex: 1,
  paddingLeft: '.5em',
};

const Banner = () => {
  const [dismissedAt] = useProperty(ontola.dismissedAt);
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(!dismissedAt);
  useEffect(() => {
    setCollapsed(!dismissedAt);
  }, [dismissedAt]);

  return (
    <Collapse in={collapsed}>
      <div className={classes.banner}>
        <Container size={Size.Large}>
          <CardContent style={cardStyle}>
            <div style={divStyle}>
              <Property label={schema.text} />
            </div>
            <Property
              label={ontola.dismissAction}
              onLoad={LoadingHidden}
            >
              <Suspense>
                <Property
                  smallButton
                  label={schema.target}
                  topology={gridTopology}
                />
              </Suspense>
            </Property>
          </CardContent>
        </Container>
      </div>
    </Collapse>
  );
};

Banner.type = ontola.Banner;

export default register(Banner);
