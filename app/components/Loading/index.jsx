import PropTypes from 'prop-types';
import React from 'react';

import './Loading.scss';

import Card, {
  CardContent,
  CardFixed,
  CardMicroRow,
  CardRow,
} from '../../topologies/Card';
import Container from '../../topologies/Container';
import FullResourceTopology from '../../topologies/FullResource';
import TableCell from '../../topologies/TableCell';
import TableRow from '../../topologies/TableRow';
import { Breadcrumb, BreadcrumbsBar } from '../Breadcrumbs';

const LoadingInline = () => <div className="Loading__Paragraph Loading__Paragraph--inline Loading__background" />;

const LoadingParagraph = () => <div className="Loading__Paragraph Loading__background" />;

export const LoadingNavbarLink = () => (
  <div className="LoadingNavbarLink">
    <div className="LoadingNavbarLink__content Loading__background Loading__background--inverse" />
  </div>
);

export const LoadingButton = () => (
  <div className="Loading__Button Loading__background" />
);

export const LoadingCard = () => (
  <Card>
    <CardContent>
      <div className="Loading__Header Loading__background" />
      <LoadingParagraph />
      <LoadingParagraph />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </Card>
);

export const LoadingCardFixed = ({ fill }) => (
  <CardFixed fill={fill}>
    <CardContent>
      <div className="Loading__Header Loading__background" />
      <LoadingParagraph />
      <LoadingParagraph />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </CardFixed>
);

LoadingCardFixed.propTypes = {
  fill: PropTypes.bool,
};

export const LoadingCellRow = () => (
  <TableRow>
    <TableCell elementProps={{ colspan: 100 }}>
      <div className="Loading__CellRow Loading__background" />
    </TableCell>
  </TableRow>
);

export const LoadingPage = () => (
  <FullResourceTopology>
    <Container>
      <BreadcrumbsBar>
        <LoadingParent />
      </BreadcrumbsBar>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingFullResource = () => (
  <FullResourceTopology>
    <Container>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingDetail = () => (
  <div className="Loading__Paragraph Loading__Paragraph--detail Loading__background Detail" />
);

export const LoadingCardFloat = () => (
  <div className="Loading__background Loading__CardFloat" />
);

export const LoadingOpinion = () => (
  <div className="Opinion--icon Loading__background" />
);

export const LoadingParent = () => (
  <Breadcrumb
    label={<div className="Loading__Paragraph Loading__Paragraph--parent Loading__background" />}
  />
);

export const LoadingRow = () => (
  <CardRow>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingSelect = ({ style }) => (
  <div className="Loading__Select" style={style}>
    <LoadingParagraph />
  </div>
);

LoadingSelect.propTypes = {
  style: PropTypes.shape({}),
};

// Like a LoadingRow, but with a backdrop
export const LoadingCardRowAppendix = () => (
  <CardRow backdrop>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingMicroRow = () => (
  <CardMicroRow>
    <div className="Loading__Paragraph Loading__Paragraph--micro-row Loading__background" />
  </CardMicroRow>
);

export const LoadingCoverPhoto = () => (
  <div className="CoverImage__wrapper">
    <div className="CoverImage__child Loading__background" />
  </div>
);

// Requires a wrapper that sets a widget topology
export const LoadingGridCard = () => (
  <CardFixed>
    <CardContent>
      <LoadingGridContent />
    </CardContent>
  </CardFixed>
);

export const LoadingGridContent = () => (
  <React.Fragment>
    <div className="Loading__Header Loading__background" />
    <LoadingParagraph />
    <LoadingParagraph />
  </React.Fragment>
);

/**
 * Full page loader, same JSX/HTML as the one that shows when the app is loading
 *  @see {@link /app/spinner}
 *  @return {void}
 */
export const LoadingFiller = () => (
  <div className="preloader">
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  </div>
);

// We always throw, so the implicit return value is void
export class SuspendedLoader extends React.Component {
  constructor(props) {
    super(props);

    this.resolve = undefined;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  componentWillUnmount() {
    this.resolve();
  }

  // eslint-disable-next-line react/require-render-return
  render() {
    throw this.promise;
  }
}

export default LoadingInline;
