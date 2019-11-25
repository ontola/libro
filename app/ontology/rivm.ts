import { createNS } from '@ontologies/core';

const rivm = createNS('https://argu.co/ns/rivm#');

export default {
    ns: rivm,

    /* classes */
    Category: rivm('Category'),
    Intervention: rivm('Intervention'),
    InterventionType: rivm('InterventionType'),
    Measure: rivm('Measure'),
    MeasureType: rivm('MeasureType'),

    /* properties */
    additionalIntroductionInformation: rivm('additionalIntroductionInformation'),
    businessSectionEmployees: rivm('businessSectionEmployees'),
    category: rivm('category'),
    continuous: rivm('continuous'),
    costExplanation: rivm('costExplanation'),
    effectivityResearchMethod: rivm('effectivityResearchMethod'),
    employment: rivm('employment'),
    exampleOf: rivm('exampleOf'),
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
    recurringCosts: rivm('recurringCosts'),
    recurringCostsScore: rivm('recurringCostsScore'),
    securityImprovedScore: rivm('securityImprovedScore'),
    securityImprovementReason: rivm('securityImprovementReason'),
    specificToolsRequired: rivm('specificToolsRequired'),
    targetAudience: rivm('targetAudience'),
    trainingRequired: rivm('trainingRequired'),
};
