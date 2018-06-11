import NodeShape from './NodeShape';
import Label from './properties/label';
import Property from './properties/property';
import SHACLClass from './properties/SHACLClass';
import PropertyShape from './PropertyShape';
import PropertyGroup from './PropertyGroup';

export default [
  Label,
  NodeShape,
  Property,
  SHACLClass,
  ...PropertyShape,
  PropertyGroup,
];
