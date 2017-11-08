import React, { PropTypes } from 'react';

import path from 'helpers/paths';

import Cover from '../Cover';
import Container from '../Container';
import Heading from '../Heading';
import LinkList from '../LinkList';

const defaultLinks = [{
  label: 'Overzicht',
  to: path.index(),
}, {
  label: 'Partijen',
  to: path.partiesIndex(),
}, {
  label: 'Kamerleden',
  to: path.politiciansIndex(),
}, {
  label: 'Moties',
  to: path.motionsIndex(),
}];

const propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
  overlayColor: PropTypes.string,
};

const defaultProps = {
  overlayColor: 'rgb(71, 86, 104)',
  links: defaultLinks,
};

const Header = ({
  title,
  links,
  overlayColor,
}) => (
  <div>
    <Cover image="/static/cover-home.jpg" overlayColor={overlayColor}>
      <Container spacing="medium">
        <Heading size="2" variant="light">{title}</Heading>
      </Container>
    </Cover>

    <Cover type="lighter">
      <Container>
        <LinkList links={links} fullWidth />
      </Container>
    </Cover>
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
