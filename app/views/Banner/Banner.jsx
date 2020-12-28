import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import { defaultTopology } from 'link-lib';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React, { useEffect, useState } from 'react';

import CardContent from '../../components/Card/CardContent';
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

const Banner = ({ dismissedAt }) => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(!dismissedAt);
  useEffect(() => {
    setCollapsed(!dismissedAt);
  }, [dismissedAt]);

  return (
    <Collapse in={collapsed}>
      <div className={classes.banner}>
        <Container size="large">
          <CardContent style={cardStyle}>
            <div style={divStyle}>
              <Property label={schema.text} />
            </div>
            <Property label={ontola.dismissAction} onLoad={() => null}>
              <Property smallButton label={schema.target} topology={gridTopology} />
            </Property>
          </CardContent>
        </Container>
      </div>
    </Collapse>
  );
};

Banner.type = ontola.Banner;

Banner.topology = defaultTopology;

Banner.mapDataToProps = {
  dismissedAt: ontola.dismissedAt,
};

Banner.propTypes = {
  dismissedAt: linkType,
};

export default register(Banner);
