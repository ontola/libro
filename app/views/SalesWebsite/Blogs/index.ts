import { register } from 'link-redux';

import BlogsContainer from './BlogsContainer';
import BlogsFull from './BlogsFull';

export default [
  ...register(BlogsContainer),
  BlogsFull,
];
