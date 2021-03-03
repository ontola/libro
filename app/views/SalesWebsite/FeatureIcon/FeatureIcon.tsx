import { Icon, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
    container: {
        backgroundColor: '#FFFFFF',
        borderColor: 'grey',
        borderRadius: 5,
        marginTop: 50,
        padding: '0 30px',
        width: '24%',
    },
    header: {
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
    },
});

const FeatureIcon: FC = () => {
    const classes = useStyles();
    const [image] = useProperty(schema.image);
    const [name] = useProperty(schema.name);
    const [text] = useProperty(schema.text);
    const [color] = useProperty(schema.color);

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            className={classes.container}
        >
            <Icon className={image.value} style={{ color: color.value, fontSize: 44 }} />
            <Typography className={classes.header} variant="h6">{name.value}</Typography>
            <Typography className={classes.subtitle} variant="h6">{text.value}</Typography>
        </Grid>
    );
};

FeatureIcon.type = argu.ns('FeatureIcon');

FeatureIcon.topology = showcaseTopology;

FeatureIcon.hocs = [withSalesTheme];

export default FeatureIcon;
