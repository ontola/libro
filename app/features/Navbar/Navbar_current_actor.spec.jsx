import { Literal, NamedNode } from 'rdflib';
import { create } from 'react-test-renderer';

import { NS } from '../../helpers/LinkedRenderStore';
import * as ctx from '../../../tests/link-redux/fixtures';

import components from './Navbar_current_actor';

const subject = new NamedNode('https://argu.dev/c_a');

const resourcesLoggedIn = {
  [subject]: {
    [NS.rdf('type')]: NS.argu('ConfirmedUser'),
    [NS.argu('actorType')]: new Literal('ConfirmedUser'),
    [NS.schema('image')]: new NamedNode('https://argu.dev/media_objects/734'),
    [NS.argu('user')]: new NamedNode('https://argu.dev/u/123'),
    [NS.argu('actor')]: new NamedNode('https://argu.dev/u/123'),
  },
  [new NamedNode('https://argu.dev/u/123')]: {
    [NS.rdf('type')]: NS.schema('Person'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2014-11-30T00:46:48+01:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2017-12-12T11:12:34+01:00')),
    [NS.schema('name')]: new Literal('Maarten van Scharendrecht'),
    [NS.schema('description')]: new Literal("I'm a writer."),
    [NS.schema('email')]: new Literal('maartenvscharendrecht@example.com'),
    [NS.argu('emails')]: new NamedNode('https://argu.dev/email/456'),
    [NS.schema('image')]: new NamedNode('https://argu.dev/media_objects/734'),
    [NS.argu('voteMatches')]: new NamedNode('https://argu.dev/u/123/vote_matches?type=paginated'),
  },
  [new NamedNode('https://argu.dev/media_objects/734')]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2016-06-01T16:36:38+02:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2016-06-01T16:36:38+02:00')),
    [NS.schema('url')]: new NamedNode('https://argu.dev/photos/734/Adventure_Time_thinkinh.jpg'),
    [NS.schema('thumbnail')]: new NamedNode('https://argu-logos.s3.amazonaws.com/photos/734/icon_Adventure_Time_thinkinh.jpg'),
  },
};

const resourcesLoggedOut = {
  [subject]: {
    [NS.rdf('type')]: [
      new NamedNode('http://www.w3.org/ns/iana/media-types/text/n3#Resource'),
      new NamedNode('http://www.w3.org/2007/ont/link#Document'),
      NS.argu('GuestUser'),
      new NamedNode('http://www.w3.org/2007/ont/link#RDFDocument'),
    ],
    [NS.argu('actorType')]: new Literal('GuestUser'),
    [NS.schema('image')]: new NamedNode('https://argu.dev/media_objects/2362'),
    [NS.argu('user')]: new NamedNode('https://argu.dev/sessions/405dd5891cd3e6bb3a0c8fb45ae7cef6'),
    [NS.argu('actor')]: new NamedNode('https://argu.dev/sessions/405dd5891cd3e6bb3a0c8fb45ae7cef6'),
  },
};

function represent(resources, topology) {
  it('renders the correct representation', () => {
    const context = ctx.loc({
      components,
      resources,
      subject,
      topology,
    });
    const tree = create(context);
    expect(tree).toMatchSnapshot();
  });
}

describe('Navbar', () => {
  describe('current_actor', () => {
    describe('logged in', () => {
      represent(resourcesLoggedIn, NS.argu('sidebar'));
    });

    describe('logged out', () => {
      represent(resourcesLoggedOut, NS.argu('sidebar'));
    });
  });
});
