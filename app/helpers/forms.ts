import { SomeTerm } from 'rdflib';

export function calculateFieldName(context: string | undefined,
                                   propertyIndex: string | number | undefined,
                                   field: SomeTerm): string {

    const ctxSegment = context !== undefined ? `${context}.` : '';
    const pISegment = propertyIndex !== undefined ? `${propertyIndex}.` : '';

    return `${ctxSegment}${pISegment}${btoa(field.value)}`;
}
