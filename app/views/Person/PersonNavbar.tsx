import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Link from '../../components/Link';
import { NavbarLinkIcon, NavbarLinkLink } from '../../components/NavbarLink';
import { NAME_PREDICATES } from '../../helpers/metaData';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';
import { navBarMessages } from '../../translations/messages';

export interface PersonNavbarProps {
  onClick: () => void;
  linkRef: React.Ref<HTMLButtonElement>
}

const useStyles = makeStyles(() => ({
  wrapper: {
    '& a': {
      minWidth: 0,
    },
    height: '100%',
    position: 'relative',
  },
}));

const PersonNavbar: FC<PersonNavbarProps> = ({
  subject,
  linkRef,
  ...navlinkProps
}) => {
  const intl = useIntl();
  const [image] = useGlobalIds(schema.image);
  const [name] = useStrings(NAME_PREDICATES);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <NavbarLinkLink
        image={image}
        ref={linkRef}
        title={intl.formatMessage(navBarMessages.userSettings)}
        {...navlinkProps}
      >
        {image ? (
          <NavbarLinkIcon>
            <Resource subject={image}>
              <Property label={[schema.thumbnail, ontola.imgUrl64x64]} />
            </Resource>
          </NavbarLinkIcon>
        ) : name}
      </NavbarLinkLink>
      <Resource
        subject={app.c_a}
        topology={navbarTopology}
      >
        <Link to={`${subject.value}#notifications`}>
          <Property label={argu.unreadCount} />
        </Link>
      </Resource>
    </div>
  );
};

PersonNavbar.type = schema.Person;

PersonNavbar.topology = navbarTopology;

export default register(PersonNavbar);
