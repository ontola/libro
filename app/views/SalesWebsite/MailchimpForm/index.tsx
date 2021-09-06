import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, MailRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../../ontology/ontola';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { allTopologies } from '../../../topologies';
import { mailchimpFormMessages } from '../../../translations/messages';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  emailIcon: {
    color: theme.palette.text.secondary,
    marginRight: '.6rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: '1.125rem',
    fontWeight: theme.typography.fontWeightBold,
  },
  hiddenInput: {
    left: '-5000px',
    position: 'absolute',
  },
  input: {
    backgroundColor: theme.palette.background.default,
  },
  inputRoot: {
    marginBottom: 0,
  },
  inputWrapper: {
    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
  },
  wrapper: {
    backgroundColor: '#F8FBFF',
    borderRadius: theme.shape.borderRadius,
    margin: '-1rem',
    marginBottom: '1rem',
    maxWidth: '25rem',
    padding: '1rem',
  },
}));

const composeHiddenFieldName = (href: string): string => {
  const url = new URL(href);
  const u = url.searchParams.get('u');
  const id = url.searchParams.get('id');

  return `${u}_${id}`;
};

const MailchimpForm: FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [action] = useProperty(ontola.href);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  const hiddenFieldName = composeHiddenFieldName(action.value);

  return (
    <div
      className={classes.wrapper}
      id="mc_embed_signup"
    >
      <form
        noValidate
        action={action.value}
        className={classes.form}
        id="mc-embedded-subscribe-form"
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <label htmlFor="mce-EMAIL">
          <Typography
            className={classes.heading}
            variant="h3"
          >
            {name.value}
          </Typography>
        </label>
        <div className={classes.inputWrapper}>
          <TextField
            required
            InputProps={{
              classes: { root: classes.inputRoot },
              startAdornment: <MailRounded className={classes.emailIcon} />,
            }}
            className={classes.input}
            id="mce-EMAIL"
            name="EMAIL"
            placeholder={intl.formatMessage(mailchimpFormMessages.mailAddress)}
            size="small"
            type="email"
            variant="outlined"
          />
          <div
            aria-hidden="true"
            className={classes.hiddenInput}
          >
            <input
              name={hiddenFieldName}
              tabIndex={-1}
              type="text"
            />
          </div>
          <Button
            aria-label={intl.formatMessage(mailchimpFormMessages.subscribe)}
            color="secondary"
            id="mc-embedded-subscribe"
            name="subscribe"
            type="submit"
            value="Subscribe"
            variant="contained"
          >
            <ChevronRight />
          </Button>
        </div>
        <Typography variant="body1">
          {text.value}
        </Typography>
      </form>
    </div>
  );
};

MailchimpForm.type = sales.MailchimpForm;

MailchimpForm.topology = allTopologies;

export default register(MailchimpForm);
