import React, { PropTypes } from 'react';

import {
  Cover,
  Container,
  Heading,
  LinkList,
} from 'components';

const defaultLinks = [{
  label: 'Dashboard',
  to: '/',
}, {
  label: 'Partijen',
  to: '/parties',
}, {
  label: 'Kamerleden',
  to: '/politicians',
}, {
  label: 'Moties',
  to: '/motions',
}];

const propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })).isRequired,
  overlayColor: PropTypes.string.isRequired,
};

const defaultProps = {
  overlayColor: 'rgb(71, 86, 104)',
  links: defaultLinks,
  title: 'Tweede Kamer',
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
