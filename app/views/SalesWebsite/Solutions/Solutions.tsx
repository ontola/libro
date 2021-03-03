import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
    button: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 30,
        textTransform: 'none',
    },
    container: {
        backgroundColor: 'orange',
        width: '50%',
    },
    header: {
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
    },
    view: {
        borderColor: 'grey',
        borderRadius: 5,
        marginTop: 50,
        padding: '0 30px',
        width: '50%',
    },
});

const Solutions: FC = () => {
    const classes = useStyles();
    const [URL] = useProperty(schema.URL);
    const [name] = useProperty(schema.name);
    const [text] = useProperty(schema.text);

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            className={classes.view}
        >
            <Typography className={classes.header} variant="h6">{name.value}</Typography>
            <Typography className={classes.subtitle} variant="h6">{text.value}</Typography>
            <Button
                className={classes.button}
                endIcon={<ArrowRightAltIcon color="secondary" style={{ fontSize: 40 }}/>}
            >
                {URL.value}
            </Button>
        </Grid>
    );
};

Solutions.type = argu.ns('SolutionBlock');

Solutions.topology = showcaseTopology;

Solutions.hocs = [withSalesTheme];

export default Solutions;
