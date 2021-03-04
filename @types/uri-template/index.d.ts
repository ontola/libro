declare module 'uri-template' {
  function parse(...args: string[]): Template;

  interface Param {
    name: string;
  }

  interface Expression {
    params: Param[];
  }

  class Template {
    public expressions: Expression[];
    constructor();
    public expand(args: Record<string, unknown>): string;
    public toString(): string;
    public toJSON(): string;
  }
}
