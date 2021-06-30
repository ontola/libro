import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import { blogMessages } from '../../translations/messages';

export interface ShareBlogProps {
  url: string;
  title: string;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold,
    gap: '1rem',
    marginTop: '2rem',
  },
  iconContainer: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '.6rem',
  },
}));

export const ShareBlog = ({ url, title }: ShareBlogProps): JSX.Element => {
  const classes = useStyles();

  const encodedURL = encodeURI(url);
  const encodedTitle = encodeURIComponent(title);
  const fbId = document.querySelector("meta[property='fb:app_id']")?.getAttribute('content');
  const shareTargets = [
    {
      href: `https://www.facebook.com/dialog/feed?app_id=${fbId}&display=popup&link=${encodedURL}&redirect_uri=${encodedURL}`,
      icon: 'facebook-square',
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}`,
      icon: 'linkedin-square',
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}%20%40argu_co`,
      icon: 'twitter-square',
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=${encodedURL}`,
      icon: 'envelope',
    },
  ];

  return (
    <div className={classes.container}>
      <span>
        <FormattedMessage {...blogMessages.shareBlog} />
      </span>
      <span className={classes.iconContainer}>
        {shareTargets.map((shareTarget) => (
          <a
            href={shareTarget.href}
            key={shareTarget.icon}
            rel="noreferrer noopener"
            target="_blank"
          >
            <FontAwesome name={shareTarget.icon} />
          </a>
        ))}
      </span>
    </div>
  );
};