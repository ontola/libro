import Person from 'models/Person';

export const fetchPerson = id => Person.fetch(id);
export const fetchPersons = () => Person.index();
