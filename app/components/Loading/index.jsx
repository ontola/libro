import React from 'react';

import './Loading.scss';

import {
  Card,
  CardRow,
  CardContent,
} from '../../components';

const LoadingText = () => <span>Loading...</span>;

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

export const LoadingRow = () => (
  <CardRow>
    <CardContent>
      <div className="Loading__Paragraph Loading__background" />
    </CardContent>
  </CardRow>
);

export default LoadingText;
