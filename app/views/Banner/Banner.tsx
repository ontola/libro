import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React, { useEffect, useState } from 'react';

import CardContent from '../../components/Card/CardContent';
import { Size } from '../../components/shared/config';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';

const useStyles = makeStyles(() => ({
  banner: {
    '& .fa': {
      marginRight: '.5em',
    },
    background: 'white',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
    marginBottom: '2px',
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
              onLoad={() => null}
            >
              <Property
                smallButton
                label={schema.target}
                topology={gridTopology}
              />
            </Property>
          </CardContent>
        </Container>
      </div>
    </Collapse>
  );
};

Banner.type = ontola.Banner;

export default register(Banner);