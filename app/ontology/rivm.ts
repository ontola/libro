import { createNS } from '@ontologies/core';

const rivm = createNS('https://argu.co/ns/rivm#');

export default {
  ns: rivm,

  /* classes */
  // eslint-disable-next-line sort-keys
  Category: rivm('Category'),
  Employment: rivm('Employment'),
  Incident: rivm('Incident'),
  Intervention: rivm('Intervention'),
  InterventionType: rivm('InterventionType'),
  Measure: rivm('Measure'),
  MeasureType: rivm('MeasureType'),
  Risk: rivm('Risk'),
  Scenario: rivm('Scenario'),

  /* properties */
  additionalIntroductionInformation: rivm('additionalIntroductionInformation'),
  attachmentPublicationDate: rivm('attachmentPublicationDate'),
  businessSectionEmployees: rivm('businessSectionEmployees'),
  categories: rivm('categories'),
  category: rivm('category'),
  contactInfo: rivm('contactInfo'),
  continuous: rivm('continuous'),
  costExplanation: rivm('costExplanation'),
  effectivityResearchMethod: rivm('effectivityResearchMethod'),
  exampleOf: rivm('exampleOf'),
  incidents: rivm('incidents'),
  independent: rivm('independent'),
  interventionEffects: rivm('interventionEffects'),
  interventionGoal: rivm('interventionGoal'),
  interventions: rivm('interventions'),
  managementInvolvement: rivm('managementInvolvement'),
  measureOwner: rivm('measureOwner'),
  measureTypes: rivm('measureTypes'),
  measures: rivm('measures'),
  moreInfo: rivm('moreInfo'),
  natureOfCosts: rivm('natureOfCosts'),
  oneOffCosts: rivm('oneOffCosts'),
  oneOffCostsScore: rivm('oneOffCostsScore'),
  organizationName: rivm('organizationName'),
  phases: rivm('phases'),
  recurringCosts: rivm('recurringCosts'),
  recurringCostsScore: rivm('recurringCostsScore'),
  scenarios: rivm('scenarios'),
  secondOpinionBy: rivm('secondOpinionBy'),
  securityImproved: rivm('securityImproved'),
  securityImprovedScore: rivm('securityImprovedScore'),
  securityImprovementReason: rivm('securityImprovementReason'),
  specificToolsRequired: rivm('specificToolsRequired'),
  targetAudience: rivm('targetAudience'),
  trainingRequired: rivm('trainingRequired'),
};
