import rdf from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { arrayToSeq } from '@rdfdev/collections';
import { Resource, useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';
import { components } from '../../componentsList';
import { forceRender, withoutLoading } from '../../helpers/builder';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import view from '../../ontology/view';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { Page, pageTopology } from '../../topologies/Page';
import { defaultMenus } from '../../views/common';

const QUADS = 0;
const IRI = 1;

function c(t, propsOrChildren, children) {
  const id = rdf.blankNode();
  const data = [
    rdf.quad(id, rdfx.type, view.Component),
    rdf.quad(id, view.component, t),
  ];

  const secondIsChildren = Array.isArray(propsOrChildren);
  const nested = secondIsChildren ? propsOrChildren : children;
  if (!secondIsChildren && typeof propsOrChildren === 'object') {
    data.push(rdf.quad(id, view.props, propsOrChildren));
  }

  if (nested?.length > 0) {
    const [quads, childId] = arrayToSeq(nested.map((child) => child[IRI]));
    data.push(rdf.quad(id, view.children, childId));
    data.push(...quads);
    data.push(...nested.flatMap((child) => child[QUADS]));
  }

  return [
    data,
    id,
  ];
}

function p(prop) {
  const id = rdf.blankNode();

  return [
    [
      rdf.quad(id, rdfx.type, view.Property),
      rdf.quad(id, view.property, prop),
    ],
    id,
  ];
}

const [data, viewIRI] = (
  c(components.ResourceBoundary, [
    c(containerTopology, [
      p(schema.isPartOf),
      p(argu.trashedAt),
      p(withoutLoading(ontola.publishAction)),
      c(cardMainTopology, { 'data-test': 'Thing-thing' }, [
        c(detailsBarTopology, { right: defaultMenus }, [
          p(schema.creator),
          p(rdfx.type),
          c(components.LinkedDetailDate),
          p(argu.pinnedAt),
          p(argu.expiresAt),
          p(argu.followsCount),
          p(argu.motionsCount),
          p(schema.location),
          p(argu.grantedGroups),
        ]),
        c(components.CardCardContent, { noSpacing: true }, [
          p(app.title),
          p(app.thumbnail),
          p(app.contents),
          p(withoutLoading(foaf.isPrimaryTopicOf)),
        ]),
        c(cardRowTopology, { noBorder: true }, [
          p(withoutLoading(argu.attachments)),
          p(withoutLoading(meeting.attachment)),
        ]),
        c(actionsBarTopology, [
          p(withoutLoading(ontola.favoriteAction)),
        ]),
        p(withoutLoading(meeting.agenda)),
        c(cardAppendixTopology, [
          p(forceRender(app.omniform)),
        ]),
      ]),
      p(withoutLoading(argu.voteEvents)),
      p(withoutLoading(argu.blogPosts)),
      p(withoutLoading(schema.location)),
      p(withoutLoading(argu.motions)),
    ]),
    c(containerTopology, { size: 'large' }, [
      p(forceRender(argu.arguments)),
    ]),
    c(containerTopology, [
      p(schema.comment),
    ]),
  ])
);

const Sandbox = () => {
  const lrs = useLRS();
  const hasData = lrs.tryEntity(viewIRI).length > 0;
  if (!hasData) {
    lrs.store.addQuads(data);
    lrs.broadcast();
  }
  useDataInvalidation({ subject: viewIRI });

  return (
    <React.Fragment>
      <h1>Sandbox!</h1>
      {!lrs.shouldLoadResource(viewIRI) && (
        <Page>
          <Resource subject={viewIRI} />
        </Page>
      )}
    </React.Fragment>
  );
};

export default Sandbox;
