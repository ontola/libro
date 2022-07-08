import { register } from 'link-redux';

import BlogPageFull from './BlogPageFull';
import BlogPageShowcase from './BlogPageShowcase';

export default [
  ...register(BlogPageShowcase),
  ...BlogPageFull,
];
