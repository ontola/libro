import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';
import { footerTopology } from '../../../Common/topologies/Footer';

const SPACING = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  image: {
    width: '100%',
  },
  person: {
    '& picture': {
      width: '4.5rem',
    },
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
      <Resource
        className={classNames.image}
        subject={image}
      />
      <ul>
        <li className={classNames.personName}>
          {name.value}
        </li>
        <li>
          <a href={`mailto:${email.value}`}>
            {email.value}
          </a>
        </li>
        <li>
          <a href={`tel:${telephone.value.replace(/\s|-/g, '')}`}>
            {telephone.value}
          </a>
        </li>
      </ul>
    </div>
  );
};

PersonFooter.type = schema.Person;
PersonFooter.topology = footerTopology;

export default register(PersonFooter);
