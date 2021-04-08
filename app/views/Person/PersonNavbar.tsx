import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Link from '../../components/Link';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import NavbarLinkLink from '../../components/NavbarLink/NavbarLinkLink';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import './properties/name';

const useStyles = makeStyles(() => ({
  wrapper: {
    '& a': {
      minWidth: 0,
    },
    height: '100%',
    position: 'relative',
  },
}));

interface PersonNavbarProps {
  image: SomeNode;
}

const PersonNavbar: FC<PersonNavbarProps> = ({ image }) => {
  const classes = useStyles();
  const [menuIri] = useProperty(ontola.profileMenu);

  return (
    <div className={classes.wrapper}>
      <NavbarLinkLink image={image} to={menuIri.value}>
        <NavbarLinkIcon>
          <Property label={schema.image}>
            <Property label={[schema.thumbnail, ontola.imgUrl64x64]} />
          </Property>
        </NavbarLinkIcon>
      </NavbarLinkLink>
      <Resource subject={app.n} topology={navbarTopology}>
        <Link to={`${menuIri.value}#notifications`}>
          <Property label={argu.unreadCount} />
        </Link>
      </Resource>
      <Property label={schema.email} />
    </div>
  );
};

PersonNavbar.type = schema.Person;

PersonNavbar.topology = navbarTopology;

PersonNavbar.mapDataToProps = {
  image: schema.image,
};

export default register(PersonNavbar);
