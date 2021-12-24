import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../../../themes/themes';

import CreatedAt from './properties/createdAt';
import Email from './properties/email';
import Engagement from './properties/engagement';
import GlappUsedAt from './properties/glappUsedAt';
import Name from './properties/name';
import NewVolunteerContainer from './NewVolunteerContainer';
import VolunteerCardRow from './VolunteerCardRow';
import VolunteerContainer from './VolunteerContainer';
import VolunteerPage from './VolunteerFull';
import Source from './properties/source';
import Telephone from './properties/telephone';

export const useContactOptionStyles = makeStyles<LibroTheme>((theme) => ({
  volunteerContactOption: {
    '& a': {
      '& + a': {
        borderLeft: theme.greyBorder,
      },
      '&:hover': {
        boxShadow: `inset 0 0 0 999px ${theme.palette.transparent.midDark}`,
      },
      display: 'inline-block',
      padding: '.3em',
    },
    border: theme.greyBorder,
    borderRadius: '.5em',
    display: 'inline-block',
    margin: '.1em .2em .1em 0',
  },
  volunteerContactOptions: {
    marginBottom: '1em',
  },
}));

export default [
  Email,
  Engagement,
  CreatedAt,
  GlappUsedAt,
  Name,
  NewVolunteerContainer,
  VolunteerCardRow,
  VolunteerContainer,
  VolunteerPage,
  Source,
  Telephone,
];
