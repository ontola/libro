import rdf from '@ontologies/core';
import { term } from '@rdfdev/iri';
import { lrsType, withLinkCtx } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { withRouter } from 'react-router-dom';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies, getTopologyNumber } from '../../topologies';

import TopologyWrapper from './TopologyWrapper';
import './DevBrowser.scss';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  lrs: lrsType,
};

const specialTopologies = [
  undefined,
  NS.argu('container'),
  NS.argu('grid'),
  NS.argu('card'),
  NS.argu('inline'),
];

class DevBrowser extends Component {
  constructor(props) {
    super(props);

    this.handleChangeIri = this.handleChangeIri.bind(this);
    this.handleChangePure = this.handleChangePure.bind(this);
    this.handleChangeTopology = this.handleChangeTopology.bind(this);
  }

  getPropsFromURL() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);

    const resourceParam = params.get('iri').match(/^[a-z]+:\/\/[a-z]+/) ? params.get('iri') : NS.app('').value;
    const resource = rdf.namedNode(resourceParam);

    const selectedTopology = params.get('topology') || 0;
    const pureString = params.get('pure');
    const top = allTopologies[parseInt(selectedTopology, 10)];

    return {
      currentResource: resource,
      currentTopology: top,
      isPure: pureString === 'true',
      selectedTopology,
    };
  }

  setParam(param, value) {
    const params = new URLSearchParams(this.props.location.search);
    params.set(param, value);
    this.props.history.push(`?${params.toString()}`);
  }

  handleChangeIri(event) {
    this.setParam('iri', event.target.value);
  }

  handleChangeTopology(event) {
    this.setParam('topology', event.target.value);
  }

  handleChangePure(event) {
    this.setParam('pure', event.target.checked);
  }

  render() {
    const {
      currentResource,
      currentTopology,
      isPure,
      selectedTopology,
    } = this.getPropsFromURL();

    const resourcesKeys = Object.keys(this.props.lrs.store.store.subjectIndex);

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
                key={(topology === undefined) ? 'default' : topology}
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

DevBrowser.propTypes = propTypes;

export default withRouter(withLinkCtx(DevBrowser));
