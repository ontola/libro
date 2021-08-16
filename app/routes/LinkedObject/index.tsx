import { NamedNode } from '@ontologies/core';
import { Location } from 'history';
import { Resource } from 'link-redux';
import React from 'react';

import PageError from '../../components/Error/PageError';
import { handle } from '../../helpers/logging';
import { CurrentLocationControl } from '../../helpers/paths';
import { WithWebsiteCtx, withWebsiteCtx } from '../../location';
import { Page } from '../../topologies/Page';

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

export interface LinkedObjectProps extends WithWebsiteCtx {
  iri: NamedNode;
  location: Location;
}

export interface LinkedObjectState {
  caughtError?: Error;
}

class LinkedObject extends React.Component<LinkedObjectProps, LinkedObjectState> {
  constructor(props: LinkedObjectProps) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidUpdate(prevProps: LinkedObjectProps, prevState: LinkedObjectState) {
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

      invalidateIRI = CurrentLocationControl(routedLocation, true, websitePathname, websiteCtx);
      resourceIRI = CurrentLocationControl(routedLocation, false, websitePathname, websiteCtx);
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

export default withWebsiteCtx<LinkedObjectProps>(LinkedObject);
