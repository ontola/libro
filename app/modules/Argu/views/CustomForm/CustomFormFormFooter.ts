import { FC, register } from 'link-redux';

import { formFooterTopology } from '../../../Form/topologies/FormFooter';
import argu from '../../ontology/argu';

const CustomFormFull: FC = () => null;

CustomFormFull.type = argu.CustomForm;

CustomFormFull.topology = formFooterTopology;

export default register(CustomFormFull);
