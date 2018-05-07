import CreateAction from './CreateAction';
import CreateVote from './CreateVote';
import OmniformFieldset from './properties/omniformFieldset';

export default [
  ...CreateAction,
  CreateVote,
  ...OmniformFieldset
];
