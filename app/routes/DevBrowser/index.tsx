import rdf from '@ontologies/core';
import { term } from '@rdfdev/iri';
import { History, Location } from 'history';
import { LinkReduxLRSType, withLRS } from 'link-redux';
import React, { ChangeEvent, Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { withRouter } from 'react-router-dom';

import app from '../../ontology/app';
import argu from '../../ontology/argu';
import { allTopologies, getTopologyNumber } from '../../topologies';

import TopologyWrapper from './TopologyWrapper';
import './DevBrowser.scss';

interface DevBrowserProps {
  history: History;
  location: Location;
  lrs: LinkReduxLRSType;
}

const specialTopologies = [
  undefined,
  argu.container,
  argu.grid,
  argu.card,
  argu.inline,
];

class DevBrowser extends Component<DevBrowserProps> {
  constructor(props: DevBrowserProps) {
    super(props);

    this.handleChangeIri = this.handleChangeIri.bind(this);
    this.handleChangePure = this.handleChangePure.bind(this);
    this.handleChangeTopology = this.handleChangeTopology.bind(this);
  }

  getPropsFromURL() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);

    const iriFromParam = params.get('iri')?.match(/^[a-z]+:\/\/[a-z]+/);
    const resourceParam = iriFromParam ? params.get('iri') : app.ns('').value;
    const resource = rdf.namedNode(resourceParam);

    const selectedTopology = params.get('topology') ?? '0';
    const pureString = params.get('pure');
    const top = allTopologies[parseInt(selectedTopology, 10)];

    return {
      currentResource: resource,
      currentTopology: top,
      isPure: pureString === 'true',
      selectedTopology,
    };
  }

  setParam(param: string, value?: string) {
    const params = new URLSearchParams(this.props.location.search);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    this.props.history.push(`?${params.toString()}`);
  }

  handleChangeIri(event: ChangeEvent<any>) {
    this.setParam('iri', event.target.value);
  }

  handleChangeTopology(event: ChangeEvent<any>) {
    this.setParam('topology', event.target.value);
  }

  handleChangePure(event: ChangeEvent<any>) {
    this.setParam('pure', event.target.checked.toString());
  }

  render() {
    const {
      currentResource,
      currentTopology,
      isPure,
      selectedTopology,
    } = this.getPropsFromURL();

    const resourcesKeys = Object.keys((this.props.lrs.store as any).store.subjectIndex);

    return (
      <div data-marker="DevBrowser">
        <Helmet title="DevBrowser" />
        <form
          style={{ display: 'flex' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            style={{ flex: '1' }}
            type="url"
            value={currentResource.value}
            onChange={this.handleChangeIri}
          />
          <select
            style={{ maxWidth: '4em' }}
            value={currentResource}
            onBlur={this.handleChangeIri}
            onChange={this.handleChangeIri}
          >
            {resourcesKeys.map((resource) => (
              <option
                key={resource}
                value={resource}
              >
                {resource}
              </option>
            ))}
          </select>
          <select
            value={selectedTopology}
            onBlur={this.handleChangeTopology}
            onChange={this.handleChangeTopology}
          >
            {allTopologies.slice(0).map((topology, i) => (
              <option
                key={(topology === undefined) ? 'default' : topology.value}
                value={i}
              >
                {(topology === undefined) ? 'default' : term(topology)}
              </option>
            ))}
          </select>
          {specialTopologies.map((topology) => (
            <button
              key={(topology === undefined) ? 'default' : term(topology)}
              style={{
                backgroundColor: rdf.equals(currentTopology, topology) ? '#d9d9d9' : 'transparent',
                padding: '0 2px',
              }}
              type="button"
              value={getTopologyNumber(topology)}
              onClick={this.handleChangeTopology}
            >
              {(topology === undefined) ? 'default' : term(topology)}
            </button>
          ))}
          <input
            checked={isPure}
            id="pure"
            name="isGoing"
            type="checkbox"
            onChange={this.handleChangePure}
          />
          <label htmlFor="pure">
            pure
          </label>
        </form>
        <div
          style={{
            position: 'relative',
          }}
        >
          <TopologyWrapper
            pure={isPure}
            subject={currentResource}
            topology={currentTopology}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(withLRS(DevBrowser));
