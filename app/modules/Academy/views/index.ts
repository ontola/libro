import Book from './Book';
import Chapter from './Chapter';
import MediaObject from './MediaObject';

export default [
  Book,
  ...Chapter,
  ...MediaObject,
];
