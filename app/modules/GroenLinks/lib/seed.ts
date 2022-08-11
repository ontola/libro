import { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import { quadruple } from '../../Kernel/lib/quadruple';
import teamGL from '../ontology/teamGL';

export const seed: Quadruple[] = [
  quadruple(teamGL.ContactedAction, rdfx.type, rdfs.Class),
  quadruple(teamGL.ContactedAction, rdfs.subClassOf, schema.UpdateAction),

  quadruple(teamGL.SignUpAction, rdfx.type, rdfs.Class),
  quadruple(teamGL.SignUpAction, rdfs.subClassOf, schema.UpdateAction),

  quadruple(teamGL.NewVolunteer, rdfx.type, rdfs.Class),
  quadruple(teamGL.NewVolunteer, rdfs.subClassOf, teamGL.Volunteer),

  quadruple(teamGL.NotAvailableAction, rdfx.type, rdfs.Class),
  quadruple(teamGL.NotAvailableAction, rdfs.subClassOf, schema.UpdateAction),

  quadruple(teamGL.TryAgainAction, rdfx.type, rdfs.Class),
  quadruple(teamGL.TryAgainAction, rdfs.subClassOf, schema.UpdateAction),

  quadruple(teamGL.UnsubscribeAction, rdfx.type, rdfs.Class),
  quadruple(teamGL.UnsubscribeAction, rdfs.subClassOf, schema.UpdateAction),

  quadruple(teamGL.Participant, rdfx.type, rdfs.Class),
  quadruple(teamGL.Participant, rdfs.subClassOf, teamGL.Volunteer),

  quadruple(teamGL.PotentialParticipant, rdfx.type, rdfs.Class),
  quadruple(teamGL.PotentialParticipant, rdfs.subClassOf, teamGL.Participant),

];
