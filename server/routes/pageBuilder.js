import fs from 'fs';
import path from 'path';

import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from '@typescript/vfs';
import { LocalStorage } from 'node-localstorage';
import ts from 'typescript';

global.localStorage = new LocalStorage('./dist/tmp');

const ontologiesCore = `
declare module "@ontologies/core" {
  declare enum TermType {
    NamedNode = "NamedNode",
    BlankNode = "BlankNode",
    Literal = "Literal"
  }
  export declare type TermTypes = "NamedNode" | "BlankNode" | "Literal";
  export declare type Indexable = number | string;
  export interface RDFObject {
    id?: Indexable;
    termType?: TermType | TermTypes | string;
  }
  /**
   * The overarching interface for RDF components (or terms).
   */
  export interface Term extends RDFObject {
    termType: TermType | TermTypes | string;
    value: string;
  }
  /**
   * Any resource (node) whether with a known IRI (named) or a resource which is yet to be assigned an
   *   IRI (blank, or unnamed).
   */
  export declare type Node = NamedNode | BlankNode;
  /**
   * A resource (node) of which the IRI is known.
   *
   * The IRI is an assigned global identifier which ideally can be resolved to its authoritative
   *   representation.
   *
   * @see https://tools.ietf.org/html/rfc3987
   * @see https://www.w3.org/TR/rdf11-concepts/#section-IRIs
   */
  export interface RealNamedNode extends Term {
    termType: "NamedNode";
    value: string;
  }
  /**
   * A resource (node) of which the IRI is known.
   *
   * The IRI is an assigned global identifier which ideally can be resolved to its authoritative
   *   representation.
   *
   * @see https://tools.ietf.org/html/rfc3987
   * @see https://www.w3.org/TR/rdf11-concepts/#section-IRIs
   */
  export type NamedNode = string & RealNamedNode;
  /**
   * A resource (node) of which the IRI is not known yet.
   *
   * In RDF blank nodes can be used to say; "I know this resource exists and has these properties, but
   *  it's identifier is not known to me at this time."
   *
   * @see https://www.w3.org/TR/rdf11-concepts/#section-blank-nodes
   * @see https://www.w3.org/TR/rdf11-concepts/#section-skolemization
   */
  export interface BlankNode extends Term {
    termType: "BlankNode";
    value: string;
  }
  /**
   * An RDF Literal object. Maps to a value within some given domain.
   *
   * We require all fields to exist (albeit undefined) and the datatype to always be set (defaults to
   *   xsd:string) to simplify code consuming the objects and improve performance.
   *
   * @see https://www.w3.org/TR/rdf11-concepts/#section-Graph-Literal
   * @see https://www.w3.org/TR/rdf-schema/#ch_literal
   */
  export interface Literal extends Term {
    termType: "Literal";
    datatype: NamedNode;
    language: string | undefined;
    value: string;
  }
  export interface Quad {
    id?: Indexable;
    subject: Node;
    predicate: NamedNode;
    object: SomeTerm;
    graph: Node;
  }
  export interface Variable extends Term {
    termType: "Variable";
    value: string;
  }
  export declare type SomeTerm = NamedNode | BlankNode | Literal;
  /**
   * A quad formatted as an array.
   */
  export declare type Quadruple = [Node, NamedNode, SomeTerm, Node];
  export declare enum QuadPosition {
    subject = 0,
    predicate = 1,
    object = 2,
    graph = 3
  }
  export declare enum Feature {
    /** Whether the factory supports termType:Collection terms */
    collections = "COLLECTIONS",
    /** Whether the factory supports termType:DefaultGraph terms */
    defaultGraphType = "DEFAULT_GRAPH_TYPE",
    /** Whether the factory supports equals on produced instances */
    equalsMethod = "EQUALS_METHOD",
    /** Whether the factory can create a unique idempotent identifier for the given term. */
    id = "ID",
    /** Whether the factory stores its unique idempotent identifier for the given term on the instance with the \`id\` property (implies Feature.id). */
    idStamp = "ID_STAMP",
    /** Whether the factory will return the same instance for subsequent calls (implies implies Feature.id and \`===\`). */
    identity = "IDENTITY",
    /** Whether the factory supports mapping ids back to instances (should adhere to the identity setting) */
    reversibleId = "REVERSIBLE_ID",
    /** Whether the factory supports termType:Variable terms */
    variableType = "VARIABLE_TYPE"
  }
  export declare type Comparable = NamedNode | BlankNode | Literal | Quad | Quadruple | undefined | null;
  export declare type SupportTable = Record<Feature, boolean>;
  export interface DataFactoryOpts {
    bnIndex?: number;
    supports?: SupportTable;
  }
  export interface LowLevelStore {
    rdfFactory: DataFactory;
    add(subject: Node, predicate: NamedNode, object: Term, graph?: Node): Quad;
    addQuad(quad: Quad): Quad;
    addQuads(quad: Quad[]): Quad[];
    addQuadruple(quadruple: Quadruple): Quadruple;
    addQuadruples(quadruple: Quadruple[]): Quadruple[];
    removeQuad(quad: Quad): void;
    removeQuads(quad: Quad[]): void;
    match(subj: Node | undefined | null, pred?: NamedNode | undefined | null, obj?: Term | undefined | null, why?: Node | undefined | null): Quad[];
  }
  /**
   * Data factory interface based RDF/JS: Data model specification.
   *
   * Non RDF-native features have been removed (e.g. no Variable, no Literal as predicate, etc.),
   * though might be added back via generics.
   *
   * bnIndex is optional but useful.
   */
  export interface DataFactory<FactoryTypes = NamedNode | BlankNode | Literal | Quad | Quadruple> {
    bnIndex?: number;
    supports: SupportTable;
    namedNode(value: string): NamedNode;
    blankNode(value?: string): BlankNode;
    literal(value: string, languageOrDatatype?: string | NamedNode): Literal;
    literal(value: unknown): Literal;
    defaultGraph(): NamedNode;
    quad(subject: Node, predicate: NamedNode, object: Term, graph?: NamedNode): Quad;
    isQuad(obj: any): obj is Quad;
    quadruple(subject: Node, predicate: NamedNode, object: Term, graph?: NamedNode): Quadruple;
    fromTerm(original: Literal | Term): Term;
    fromQuad(original: Quad): Quad;
    fromQdr(original: Quadruple): Quad;
    qdrFromQuad(original: Quad): Quadruple;
    qdrFromQdr(original: Quadruple): Quadruple;
    equals(a: Comparable, b: Comparable): boolean;
    /**
     * Generates a unique session-idempotent identifier for the given object.
     *
     * @example NQ serialization (reversible from value)
     * @example MD5 hash of termType + value (irreversible from value, map needed)
     *
     * @return {Indexable} A unique value which must also be a valid JS object key type.
     */
    id(obj: FactoryTypes): Indexable | unknown;
    /**
     * Inverse function of {id}.
     * Should be able to resolve terms back, may be able to resolve quads/quadruples, but should
     * throw an exception if not possible.
     *
     * It should be able to resolve the value for any given id which it handed out. Passing an id not
     * generated by the same instance might result in a value or an exception depending on the
     * implementation.
     */
    fromId(id: Indexable | unknown): FactoryTypes | unknown;
    toNQ(term: FactoryTypes): string;
    termFromNQ(nq: string): BlankNode | NamedNode | Literal;
  }
  export declare type Namespace = (term: string) => NamedNode;
  export declare type NamespaceCreator = (ns: string) => Namespace;
  export interface CustomPredicateCreator {
    /** Creates a custom predicate with this namespace as its base. */
    ns: Namespace;
  }
  
  /**
   * Plain JS/functional implementation of the RDF/JS: Data model specification, limited to a strict
   * rdf subset (no Variable, no Literal as predicate, etc.).
   */
  export declare class PlainFactory implements DataFactory {
    bnIndex: number;
    supports: Record<Feature, boolean>;
    constructor(opts?: DataFactoryOpts);
    /**
     * Checks if the object {obj} is a Quad.
     */
    static isQuad(obj: any): obj is Quad;
    namedNode(value: string): NamedNode;
    blankNode(value?: string): BlankNode;
    literal(value: string | unknown, languageOrDatatype?: string | NamedNode): Literal;
    defaultGraph(): NamedNode;
    /**
     * Create an RDF statement in object form.
     * @param subject The subject of the statement
     * @param predicate The predicate of the statement
     * @param object The object of the statement
     * @param graph The graph of the statement
     */
    quad(subject: Node, predicate: NamedNode, object: SomeTerm, graph?: NamedNode): Quad;
    isQuad(obj: any): obj is Quad;
    /**
     * * Returns an RDF statement in array form.
     * @param subject The subject of the statement
     * @param predicate The predicate of the statement
     * @param object The object of the statement
     * @param graph The graph of the statement
     */
    quadruple(subject: Node, predicate: NamedNode, object: SomeTerm, graph?: NamedNode): Quadruple;
    fromTerm(original: Literal | Term): Term;
    fromQuad(original: Quad): Quad;
    fromQdr(original: Quadruple): Quad;
    qdrFromQuad(original: Quad): Quadruple;
    qdrFromQdr(original: Quadruple): Quadruple;
    /**
     * Compare if two RDF objects are the same.
     *
     * Should work with non-standard rdf libraries as well (e.g. supporting Variable and Collection).
     */
    equals(a: Comparable, b: Comparable): boolean;
    fromId(id: Indexable): SomeTerm | unknown;
    id(obj: SomeTerm | Quad | Quadruple): Indexable;
    termFromNQ(nq: string): SomeTerm;
    toNQ(term: SomeTerm | Quadruple | Quad): string;
    protected parseLiteral(value: unknown): Literal;
    protected termToNQ(term: BlankNode | NamedNode | Literal): string;
    protected quadrupleToNQ(quad: Quadruple): string;
    protected quadToNQ(quad: Quad): string;
  }
  /**
   * Plain JS/functional implementation of the RDF/JS: Data model specification, limited to a strict
   * rdf subset (no Variable, no Literal as predicate, etc.).
   */
  export declare const DefaultFactory: PlainFactory;
  
  declare let setup: (factory?: DataFactory, override?: boolean) => void;
  declare let globalFactory: DataFactory & any;
  declare let globalSymbol: any;
  export declare const createNS: (ns: string) => Namespace;
  declare let proxy: DataFactory<any> & any;
  export { setup, globalFactory, globalSymbol };
  
  export declare function isTerm(obj: any): obj is Term;
  export declare function isNamedNode(obj: any): obj is NamedNode;
  export declare function isBlankNode(obj: any): obj is BlankNode;
  export declare function isLiteral(obj: any): obj is Literal;
  export declare function isSomeTerm(obj: any): obj is SomeTerm;
  export declare function isNode(obj: any): obj is Node;
  export declare function isQuad(obj: any): obj is Quad;
  export declare function doc(node: NamedNode): string;
}
`;

