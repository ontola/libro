import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';

import { components } from '../../components';
import {
  property,
  withoutLoading,
} from '../../helpers/properties';
import component from '../../helpers/component';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import {
  actionsBarTopology,
  fullResourceTopology,
  listTopology,
  mainBodyTopology,
} from '../../topologies';

const ThingFull: FC = () => {
  const lrs = useLRS();
  const c = component();
  const p = property(lrs);

  return (
    c(components.ResourceBoundary, [
      c(mainBodyTopology, { 'data-test': 'Thing-thing' }, [
        p(argu.trashedAt),
        p(withoutLoading(ontola.publishAction)),
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
        p(withoutLoading([argu.mapQuestion, schema.location])),
        p(argu.blogPosts),
      ]),
      c(components.SubSection),
    ])
  );
};

ThingFull.type = schema.Thing;

ThingFull.topology = fullResourceTopology;

export default register(ThingFull);
