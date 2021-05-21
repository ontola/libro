import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import { LibroTheme } from '../../themes/themes';

const useStyles = makeStyles<LibroTheme>({
  footer: {
    '& a:hover': {
      textDecoration: 'underline',
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'space-between',
    margin: 'auto',
    marginBottom: '2rem',
    padding: '20px',
    width: 'min(100%, 1500px)',
  },
});

const Footer: FC = () => {
  const classNames = useStyles();
  const [members] = useProperty(argu.columns);
  const [lowerSection] = useProperty(argu.lowerSection);
  const menuItems = useResourceProperty(members as Node, rdfs.member);

  return (
    <footer className={classNames.footer}>
      {menuItems?.map((item) => (
        <Resource key={item.value} subject={item} />
      ))}
      <Resource subject={lowerSection} />
    </footer>
  );
};

Footer.type = argu.Footer;

Footer.topology = allTopologies;

export default register(Footer);
