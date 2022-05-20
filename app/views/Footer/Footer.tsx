import { makeStyles } from '@mui/styles';
import {
  FC,
  Resource,
  array,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import HeadingContext from '../../components/Heading/HeadingContext';
import argu from '../../ontology/argu';
import { BreakPoints, LibroTheme } from '../../themes/themes';
import { allTopologies } from '../../topologies';

const DESKTOP_PADDING = 30;
const MOBILE_PADDING = 10;

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
    padding: theme.spacing(DESKTOP_PADDING),
    width: 'min(100%, 1500px)',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      padding: theme.spacing(MOBILE_PADDING),
    },
  },
}));

const Footer: FC = () => {
  const classNames = useStyles();
  const [lowerSection] = useProperty(argu.lowerSection);
  const menuItems = useIds(array(argu.columns));

  return (
    <HeadingContext overrideStartLevel={2}>
      <footer
        className={classNames.footer}
        role="contentinfo"
      >
        {menuItems.map((item) => (
          <Resource
            key={item.value}
            subject={item}
          />
        ))}
        <Resource subject={lowerSection} />
      </footer>
    </HeadingContext>
  );
};

Footer.type = argu.Footer;

Footer.topology = allTopologies;

export default register(Footer);
