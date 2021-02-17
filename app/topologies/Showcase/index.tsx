import Grid from '@material-ui/core/Grid';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const showcaseTopology = argu.ns('topologies/showcase');

class Showcase extends Topology {
    constructor(props: any) {
        super(props);
        this.topology = showcaseTopology;
    }

    public renderContent() {
        const {
            children,
        } = this.props;

        return this.wrap((
            <Grid
                container
                alignItems="center"
                direction="row"
            >
                {children}
            </Grid>
        ));
    }
}

export default Showcase;
