import rdf, { createNS } from '@ontologies/core';
import LinkedRenderStore from 'link-lib';
import {
  Property,
  RenderStoreProvider,
  Resource,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { getWebsiteContextFromWebsite } from '../../app/helpers/app';
import { WebsiteContext } from '../../app/location';

import { defaultContext } from './utilities';

const exNS = createNS('http://example.org/');

const context = (iri, lrs, store) => defaultContext({
  lrs: lrs || true,
  store: store || true,
  subject: iri,
});

async function chargeLRS(id, obj, store) {
  const lrs = new LinkedRenderStore({
    // eslint-disable-next-line no-console
    report: console.error,
  });
  await lrs.processDelta(obj, true);
  lrs.store.flush();

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
  if (Object.prototype.hasOwnProperty.call(obj, 'quads')) {
    return obj.quads;
  }
  const statements = [];
  Object.keys(obj).forEach((s) => {
    const resource = obj[s];
    const subject = s.startsWith('_:')
      ? rdf.blankNode(s.slice('_:'.length))
      : rdf.namedNode(s.slice(1, -1));
    Object.keys(resource).forEach((p) => {
      const object = resource[p];
      const predicate = rdf.namedNode(p.slice(1, -1));
      if (Array.isArray(object)) {
        object.forEach((iObject) => statements.push(rdf.quad(subject, predicate, iObject)));
      } else {
        statements.push(rdf.quad(subject, predicate, object));
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
export const loc = async ({
  children = undefined,
  components,
  subject,
  resources,
  topology = undefined,
}) => {
  if (typeof resources === 'undefined' && typeof subject === 'undefined') {
    throw new Error('No subject nor resources given');
  }

  const ctx = await generateCtx(resources, subject);
  if (Array.isArray(components)) {
    ctx.lrs.registerAll(...components);
  }
  const websiteCtxValue = getWebsiteContextFromWebsite('https://example.com/');

  return (
    <Provider store={ctx.store}>
      <WebsiteContext.Provider value={websiteCtxValue}>
        <HelmetProvider context={{}}>
          <RenderStoreProvider value={ctx.lrs}>
            <IntlProvider locale="en">
              <StaticRouter context={{}} location="/current_page">
                <Resource
                  forceRender
                  subject={subject}
                  topology={topology}
                >
                  {children}
                </Resource>
              </StaticRouter>
            </IntlProvider>
          </RenderStoreProvider>
        </HelmetProvider>
      </WebsiteContext.Provider>
    </Provider>
  );
};

loc.propTypes = {
  children: PropTypes.node,
  components: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.arrayOf(PropTypes.func),
    properties: PropTypes.arrayOf(PropTypes.instanceOf(rdf.NamedNode)),
    topologies: PropTypes.arrayOf(PropTypes.instanceOf(rdf.NamedNode)),
    types: PropTypes.arrayOf(PropTypes.instanceOf(rdf.NamedNode)),
  })),
  resources: PropTypes.arrayOf(PropTypes.instanceOf(rdf.Statement)),
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
export const prop = async ({ property, ...props }) => {
  const children = <Property label={property} />;

  return await loc({
    children,
    ...props,
  });
};
