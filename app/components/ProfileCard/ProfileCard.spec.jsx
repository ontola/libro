import React from 'react';
import rdf from 'rdflib';

import { NS } from '../../helpers/LinkedRenderStore';

import ProfileCardConnected, { ProfileCard, propTypes } from './index';

const resource = new rdf.NamedNode('http://example.com/profile/1');
const resources = {

  [resource]: {
    [NS.schema('name')]: new rdf.Literal('Title'),
    [NS.schema('description')]: new rdf.Literal('bio'),
  },
};

describeView('ProfileCard', [], resources, resource, () => {
  set('ch', () => <ProfileCardConnected />);

  describe('with link', () => {
    it('should render', () => {
      expect(subject.find(ProfileCardConnected)).toMatchSnapshot();
      expect(subject.find(marker()));
    });

    it('should display the title', () => {
      expect(subject.find(marker('head', 'name'))).toHaveText('Title');
    });

    it('should display the bio', () => {
      expect(subject.find(marker('bio'))).toHaveText('bio');
    });

    it('should display the footer', () => {
      expect(subject.find(marker('footer'))).toBePresent();
    });
  });

  describe('without link', () => {
    set('ch', () => (
      <ProfileCard
        bio="classic bio"
        name="classic name"
        party="classic party"
      />
    ));


    it('should display the title', () => {
      expect(subject.find(marker('head', 'name'))).toHaveText('classic name');
    });

    it('should display the bio', () => {
      expect(subject.find(marker('bio'))).toHaveText('classic bio');
    });

    it('should display the footer', () => {
      expect(subject.find(marker('footer'))).toBePresent();
    });

    it('should display the party', () => {
      expect(subject.find(marker('head', 'party'))).toHaveText('classic party');
    });
  });
}, { propTypes });
