import { NamedNode } from '@ontologies/core';
import type { Location } from 'history';
import { Resource } from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router';

import { handle } from '../../helpers/logging';
import PageError from '../../modules/Common/components/Error/PageError';
import { currentLocationControl } from '../../modules/Common/lib/paths';
import Page from '../../modules/Common/topologies/Page';
import { WebsiteContext, WebsiteCtx } from '../../modules/Kernel/components/WebsiteContext/websiteContext';

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

interface LinkedObjectProps {
  iri?: NamedNode;
}

type Proptypes = LinkedObjectProps & WithWebsiteCtx & WithLocation;

export interface LinkedObjectState {
  caughtError?: Error;
}

class LinkedObject extends React.Component<Proptypes, LinkedObjectState> {
  constructor(props: Proptypes) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidUpdate(prevProps: Proptypes, prevState: LinkedObjectState) {
    if (prevState.caughtError && this.props.location.pathname !== prevProps.location.pathname) {
      this.retry();
    }
  }

  componentDidCatch(e: Error) {
    handle(e);
    this.setState({ caughtError: e });
  }

  retry() {
    this.setState({
      caughtError: undefined,
    });

    return Promise.resolve();
  }

  render() {
    const {
      location,
      iri,
      websiteCtx,
    } = this.props;
    let invalidateIRI = iri;
    let resourceIRI = iri;

    if (this.state.caughtError) {
      return (
        <PageError
          caughtError={this.state.caughtError}
          reloadLinkedObject={this.retry}
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
          subject={resourceIRI}
        />
      </Page>
    );
  }
}

type WithLocation = {
  location: Location;
};

function withLocation<P>(Component: React.ComponentType<P & WithLocation>) {
  return (props: P): JSX.Element => {
    const location = useLocation();

    return (
      <Component
        {...props}
        location={location}
      />
    );
  };
}

interface WithWebsiteCtx {
  websiteCtx?: WebsiteCtx;
}

function withWebsiteCtx<P>(Component: React.ComponentType<WithWebsiteCtx & P>) {
  return (props: P): JSX.Element => {
    const websiteCtx = React.useContext(WebsiteContext);

    return (
      <Component
        {...props}
        websiteCtx={websiteCtx}
      />
    );
  };
}

export default withWebsiteCtx<LinkedObjectProps>(withLocation<LinkedObjectProps>(LinkedObject));