const generateLocalOntologyDeclarations = async () => {
  const fsMap = await createDefaultMapFromCDN(
    { target: ts.ScriptTarget.ES2020 },
    '4.1.3',
    true,
    ts
  );
  fsMap.set('core.ts', ontologiesCore);

  const ontologies = fs.readdirSync('app/ontology')
    .filter((filename) => !filename.includes('app'))
    .map((filename) => filename.slice(0, -('.ts'.length)));

  for (const ontology of ontologies) {
    const rawSource = fs.readFileSync(path.resolve(__dirname, `../../app/ontology/${ontology}.ts`)).toString();
    fsMap.set(`${ontology}.ts`, rawSource);
  }

  const system = createSystem(fsMap);

  const compilerOpts = {
    declaration: true,
    emitDeclarationOnly: true,
    esModuleInterop: true,
    target: ts.ScriptTarget.ES2020,
  };
  const host = createVirtualCompilerHost(system, compilerOpts, ts);

  const program = ts.createProgram({
    host: host.compilerHost,
    options: compilerOpts,
    rootNames: [...fsMap.keys()],
  });
  program.emit();

  return ontologies.reduce((acc, ont) => ({
    ...acc,
    [ont]: fsMap.get(`${ont}.d.ts`)
      .replace('declare const _default:', `declare module ${ont}`)
      .replace(/\n {2}/g, '\n  const ')
      .replace('export default _default;', ''),
  }), {});
};

const generateOntologiesDeclarations = () => {
  const ontologies = [
    ['as'],
    ['dcterms'],
    ['foaf'],
    ['owl'],
    ['rdf', 'rdfx'],
    ['rdfs'],
    ['schema'],
    ['shacl'],
    ['xsd'],
  ];

  return ontologies.reduce((acc, [ontology, name = ontology]) => {
    const o = fs.readFileSync(`node_modules/@ontologies/${ontology}/index.d.ts`);
    const modularizedSource = `declare module ${name} { ${o.toString().replace(/export declare /g, '')} }`;

    return {
      ...acc,
      [name]: JSON.stringify(modularizedSource),
    };
  }, {});
};

const editorContext = async (ctx) => {
  const context = {
    core: ontologiesCore,
    localOntologies: await generateLocalOntologyDeclarations(),
    ontologies: generateOntologiesDeclarations(),
  };

  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(context);
};

export default editorContext;
