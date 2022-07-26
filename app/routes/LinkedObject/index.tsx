import { NamedNode } from '@ontologies/core';
import type { Location } from 'history';
import React from 'react';
import { useLocation } from 'react-router';

import { handle } from '../../helpers/logging';

import { MountResource } from './mountResource';

interface IRIProp {
  iri?: NamedNode;
}

export type LinkedObjectProps = IRIProp & WithLocation;

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
    return (
      <MountResource
        caughtError={this.state.caughtError}
        iri={this.props.iri}
        location={this.props.location}
        retry={this.retry}
      />
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

export default withLocation<IRIProp>(LinkedObject);
