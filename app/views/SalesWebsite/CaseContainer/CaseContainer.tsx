import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, Property, useProperty } from 'link-redux';
import React from 'react';
import Image from '../../../components/Image';

import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
    button: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 30,
        textTransform: 'none',
    },
    gridStyle: {
        backgroundColor: '#F8FBFF',
    },
    imageStyle: {
        marginBottom: '1em',
        maxWidth: '100%',
    },
});

const CaseContainer: FC = () => {
    const classes = useStyles();
    const [source] = useProperty(schema.image);
    const [name] = useProperty(schema.name);
    const [text] = useProperty(schema.text);
    const [caseButtonText] = useProperty(argu.ns('caseButtonText'));

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            className={classes.gridStyle}
        >
            <Typography variant="h2">{name.value}</Typography>
            <Typography variant="body1">{text.value}</Typography>
            <Image
                linkedProp={source}
                className={classes.imageStyle}
            />
            <Showcase>
                <Property label={argu.ns('caseShowcase')} />
            </Showcase>
            <Button
                className={classes.button}
                endIcon={<ArrowRightAltIcon color="secondary" style={{ fontSize: 40 }}/>}
            >
                {caseButtonText.value}
            </Button>
        </Grid>
    );
};

CaseContainer.type = argu.ns('Cases');

CaseContainer.topology = containerTopology;

CaseContainer.hocs = [withSalesTheme];

export default CaseContainer;
