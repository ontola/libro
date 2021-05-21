import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { footerTopology } from '../../topologies/Footer';
import { LibroTheme } from '../../themes/themes';

const SPACING = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  person: {
    '&:last-of-type': {
      marginBottom: '0px',
    },

    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
    marginBottom: theme.spacing(SPACING),
  },
  personName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const PersonFooter: FC = () => {
  const classNames = useStyles();
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const [email] = useProperty(schema.email);
  const [telephone] = useProperty(schema.telephone);

  return (
    <div className={classNames.person}>
      <Resource subject={image} />
      <ul>
        <li className={classNames.personName}>{name.value}</li>
        <li>
          <a href={`mailto:${email.value}`}>{email.value}</a>
        </li>
        <li>{telephone.value}</li>
      </ul>
    </div>
  );
};

PersonFooter.type = schema.Person;
PersonFooter.topology = footerTopology;

export default register(PersonFooter);
