import Motion from 'models/Motion';

export const fetchMotion = (id) => Motion.fetch(id);
export const fetchMotions = () => Motion.index();
