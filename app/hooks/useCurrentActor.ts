import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import app from '../ontology/app';
import argu from '../ontology/argu';
import ontola from '../ontology/ontola';

export const useCurrentActor = () => {
    // Might be changed later with a context value
    const actorIRI = app.c_a;

    const [actorType, setActorType] = React.useState();
    const [anonymousId, setAnonymousId] = React.useState();

    const lrs = useLRS();
    const lastUpdate = useDataFetching(actorIRI);

    React.useEffect(() => {
        const aType = lrs.getResourceProperty(actorIRI, ontola.actorType);
        const aId = lrs.getResourceProperty(actorIRI, argu.anonymousID);

        setActorType(aType);
        setAnonymousId(aId);
    }, [lastUpdate]);

    return {
        actorType,
        anonymousId,
    };
};
