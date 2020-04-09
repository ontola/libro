import { useResourceLink } from 'link-redux';

import app from '../ontology/app';
import argu from '../ontology/argu';
import ontola from '../ontology/ontola';

export const useCurrentActor = () => {
    // Might be changed later with a context value
    const actorIRI = app.c_a;

    return useResourceLink(actorIRI, {
        actorType: ontola.actorType,
        anonymousID: argu.anonymousID,
    });
};
