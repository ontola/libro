import { makeStyles } from '@material-ui/styles';
import { register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { PipedriveForm } from '../../components/PipedriveForm';
import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Card from '../../topologies/Card';
import { fullResourceTopology } from '../../topologies/FullResource';

interface PersonProps {
  email: string;
  image: string;
  name: string;
  phone: string;
  task: string;
}

interface SocialProps {
  color: string;
  icon: string;
  link: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  bg: {
    height: 'auto',
    width: '100vw',
  },
  cardContent: {
    padding: '2rem',
  },
  contactPaper: {
    height: '34rem',
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto auto',
    maxWidth: theme.containerWidth.large,
    zIndex: 1,
  },
  header: {
    '& h1': {
      fontSize: '2rem',
      marginLeft: '1rem',
    },
    alignItems: 'flex-end',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    height: '11rem',
    marginTop: '-1.5rem',
  },
  headerContainer: {
    fontFamily: theme.typography.fontFamily,
    marginBottom: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.containerWidth.large,
  },
  iframe: {
    overflow: 'hidden',
    width: '100%',
  },
  left: {
    flex: 1,
    flexBasis: '20rem',
    marginLeft: '1rem',
    marginTop: '2rem',
  },
  person: {
    '& img': {
      borderRadius: '999px',
      height: '5rem',
    },
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2rem',
  },
  personLink: {
    '&:hover': {
      color: 'black',
    },
    color: '#888888',
    display: 'block',
  },
  personName: {
    fontWeight: 'bold',
  },
  personProps: {
    paddingLeft: '.5rem',
  },
  right: {
    flex: 1,
    flexBasis: '20rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '2rem',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  social: {
    '&:hover': {
      color: 'black',
    },
    fontSize: '2rem',
    padding: '.4rem',
  },
  title: {
    fontSize: '3rem',
  },
}));

const persons = [
  {
    email: 'joep@argu.co',
    image: 'https://argu.co/argu/media_objects/29531/content/avatar',
    name: 'Joep Meindertsma',
    phone: '+31636020942',
    task: 'Algemene zaken',
  },
  {
    email: 'michiel@argu.co',
    image: 'https://argu.co/argu/media_objects/828/content/avatar',
    name: 'Michiel van den Ingh',
    phone: '+31653962242',
    task: 'Sales / Participatie',
  },
];

const Person = (props: PersonProps) => {
  const classes = useStyles();

  return (
    <a
      className={classes.person}
      href={`mailto:${props.email}`}
    >
      <img
        alt=""
        src={props.image}
      />
      <div className={classes.personProps}>
        <div className={classes.personName}>
          {props.name}
        </div>
        <div className={classes.personTask}>
          {props.task}
        </div>
        <a
          className={classes.personLink}
          href={`mailto:${props.email}`}
        >
          {props.email}
        </a>
        <a
          className={classes.personLink}
          href={`tel:${props.phone}`}
        >
          {props.phone}
        </a>
      </div>
    </a>
  );
};

export const socials = [
  {
    color: '7289DA',
    icon: 'discord',
    link: 'https://discord.gg/zMxyYNN',
  },
  {
    color: '#0084b4',
    icon: 'twitter',
    link: 'https://twitter.com/argu_co',
  },
  {
    color: '#3b5998',
    icon: 'facebook',
    link: 'https://www.facebook.com/argu.co/',
  },
  {
    color: '#0077b5',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/company/argu/',
  },
];

const Social = (props: SocialProps) => {
  const classes = useStyles();

  return (
    <a
      className={classes.social}
      href={props.link}
      style={{ color: props.color }}
      title={props.icon}
    >
      <FontAwesome
        name={props.icon}
      />
    </a>
  );
};

const ContactPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <h1>
            Neem contact op
          </h1>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.left}>
          <Card className={classes.contactPaper}>
            <PipedriveForm />
          </Card>
        </div>
        <div className={classes.right}>
          <Card>
            <div className={classes.cardContent}>
              {persons.map((contactprops) => (
                <Person
                  key={contactprops.name}
                  {...contactprops}
                />
              ))}
              <div>
                <b>
                  {'Chat met ons team op '}
                  <a
                    href="https://discord.gg/zMxyYNN"
                    style={{ color: '#7289DA' }}
                  >
                    Discord
                  </a>
                </b>
              </div>
              <b>
                Volg ons op:
              </b>
              {socials.map((socialprops) => (
                <Social
                  key={socialprops.link}
                  {...socialprops}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

ContactPage.type = argu.ContactPage;

ContactPage.topology = fullResourceTopology;

export default register(ContactPage);
