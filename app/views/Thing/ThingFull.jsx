import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { register } from 'link-redux';
import PropTypes from 'prop-types';

import { components } from '../../components';
import {
  forceRender,
  useViewBuilderToolkit,
  withoutLoading,
} from '../../helpers/builder';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';
import { defaultMenus } from '../common';

const ThingFull = ({ renderPartOf }) => {
  const { p, c } = useViewBuilderToolkit();

  return (
    c(components.ResourceBoundary, [
      c(containerTopology, [
        renderPartOf && p([schema.isPartOf, schema.superEvent]),
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
            p({
              label: meeting.attachment,
              limit: Infinity,
              onLoad: () => null,
            }),
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
        c(components.Collection, {
          pageSize: 1,
          ...withoutLoading(argu.blogPosts),
        }),
        p(withoutLoading(schema.location)),
        p(withoutLoading(argu.motions)),
      ]),
      c(containerTopology, { size: 'large' }, [
        p(forceRender(argu.arguments)),
      ]),
      c(containerTopology, [
        p({
          label: schema.comment,
          renderWhenEmpty: true,
        }),
      ]),
    ])
  );
};

ThingFull.type = schema.Thing;

ThingFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

ThingFull.propTypes = {
  renderPartOf: PropTypes.bool,
};

export default register(ThingFull);
