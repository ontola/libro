import { createNS } from '@ontologies/core';

const rivm = createNS('https://argu.co/ns/rivm#');

export default {
    ns: rivm,

    /* classes */
    Category: rivm('Category'),
    MeasureType: rivm('MeasureType'),

    /* properties */
    category: rivm('category'),
    exampleOf: rivm('exampleOf'),
    measureTypes: rivm('measureTypes'),
    measures: rivm('measures'),
};
