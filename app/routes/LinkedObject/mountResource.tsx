import { doc } from '@rdfdev/iri';
import { Resource } from 'link-redux';
import React from 'react';

import PageError from '../../modules/Common/components/Error/PageError';
import { currentLocationControl } from '../../modules/Common/lib/paths';
import Page from '../../modules/Common/topologies/Page';
import { WebsiteContext } from '../../modules/Kernel/components/WebsiteContext/websiteContext';

import { LinkedObjectProps, LinkedObjectState } from './index';

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

export interface MountResourceProps extends LinkedObjectProps, LinkedObjectState {
  retry: () => Promise<void>;
}

export const MountResource = ({
  caughtError,
  location,
  iri,
  retry,
}: MountResourceProps): JSX.Element => {
  const websiteCtx = React.useContext(WebsiteContext);

  let invalidateIRI = iri;
  let resourceIRI = iri;

  if (caughtError) {
    return (
      <PageError
        caughtError={caughtError}
        reloadLinkedObject={retry}
      />
    );
  }

  if (!iri && websiteCtx) {
    const { websitePathname } = websiteCtx;
    let routedLocation = location;

    for (const pathMatch of wildcardMap.keys()) {
      if (typeof pathMatch === 'string') {
        if (location.pathname.startsWith(pathMatch)) {
          const search = new URLSearchParams(location.search);
          wildcardMap.get(pathMatch).forEach((v: string) => search.delete(v));

          routedLocation = {
            ...location,
            search: search.toString() ? `?${search.toString()}` : '',
          };
          break;
        }
      }
    }

    invalidateIRI = currentLocationControl(routedLocation, true, websitePathname, websiteCtx);
    resourceIRI = currentLocationControl(routedLocation, false, websitePathname, websiteCtx);
  }

  return (
    <Page>
      <Resource
        fetch
        invalidate={invalidateIRI}
        subject={doc(resourceIRI!)}
      />
    </Page>
  );
};
