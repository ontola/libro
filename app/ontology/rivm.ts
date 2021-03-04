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
    businessSectionEmployees: rivm('businessSectionEmployees'),
    category: rivm('category'),
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
    measureTypes: rivm('measureTypes'),
    measures: rivm('measures'),
    natureOfCosts: rivm('natureOfCosts'),
    oneOffCosts: rivm('oneOffCosts'),
    oneOffCostsScore: rivm('oneOffCostsScore'),
    organizationName: rivm('organizationName'),
    recurringCosts: rivm('recurringCosts'),
    recurringCostsScore: rivm('recurringCostsScore'),
    scenarios: rivm('scenarios'),
    securityImproved: rivm('securityImproved'),
    securityImprovedScore: rivm('securityImprovedScore'),
    securityImprovementReason: rivm('securityImprovementReason'),
    specificToolsRequired: rivm('specificToolsRequired'),
    targetAudience: rivm('targetAudience'),
    trainingRequired: rivm('trainingRequired'),
};
