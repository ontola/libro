import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';

import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../topologies/FullResource';

const PIPEDRIVE_FORM_URL = 'https://pipedrivewebforms.com/form/b71321e1b145fce798bb512eceadbd02918860';
const PIPEDRIVE_SCRIPT_URL = 'https://cdn.eu-central-1.pipedriveassets.com/web-form-assets/webforms.min.js';

const useStyles = makeStyles((theme) => ({
  bg: {
    height: 'auto',
    width: '100vw',
  },
  cardContent: {
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto auto',
    maxWidth: theme.containerWidth.large,
    zIndex: '1',
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
    height: '36rem',
    overflow: 'hidden',
    width: '100%',
  },
  left: {
    flex: 1,
    flexBasis: '20rem',
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

const Person = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.person} href={`mailto:${props.email}`}>
      <img alt="" src={props.image} />
      <div className={classes.personProps}>
        <div className={classes.personName}>
          {props.name}
        </div>
        <div className={classes.personTask}>
          {props.task}
        </div>
        <a className={classes.personLink} href={`mailto:${props.email}`}>
          {props.email}
        </a>
        <a className={classes.personLink} href={`tel:${props.phone}`}>
          {props.phone}
        </a>
      </div>
    </div>
  );
};

const personPropTypes = {
  email: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  task: PropTypes.string,
};

Person.propTypes = personPropTypes;

const socials = [
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

const Social = (props) => {
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

const socialPropTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
};

Social.propTypes = socialPropTypes;

const ContactPage = () => {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = PIPEDRIVE_SCRIPT_URL;

    const div = document.createElement('div');
    div.setAttribute('data-pd-webforms', PIPEDRIVE_FORM_URL);
    div.appendChild(script);
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  return (
    <React.Fragment>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <h1>Neem contact op</h1>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.left}>
          <iframe
            className={classes.iframe}
            scrolling="no"
            src={PIPEDRIVE_FORM_URL}
            title="pipedrive"
          />
        </div>
        <div className={classes.right}>
          <Paper elevation={3}>
            <div className={classes.cardContent}>
              {
                persons.map((contactprops) => <Person {...contactprops} />)
              }
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
              <b>Volg ons op:</b>
              {
                socials.map((socialprops) => <Social {...socialprops} />)
              }
            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

ContactPage.type = argu.ContactPage;

ContactPage.topology = fullResourceTopology;

export default register(ContactPage);
