import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import argu from '../../../Argu/ontology/argu';
import Container from '../../../Common/topologies/Container';
import { Propositions } from '../../components/Propositions';
import sales from '../../ontology/sales';

const BOTTOM_MARGIN = 35;
const PIPEDRIVE_CARD_TOP_MARGIN = 5;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  addressLine: {
    display: 'block',
  },
  addressLocation: {
    display: 'block',
  },
  container: {
    marginBottom: '7em',
  },
  hidden: {
    display: 'none',
  },
  icon: {
    color: theme.palette.primary.dark,
  },
  iconLink: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.5rem',
  },
  memberCardContainer: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      marginTop: '5em',
    },
  },
  memberContainer: {
    '& img': {
      backgroundColor: theme.palette.background.default,
      clipPath: 'circle(50%)',
      marginLeft: 'calc(var(--container-size) * -1)',
      padding: '3px',
      width: 'calc(200% - var(--container-size))',
    },
    '& picture': {
      width: '33%',
    },
    '& picture:nth-child(even)': {
      'zIndex': 1,
    },
    '--container-size': '40%',
    display: 'flex',
    margin: 'auto',
    width: 'var(--container-size)',
  },
  pipedriveCard: {
    marginTop: theme.spacing(PIPEDRIVE_CARD_TOP_MARGIN),
  },
  propositionContainer: {
    marginBottom: theme.spacing(BOTTOM_MARGIN),
  },
  socials: {
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '2rem',
    gap: '1rem',
  },
}));

const PricingPageFull: FC = () => {
  const classes = useStyles();
  const [streetAddress] = useProperty(sales.streetAddress);
  const [postalCode] = useProperty(sales.postalCode);
  const [locality] = useProperty(sales.locality);
  const [logo] = useProperty(sales.logo);
  const [logoText] = useProperty(sales.logoText);
  const [email] = useProperty(sales.email);
  const [tel] = useProperty(sales.tel);
  const [discordLink] = useProperty(sales.discordLink);
  const [discordText] = useProperty(sales.discordText);
  const [website] = useProperty(sales.website);
  const [websiteUrl] = useProperty(sales.websiteUrl);
  const [form] = useIds(sales.pipedriveForm);

  return (
    <main role="main">
      <Property label={sales.header} />
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          wrap="wrap"
        >
          <Grid
            item
            md={3}
            sm={5}
            xs={11}
          >
            <Typography variant="h2">
              Contactgegevens
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              wrap="nowrap"
            >
              <Grid item>
                <address className="vcard">
                  <Typography className="adr">
                    <span className={`street-address ${classes.addressLine}`}>
                      {streetAddress.value}
                    </span>
                    <span className={classes.addressLine}>
                      <span className="postal-code">
                        {postalCode.value}
                      </span>
                      <span className="locality">
                        {locality.value}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <div className={`org ${classes.hidden}`}>
                      Argu
                    </div>
                    <img
                      alt={logoText.value}
                      className={`photo ${classes.hidden}`}
                      src={logo.value}
                    />
                    <span className={classes.iconLink}>
                      <PhoneIcon className={classes.icon} />
                      <Link
                        className={`tel ${classes.addressLocation}`}
                        href={`tel:${tel.value.replace(/\s/g, '')}`}
                      >
                        {tel.value}
                      </Link>
                    </span>
                    <span className={classes.iconLink}>
                      <EmailIcon className={classes.icon} />
                      <Link
                        className={`email ${classes.addressLocation}`}
                        href={`mailto:${email.value}`}
                      >
                        {email.value}
                      </Link>
                    </span>
                    <span className={classes.iconLink}>
                      <QuestionAnswerIcon className={classes.icon} />
                      <Link
                        className={`note ${classes.addressLocation}`}
                        href={discordLink.value}
                      >
                        {discordText.value}
                      </Link>
                    </span>
                    <Link
                      className={`url ${classes.hidden}`}
                      href={websiteUrl.value}
                    >
                      {website.value}
                    </Link>
                  </Typography>
                </address>
              </Grid>
              <Grid
                item
                classes={{ root: classes.socials }}
              >
                <Property label={argu.socials} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.memberCardContainer}
            sm={5}
            xs={11}
          >
            <div className={classes.memberContainer}>
              <Property label={schema.members} />
            </div>
            <div className={classes.pipedriveCard}>
              <Resource subject={form} />
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.propositionContainer}>
        <Propositions />
      </div>
    </main>
  );
};

PricingPageFull.type = sales.ContactPage;

PricingPageFull.topology = fullResourceTopology;

export default register(PricingPageFull);
