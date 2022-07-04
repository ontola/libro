import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../Kernel/lib/themes';
import { blogMessages } from '../../../translations/messages';

export interface ShareBlogProps {
  url: string;
  title: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
      label: 'Facebook',
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}`,
      icon: 'linkedin-square',
      label: 'LinkedIn',
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}%20%40argu_co`,
      icon: 'twitter-square',
      label: 'Twitter',
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=${encodedURL}`,
      icon: 'envelope',
      label: 'e-mail',
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
            aria-label={shareTarget.label}
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
