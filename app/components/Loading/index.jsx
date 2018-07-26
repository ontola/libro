import React from 'react';
import FontAwesome from 'react-fontawesome';

import './Loading.scss';

import Card, {
  CardMicroRow,
  CardRow,
  CardContent,
} from '../Card';
import Container from '../Container';
import LDLink from '../LDLink';

const LoadingInline = () => <div className="Loading__Paragraph Loading__Paragraph--inline Loading__background" />;

export const LoadingSideBarLink = () => (
  <div className="LoadingSideBarLink">
    <div className="LoadingSideBarLink__content Loading__background Loading__background--inverse" />
  </div>
);

export const LoadingCard = () => (
  <Card>
    <CardContent>
      <div className="Loading__Header Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </Card>
);

export const LoadingCardFixed = () => (
  <Card fixed>
    <CardContent>
      <div className="Loading__Header Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </Card>
);

export const LoadingPage = () => (
  <Container>
    <LoadingParent />
    <LoadingCard />
  </Container>
);

export const LoadingDetail = () => (
  <div className="Loading__Paragraph Loading__Paragraph--detail Loading__background" />
);

export const LoadingParent = () => (
  <LDLink>
    <div style={{ alignItems: 'center', display: 'flex', padding: '1em 1em 0em 1em' }}>
      <FontAwesome name="arrow-up" style={{ marginRight: '.5em' }} />
      <div className="Loading__Paragraph Loading__background" />
    </div>
  </LDLink>
);

export const LoadingRow = () => (
  <CardRow>
    <CardContent>
      <div className="Loading__Paragraph Loading__background" />
    </CardContent>
  </CardRow>
);

export const LoadingMicroRow = () => (
  <CardMicroRow>
    <div className="Loading__Paragraph Loading__background" />
  </CardMicroRow>
);

export default LoadingInline;
