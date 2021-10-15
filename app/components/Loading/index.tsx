import Tab from '@material-ui/core/Tab';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import './Loading.scss';

import Card, {
  CardFixed,
  CardMicroRow,
  CardRow,
} from '../../topologies/Card';
import Container from '../../topologies/Container';
import FullResourceTopology from '../../topologies/FullResource';
import TableCell from '../../topologies/TableCell';
import TableRow from '../../topologies/TableRow';
import { Breadcrumb, BreadcrumbsBar } from '../Breadcrumbs';
import CardContent from '../Card/CardContent';

const LoadingInline = (): JSX.Element => <div className="Loading__Paragraph Loading__Paragraph--inline Loading__background" />;

const LoadingParagraph = () => <div className="Loading__Paragraph Loading__background" />;

export const LoadingNavbarLink = (): JSX.Element => (
  <div className="LoadingNavbarLink">
    <div className="LoadingNavbarLink__content Loading__background Loading__background--inverse" />
  </div>
);

export const LoadingButton = (): JSX.Element => (
  <div className="Loading__Button Loading__background" />
);

export const LoadingTabbar = ({
  subject,
}: SubjectProp): JSX.Element => (
  <Tab
    icon={(
      <FontAwesome
        spin
        name="spinner"
      />
    )}
    key={subject.value}
  />
);

export const LoadingCard = (): JSX.Element => (
  <Card>
    <CardContent>
      <div
        className="Loading__Header Loading__background"
        data-testid="loading-card"
      />
      <LoadingParagraph />
      <LoadingParagraph />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </Card>
);

export interface LoadingCardFixedProps {
  fill?: boolean;
}

export const LoadingCardFixed = ({ fill }: LoadingCardFixedProps): JSX.Element => (
  <CardFixed fill={fill}>
    <CardContent>
      <div
        className="Loading__Header Loading__background"
        style={{ minWidth: '18em' }}
      />
      <LoadingParagraph />
      <LoadingParagraph />
      <div className="Loading__Paragraph--shorter Loading__background" />
    </CardContent>
  </CardFixed>
);

export const LoadingCellRow = (): JSX.Element => (
  <TableRow>
    <TableCell colspan={100}>
      <div className="Loading__CellRow Loading__background" />
    </TableCell>
  </TableRow>
);

export const LoadingPage = (): JSX.Element => (
  <FullResourceTopology>
    <Container>
      <BreadcrumbsBar>
        <LoadingParent />
      </BreadcrumbsBar>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingFullResource = (): JSX.Element => (
  <FullResourceTopology>
    <Container>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingDetail = (): JSX.Element => (
  <div className="Loading__Paragraph Loading__Paragraph--detail Loading__background Detail" />
);

export const LoadingCardFloat = (): JSX.Element => (
  <div className="Loading__background Loading__CardFloat" />
);

export const LoadingOpinion = (): JSX.Element => (
  <div className="Opinion--icon Loading__background" />
);

export const LoadingParent = (): JSX.Element => (
  <Breadcrumb
    label={<div className="Loading__Paragraph Loading__Paragraph--parent Loading__background" />}
  />
);

export const LoadingRow = (): JSX.Element => (
  <CardRow>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingSelect: React.FC<{ style: any }> = ({ style }) => (
  <div
    className="Loading__Select"
    style={style}
  >
    <LoadingParagraph />
  </div>
);

// Like a LoadingRow, but with a backdrop
export const LoadingCardRowAppendix = (): JSX.Element => (
  <CardRow backdrop>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingMicroRow = (): JSX.Element => (
  <CardMicroRow>
    <div className="Loading__Paragraph Loading__Paragraph--micro-row Loading__background" />
  </CardMicroRow>
);

export const LoadingCoverPhoto = (): JSX.Element => (
  <div className="CoverImage__wrapper">
    <div className="CoverImage__child Loading__background" />
  </div>
);

// Requires a wrapper that sets a widget topology
export const LoadingGridCard = (): JSX.Element => (
  <CardFixed>
    <CardContent>
      <LoadingGridContent />
    </CardContent>
  </CardFixed>
);

export const LoadingGridContent = (): JSX.Element => (
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
export const LoadingFiller = (): JSX.Element => (
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

export default LoadingInline;
