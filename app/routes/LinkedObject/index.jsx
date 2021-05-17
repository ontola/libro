import RDFTypes from '@rdfdev/prop-types';
import { Resource, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ErrorButtonWithFeedback from '../../components/Error/ErrorButtonWithFeedback';
import { handle } from '../../helpers/logging';
import { currentLocation } from '../../helpers/paths';
import { withWebsiteCtx } from '../../location';
import { Page } from '../../topologies/Page';

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

class LinkedObject extends React.PureComponent {
  static propTypes = {
    iri: RDFTypes.namedNode,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    websiteCtx: PropTypes.shape({
      websitePathname: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.caughtError && this.props.location.pathname !== prevProps.location.pathname) {
      this.retry();
    }
  }

  componentDidCatch(e, ignored) {
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

    if (!iri) {
      const { websitePathname } = websiteCtx;
      let routedLocation = location;

      if (typeof this.state.caughtError !== 'undefined') {
        return <ErrorButtonWithFeedback reloadLinkedObject={this.retry} />;
      }

      for (const pathMatch of wildcardMap.keys()) {
        if (typeof pathMatch === 'string') {
          if (location.pathname.startsWith(pathMatch)) {
            const search = new URLSearchParams(location.search);
            wildcardMap.get(pathMatch).forEach((v) => search.delete(v));

            routedLocation = {
              ...location,
              search: search.toString() ? `?${search.toString()}` : '',
            };
            break;
          }
        }
      }

      invalidateIRI = currentLocation(routedLocation, true, websitePathname, websiteCtx);
      resourceIRI = currentLocation(routedLocation, false, websitePathname, websiteCtx);
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

export default withLRS(withWebsiteCtx(LinkedObject));
