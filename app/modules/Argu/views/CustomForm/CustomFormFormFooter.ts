import { FC, register } from 'link-redux';

import { formFooterTopology } from '../../../Form/topologies';
import argu from '../../ontology/argu';

const CustomFormFull: FC = () => null;

CustomFormFull.type = argu.CustomForm;

CustomFormFull.topology = formFooterTopology;

export default register(CustomFormFull);
