import ApplyLink from './properties/applyLink';
import ArguLocation from './properties/arguLocation';
import ArguLocationTabPane from './properties/arguLocationTabPane';
import Arguments from './properties/arguments';
import BlogPosts from './properties/blogPosts';
import FollowMenu from './properties/followMenu';
import FollowsCount from './properties/followsCount';
import GrantedGroups from './properties/grantedGroups';
import MapQuestionMainBody from './properties/mapQuestionMainBody';
import MotionsCount from './properties/motionsCount';
import PinnedAt from './properties/pinnedAt';
import Price from './properties/price';
import RedirectUrlTable from './properties/redirectUrlTable';
import TopComment from './properties/topComment';
import VoteEvents from './properties/voteEvents';

export default [
  ApplyLink,
  ArguLocation,
  ArguLocationTabPane,
  ...Arguments,
  BlogPosts,
  FollowMenu,
  FollowsCount,
  ...GrantedGroups,
  MapQuestionMainBody,
  MotionsCount,
  PinnedAt,
  Price,
  RedirectUrlTable,
  TopComment,
  VoteEvents,
];
