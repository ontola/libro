import rdf from '@ontologies/core';
import { term } from '@rdfdev/iri';
import { useLRS } from 'link-redux';
import React, { ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

import app from '../../ontology/app';
import argu from '../../modules/Argu/ontology/argu';
import { allTopologies, getTopologyNumber } from '../../topologies';

import TopologyWrapper from './TopologyWrapper';

const specialTopologies = [
  undefined,
  argu.container,
  argu.grid,
  argu.card,
  argu.inline,
];

const usePropsFromURL = () => {
  const { search } = useLocation();

  return React.useMemo(() => {
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
  }, [search]);
};

const useSetParam = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  return React.useCallback((param: string, value?: string) => {
    const params = new URLSearchParams(search);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    navigate(`?${params.toString()}`);
  }, [search, navigate]);
};

const DevBrowser = (): JSX.Element => {
  const lrs = useLRS();

  const {
    currentResource,
    currentTopology,
    isPure,
    selectedTopology,
  } = usePropsFromURL();

  const setParam = useSetParam();

  const handleChangeIri = React.useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParam('iri', event.target.value);
  }, [setParam]);

  const handleChangeTopology = React.useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParam('topology', event.target.value);
  }, [setParam]);

  const handleChangePure = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setParam('pure', event.target.checked.toString());
  }, [setParam]);

  const resourcesKeys = Object.keys((lrs.store as any).store.subjectIndex);

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
          onChange={handleChangeIri}
        />
        <select
          style={{ maxWidth: '4em' }}
          value={currentResource}
          onBlur={handleChangeIri}
          onChange={handleChangeIri}
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
          onBlur={handleChangeTopology}
          onChange={handleChangeTopology}
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
            onClick={() => setParam(`${getTopologyNumber(topology)}`)}
          >
            {(topology === undefined) ? 'default' : term(topology)}
          </button>
        ))}
        <input
          checked={isPure}
          id="pure"
          name="isGoing"
          type="checkbox"
          onChange={handleChangePure}
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
};

export default DevBrowser;
