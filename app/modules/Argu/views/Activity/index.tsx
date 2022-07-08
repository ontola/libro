import ActivityContainer from './ActivityContainer';
import ActivityName from './properties/name';
import PublishActivityContainer from './PublishActivityContainer';

export default [
  ...ActivityContainer,
  ...PublishActivityContainer,
  ...ActivityName,
];
