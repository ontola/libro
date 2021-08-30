import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';

import { components } from '../../components';
import {
  useViewBuilderToolkit,
  withoutLoading,
} from '../../helpers/builder';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { containerTopology } from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { listTopology } from '../../topologies/List';
import { mainBodyTopology } from '../../topologies/MainBody';

interface ThingFullProps {
  renderPartOf: boolean;
}

const ThingFull: FC<ThingFullProps> = ({ renderPartOf }) => {
  const { p, c } = useViewBuilderToolkit();

  return (
    c(components.ResourceBoundary, [
      c(containerTopology, [
        renderPartOf && p(app.parent),
        p(argu.trashedAt),
        p(withoutLoading(ontola.publishAction)),
        c(mainBodyTopology, { 'data-test': 'Thing-thing' }, [
          c(components.PageHeader),
          p(app.thumbnail),
          p(app.contents),
          p(withoutLoading(foaf.isPrimaryTopicOf)),
          c(components.Collection, {
            hideHeader: true,
            pageSize: 1,
            ...withoutLoading(argu.blogPosts),
          }),
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
          p(withoutLoading(meeting.agenda)),
        ]),
      ]),
      c(components.SubSection),
    ])
  );
};

ThingFull.type = schema.Thing;

ThingFull.topology = fullResourceTopology;

export default register(ThingFull);
