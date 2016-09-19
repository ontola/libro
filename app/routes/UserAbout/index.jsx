import React from 'react';

import {
  CardContent,
  CardRow,
  Container,
  LabelValue,
  Widget,
} from 'components';

const profileLinks = [{
  to: 'http://www.d66.nl',
  label: 'Website',
  value: 'www.d66.nl',
}, {
  to: 'http://www.d66.nl/standpunten',
  label: 'Standpunten',
  value: 'www.d66.nl/standpunten',
}, {
  to: 'https://nl.wikipedia.org/wiki/Democraten_66',
  label: 'Wikipedia',
  value: 'nl.wikipedia.org/wiki/Democraten_66',
}, {
  to: 'http://www.twitter.com/d66',
  label: 'Twitter',
  value: 'www.twitter.com/d66',
}];

const UserAbout = () => (
  <Container>
    <Widget title="Bio">
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>Bron: Wikipedia</p>
      </CardContent>
    </Widget>

    <Widget title="Links">
      {profileLinks.map(link => (
        <a key={link.value} href={link.to} target="_blank">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label={link.value} value={link.label} />
            </CardContent>
          </CardRow>
        </a>
      ))}
    </Widget>
  </Container>
);

export default UserAbout;
