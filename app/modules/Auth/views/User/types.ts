import ontola from '../../../Kernel/ontology/ontola';

export const RegisteredTypes = [ontola.ConfirmedUser, ontola.UnconfirmedUser];
export const ActorTypes = [...RegisteredTypes, ontola.GuestUser];
