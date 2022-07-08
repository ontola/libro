import ForumContainer from './ForumContainer';
import Forum from './ForumFull';
import ForumPage from './ForumPage';
import ForumTabPane from './ForumTabPane';
import NameParent from './properties/nameParent';

export default [
  ...Forum,
  ...ForumContainer,
  ...ForumPage,
  ...ForumTabPane,
  ...NameParent,
];
