// @flow
import React from 'react';
import { Box, Container, Heading, VoteButtons } from 'components';

const motionTitles = [
  'Burgerparticipatie zonder bureaucratisering',
  'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
  'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
  'De totstandkoming van drinkwatertarieven',
  'Zelfcensuur als direct gevolg van bedreigingen',
  'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat van de eindtoets',
  'Het weigeren van leerlingen vanwege een dubbel advies',
  'Een verbod op islamitisch thuisonderwijs',
];

const UserMotions = () => (
  <Container>
    {motionTitles.map(title => (
      <Box>
        <Heading size="3">{title}</Heading>
        <VoteButtons id="13" />
      </Box>
    ))}
  </Container>
);

export default UserMotions;
