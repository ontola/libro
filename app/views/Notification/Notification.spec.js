import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';
import { navbarTopology } from '../../topologies/Navbar';
import ReadActionCard from '../Action/ReadActionCard';

import components from './index';

const resource = new NamedNode('https://argu.dev/n/35464');
const readResource = new NamedNode('https://argu.dev/n/19314');

const resources = {
  [readResource]: {
    [NS.rdf('type')]: NS.argu('Notification'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2017-10-11T17:21:28+02:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2017-11-17T11:34:21+01:00')),
    [NS.schema('name')]: new Literal('Joep Meindertsma heeft een idee geplaatst in Argu Intern'),
    [NS.schema('target')]: new NamedNode('https://argu.dev/m/2601'),
    [NS.argu('unread')]: Literal.fromBoolean(false),
    [NS.hydra('operation')]: new NamedNode('https://argu.dev/n/19314/actions/read'),
    [NS.ontola('readAction')]: new NamedNode('https://argu.dev/n/19314/actions/read'),
    [NS.schema('creator')]: new NamedNode('https://argu.dev/u/1'),
  },
  [resource]: {
    [NS.rdf('type')]: NS.argu('Notification'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2017-10-11T17:21:28+02:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2017-11-17T11:34:21+01:00')),
    [NS.schema('name')]: new Literal('Joep Meindertsma heeft een idee geplaatst in Argu Intern'),
    [NS.schema('target')]: new NamedNode('https://argu.dev/m/2601'),
    [NS.argu('unread')]: Literal.fromBoolean(true),
    [NS.hydra('operation')]: new NamedNode('https://argu.dev/n/35464/actions/read'),
    [NS.ontola('readAction')]: new NamedNode('https://argu.dev/n/35464/actions/read'),
    [NS.schema('creator')]: new NamedNode('https://argu.dev/u/1'),
  },
  [new NamedNode('https://argu.dev/u/1')]: {
    [NS.rdf('type')]: NS.schema('Person'),
    [NS.schema('name')]: new Literal('Joep Meindertsma'),
    [NS.schema('image')]: new NamedNode('https://argu.dev/media_objects/825'),
  },
  [new NamedNode('https://argu.dev/media_objects/825')]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2016-06-01T16:50:02+02:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2016-06-01T16:50:02+02:00')),
    [NS.schema('url')]: new NamedNode('https://argu.dev/photos/825/profielfoto_Joep_Meindertsma.jpg'),
    [NS.schema('thumbnail')]: new NamedNode('https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg'),
  },
  [new NamedNode('https://argu.dev/n/35464/actions/read')]: {
    [NS.rdf('type')]: NS.schema('ReadAction'),
    [NS.schema('target')]: new NamedNode('https://argu.dev/n/35464/actions/read#EntryPoint'),
    [NS.schema('text')]: new Literal(''),
    [NS.schema('actionStatus')]: NS.schema('PotentialActionStatus'),
    [NS.schema('name')]: new Literal('Markeer als gelezen'),
    [NS.schema('result')]: NS.argu('Notification'),
    [NS.schema('object')]: resource,
    [NS.schema('isPartOf')]: resource,
  },
};

describeView('Notification', [...components, ReadActionCard], resources, resource, () => {
  as(NS.argu('container'), () => {
    set('topology', () => NS.argu('container'));

    it('renders', () => {
      expect(subject.find(marker('notification'))).toExist();
    });

    describe('when unread', () => {
      it('has an unread marker', () => {
        expect(subject.find(marker('ReadAction'))).toExist();
      });
    });

    describe('when read', () => {
      set('s', () => readResource);

      it('has no unread marker', () => {
        expect(subject.find(marker('ReadAction'))).not.toExist();
      });
    });
  });

  as(navbarTopology, () => {
    it('renders its url', () => {
      expect(subject.find(marker('url'))).toExist();
    });
  });
});
