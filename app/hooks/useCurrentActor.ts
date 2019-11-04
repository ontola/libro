import { useDataFetching, useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';
import { NS } from '../helpers/LinkedRenderStore';

export const useCurrentActor = () => {
    // Might be changed later with a context value
    const actorIRI = NS.app('c_a');

    const [actorType, setActorType] = React.useState();
    const [anonymousId, setAnonymousId] = React.useState();

    const lrs = useLRS();
    const lastUpdate = useDataInvalidation({ subject: actorIRI });
    useDataFetching({ subject: actorIRI }, lastUpdate);

    React.useEffect(() => {
        const aType = lrs.getResourceProperty(actorIRI, NS.ontola('actorType'));
        const aId = lrs.getResourceProperty(actorIRI, NS.argu('anonymousID'));

        setActorType(aType);
        setAnonymousId(aId);
    }, [lastUpdate]);

    return {
        actorType,
        anonymousId,
    };
};
