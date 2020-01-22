import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { register } from 'link-redux';

import { component } from '../../components';
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
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { defaultMenus } from '../common';

const ThingPage = () => {
  const { p, c } = useViewBuilderToolkit();

  return (
    c(primaryResourceTopology,
      p(withoutLoading(ontola.coverPhoto)),
      c(containerTopology,
        p(schema.isPartOf),
        p(argu.trashedAt),
        c(cardMainTopology,
          { 'data-test': 'Thing-thing' },
          p(schema.superEvent),
          c(detailsBarTopology,
            { right: defaultMenus },
            p(schema.creator),
            p(rdfx.type),
            c(component('LinkedDetailDate')),
            p(argu.pinnedAt),
            p(argu.expiresAt),
            p(argu.followsCount),
            p(argu.motionsCount),
            p(schema.location),
            p(argu.grantedGroups)),
          c(component('Card/CardContent'),
            { noSpacing: true },
            p(app.title),
            p(app.thumbnail),
            p(app.contents),
            p(withoutLoading(foaf.isPrimaryTopicOf))),
          c(cardRowTopology,
            { noBorder: true },
            p(withoutLoading(argu.attachments)),
            p(withoutLoading(meeting.attachments))),
          c(actionsBarTopology,
            p(withoutLoading(ontola.favoriteAction))),
          p(withoutLoading(meeting.agenda)),
          c(cardAppendixTopology,
            p(forceRender(app.omniform)))),
        p(withoutLoading(ontola.publishAction)),
        p(withoutLoading(argu.voteEvents)),
        p(withoutLoading(argu.blogPosts)),
        p(withoutLoading(schema.location)),
        p(withoutLoading(argu.motions))),
      c(containerTopology,
        { size: 'large' },
        p(forceRender(argu.arguments))),
      c(containerTopology,
        p(schema.comment)))
  );
};

ThingPage.type = schema.Thing;

ThingPage.topology = pageTopology;

export default register(ThingPage);
