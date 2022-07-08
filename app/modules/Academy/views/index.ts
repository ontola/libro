import { ViewRegistrations } from '../../../Module';

import Book from './Book';
import Chapter from './Chapter';
import MediaObject from './MediaObject';

const views: ViewRegistrations = [
  ...Book,
  ...Chapter,
  ...MediaObject,
];

export default views;
