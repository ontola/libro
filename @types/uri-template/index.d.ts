declare module 'uri-template' {
  function parse(...args: string[]): Template;
  class Template {
    constructor();
    public expand(args: object): string;
    public toString(): string;
    public toJSON(): string;
  }
}
