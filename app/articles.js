import Contact from 'static/articles/Contact.md';
import OpenData from 'static/articles/OpenData.md';
import Search from 'static/articles/Search.md';
import VoteMatch from 'static/articles/VoteMatch.md';

export const order = ['OpenData', 'VoteMatch', 'Search', 'Contact'];

export default {
  Contact: {
    text: Contact,
    title: 'Contact',
  },
  OpenData: {
    text: OpenData,
    title: 'Argu Open Data',
  },
  Search: {
    text: Search,
    title: 'Zoeken',
  },
  VoteMatch: {
    text: VoteMatch,
    title: 'Argu Stemwijzer',
  },
};
