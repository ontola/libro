import { register } from 'link-redux';

import BlogsFull from './BlogsFull';
import BlogPageShowcase from './BlogPageShowcase';

export default [
  ...register(BlogPageShowcase),
  BlogsFull,
];
