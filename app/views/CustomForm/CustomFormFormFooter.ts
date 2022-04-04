import { FC, register } from 'link-redux';

import argu from '../../ontology/argu';
import { formFooterTopology } from '../../topologies';

const CustomFormFull: FC = () => null;

CustomFormFull.type = argu.CustomForm;

CustomFormFull.topology = formFooterTopology;

export default register(CustomFormFull);
