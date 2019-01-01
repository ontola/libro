import LinkedRenderStore, { memoizedNamespace } from 'link-lib';
import { LinkedResourceContainer, Property, RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import rdf from 'rdflib';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { defaultContext } from './utilities';

const exNS = memoizedNamespace('http://example.org/');

const context = (iri, lrs, store) => defaultContext({
  lrs: lrs || true,
  store: store || true,
  subject: iri,
});

function chargeLRS(id, obj, store) {
  const lrs = new LinkedRenderStore();
  lrs.store.addStatements(obj);
  return context(exNS(id), lrs, store);
}

function getSubject(obj, subject) {
  const keys = obj && Object.keys(obj);
  return subject || keys[0];
}

export function toArr(obj) {
  if (typeof obj === 'undefined') {
    return [];
  }
  const statements = [];
  Object.keys(obj).forEach((s) => {
    const resource = obj[s];
    const subject = s.startsWith('_:')
      ? new rdf.BlankNode(s.slice('_:'.length))
      : new rdf.NamedNode(s.slice(1, -1));
    Object.keys(resource).forEach((p) => {
      const object = resource[p];
      const predicate = new rdf.NamedNode(p.slice(1, -1));
      if (Array.isArray(object)) {
        object.forEach(iObject => statements.push(new rdf.Statement(subject, predicate, iObject)));
      } else {
        statements.push(new rdf.Statement(subject, predicate, object));
      }
    });
  });
  return statements;
}

export const generateCtx = (obj, subject = null) => chargeLRS(
  getSubject(obj, subject),
  toArr(obj)
);

export const empty = (id = '0', store = false) => chargeLRS(id, [], store);

/**
 * Calls an LOC with {object} wrapped in the appropriate context and a nice bow.
 * @param {PropTypes.node} children The children to pass into the LOC
 * @param {Object[]} components An array of `LRS.registerRenderer` formatted registrations.
 * @param {rdf.NamedNode} subject The URI of the object to render.
 * @param {rdf.Statement[]} resources Dataset to load into the store (see {toArr}).
 * @param {rdf.NamedNode} topology The topology to pass to the LOC.
 * @return {*} A wrapped LOC component with the appropriate context for testing.
 */
export const loc = ({
  children = undefined,
  components,
  subject,
  resources,
  topology = undefined,
}) => {
  if (typeof resources === 'undefined' && typeof subject === 'undefined') {
    throw new Error('No subject nor resources given');
  }

  const ctx = generateCtx(resources, subject);
  if (Array.isArray(components)) {
    ctx.lrs.registerAll(...components);
  }

  return (
    <Provider store={ctx.store}>
      <RenderStoreProvider value={ctx.lrs}>
        <IntlProvider locale="en">
          <StaticRouter context={{}} location="/current_page">
            <LinkedResourceContainer
              forceRender
              subject={subject}
              topology={topology}
            >
              {children}
            </LinkedResourceContainer>
          </StaticRouter>
        </IntlProvider>
      </RenderStoreProvider>
    </Provider>
  );
};

loc.propTypes = {
  children: PropTypes.node,
  components: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.arrayOf(PropTypes.func),
    properties: PropTypes.arrayOf(rdf.NamedNode),
    topologies: PropTypes.arrayOf(rdf.NamedNode),
    types: PropTypes.arrayOf(rdf.NamedNode),
  })),
  resources: PropTypes.arrayOf(rdf.Statement),
  subject: PropTypes.instanceOf(rdf.NamedNode),
  topology: PropTypes.instanceOf(rdf.NamedNode),
};

/**
 * Calls an Property with `label` {property} wrapped in the appropriate context and a nice bow.
 * @param {rdf.NamedNode} property The iri of the predicate to render.
 * @param {object} props Params passed to {loc}.
 * @see {loc}
 * @return {*} A wrapped Property component with the appropriate context for testing.
 */
export const prop = ({ property, ...props }) => {
  const children = <Property label={property} />;
  return loc({ children, ...props });
};
