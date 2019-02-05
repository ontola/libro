import React from 'react';

import './Loading.scss';

import Card, {
  CardFixed,
  CardMicroRow,
  CardRow,
  CardContent,
} from '../../topologies/Card';
import Container from '../../topologies/Container';
import PrimaryResource from '../../topologies/PrimaryResource';
import { Breadcrumb, BreadcrumbsBar } from '../Breadcrumbs';

const LoadingInline = () => <div className="Loading__Paragraph Loading__Paragraph--inline Loading__background" />;

export const LoadingNavbarLink = () => (
  <div className="LoadingNavbarLink">
    <div className="LoadingNavbarLink__content Loading__background Loading__background--inverse" />
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
  <CardFixed>
    <CardContent>
      <div className="Loading__Header Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph Loading__background" />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </CardFixed>
);

export const LoadingPage = () => (
  <PrimaryResource>
    <Container>
      <BreadcrumbsBar>
        <LoadingParent />
      </BreadcrumbsBar>
      <LoadingCard />
    </Container>
  </PrimaryResource>
);

export const LoadingDetail = () => (
  <div className="Loading__Paragraph Loading__Paragraph--detail Loading__background" />
);

export const LoadingParent = () => (
  <Breadcrumb
    label={<div className="Loading__Paragraph Loading__Paragraph--parent Loading__background" />}
  />
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
    <div className="Loading__Paragraph Loading__Paragraph--micro-row Loading__background" />
  </CardMicroRow>
);

export default LoadingInline;
