import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';

import { components } from '../../components';
import { useViewBuilderToolkit, withoutLoading } from '../../helpers/builder';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { containerTopology } from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { listTopology } from '../../topologies/List';
import { mainBodyTopology } from '../../topologies/MainBody';

const ThingFull: FC = () => {
  const { p, c } = useViewBuilderToolkit();

  return (
    c(components.ResourceBoundary, [
      c(containerTopology, [
        p(argu.trashedAt),
        p(withoutLoading(ontola.publishAction)),
      ]),
      c(mainBodyTopology, { 'data-test': 'Thing-thing' }, [
        c(components.PageHeader),
        p(app.thumbnail),
        p(app.contents),
        p(withoutLoading(foaf.isPrimaryTopicOf)),
        c(listTopology, {
          wrap: true,
        }, [
          p(withoutLoading(argu.attachments)),
          p(meeting.attachment, {
            limit: Infinity,
            onLoad: () => null,
          }),
        ]),
        c(actionsBarTopology, [
          p(withoutLoading(ontola.favoriteAction)),
        ]),
        p(withoutLoading(schema.location)),
        p(argu.blogPosts),
      ]),
      c(components.SubSection),
    ])
  );
};

ThingFull.type = schema.Thing;

ThingFull.topology = fullResourceTopology;

export default register(ThingFull);
