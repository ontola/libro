import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';

import { components } from '../../../../components';
import meeting from '../../../../ontology/meeting';
import { actionsBarTopology } from '../../../Action/topologies/ActionsBar';
import argu from '../../../Argu/lib/argu';
import component from '../../../Core/lib/component';
import app from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import { property, withoutLoading } from '../../lib/properties';
import { fullResourceTopology } from '../../topologies/FullResource';
import { mainBodyTopology } from '../../topologies/MainBody';

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
        p(withoutLoading([argu.attachments, meeting.attachment])),
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
