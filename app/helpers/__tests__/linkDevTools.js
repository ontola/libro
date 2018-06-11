/* eslint-disable no-console */
import { mount } from 'enzyme';
import LinkedRenderStore from 'link-lib';
import {
  Literal,
  NamedNode,
  Statement,
} from 'rdflib';
import React from 'react';

import LinkDevTools, { parseTerm } from '../LinkDevTools';
import { NS } from '../LinkedRenderStore';

const reactDevTools = jest.fn();

describe('helpers', () => {
  const oldConsole = {
    debug: console.debug,
    error: console.error,
    info: console.info,
    log: console.log,
    warn: console.warn,
  };

  afterAll(() => {
    console.debug = oldConsole.debug;
    console.error = oldConsole.error;
    console.info = oldConsole.info;
    console.log = oldConsole.log;
    console.warn = oldConsole.warn;
  });

  describe('linkDevTools', () => {
    console.debug = (ignored) => {};
    console.warn = (ignored) => {};
    console.log = (ignored) => {};
    console.info = (ignored) => {};

    const errMock = jest.fn();
    console.error = errMock;

    function expectErr(msg, appendDefault = false) {
      const appendix = appendDefault
        ? ', is a link component selected? (check the value of `$r`)'
        : '';
      expect(errMock).toHaveBeenCalledWith(`${msg}${appendix}`);
    }

    describe('$r', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should return the global', () => {
        const mock = Symbol('$r');
        window.$r = mock;
        expect(devObj.$r).toEqual(mock);
        window.$r = undefined;
      });

      it('should default undefined', () => {
        expect(devObj.$r).toEqual(reactDevTools);
      });
    });

    describe('dataArr', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should error if undefined', () => {
        expect(new LinkDevTools().dataArr()).toBeUndefined();
        expectErr('No component selected in react devtools (check the value of `$r`)');
      });

      it('should error if comp has no props', () => {
        expect(devObj.dataArr({})).toBeUndefined();
        expectErr('Object has no props', true);
      });

      it('should error if no identity object was given', () => {
        expect(devObj.dataArr(React.createElement('div'))).toBeUndefined();
        expectErr('No subject or object found (check the value of `$r`)', true);
      });

      it('should normalize a passed identity object', () => {
        const comp = React.createElement('div', { subject: 'http://example.com/3' });
        const mock = jest.fn();
        devObj.getLRS = jest.fn().mockReturnValueOnce({ tryEntity: mock });
        devObj.tryEntity = mock;
        devObj.dataArr(comp);
        expect(mock).toHaveBeenCalledWith(new NamedNode('http://example.com/3'));
      });
    });

    describe('explain', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should handle unknown elements', () => {
        devObj.rDevTools = jest.fn();
        const elem = React.createElement('div');
        const wrapper = mount(elem);
        devObj.getLRS = () => wrapper.instance();
        expect(devObj.explain).toBeUndefined();
      });
    });

    describe('explainLOC', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should handle LOC without data', () => {
        expect(devObj.explainLOC({
          data: () => undefined,
          hasErrors: () => false,
          props: { subject: NS.example('1') },
          topology: () => undefined,
        }, new LinkedRenderStore())).toBeUndefined();
      });
    });

    describe('showProp', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should return a function', () => {
        expect(typeof devObj.showProp()).toEqual('function');
      });

      it('should handle undefined', () => {
        devObj.rDevTools = undefined;
        expect(devObj.showProp()()).toBeUndefined();
      });

      it('should handle undefined props', () => {
        const $r = jest.fn().mockReturnValueOnce(undefined);
        expect(devObj.showProp()($r)).toBeUndefined();
      });

      it('should handle component without label', () => {
        expect(devObj.showProp()({ props: {} })).toBeUndefined();
        expectErr('Component `label` is undefined', true);
      });

      it('should handle component without subject', () => {
        expect(devObj.showProp()({ props: { label: '' } })).toBeUndefined();
        expectErr('Component `subject` is undefined', true);
      });

      it('should call the wrapper function', () => {
        const mock = jest.fn().mockReturnValueOnce('ret');
        const mocklrs = jest.fn();
        devObj.getLRS = jest.fn().mockReturnValueOnce(mocklrs);
        expect(devObj.showProp(mock)({ props: { label: 'b', subject: 'a' } })).toEqual('ret');
        expect(mock).toBeCalledWith('a', 'b');
      });
    });

    describe('getLRS', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it("should get the component's LRS", () => {
        window.LRS = Symbol('mock lrs');
        const localLRS = Symbol('mock local lrs');
        const comp = { props: { lrs: localLRS } };
        expect(devObj.getLRS(comp)).toEqual(localLRS);
        window.LRS = undefined;
      });

      it('should default to the global LRS with undefined', () => {
        const lrs = Symbol('mock lrs');
        window.LRS = lrs;
        expect(devObj.getLRS(undefined)).toEqual(lrs);
        window.LRS = undefined;
      });

      it('should default to the global LRS', () => {
        const lrs = Symbol('mock lrs');
        window.LRS = lrs;
        expect(devObj.getLRS(React.createElement('div'))).toEqual(lrs);
        window.LRS = undefined;
      });
    });

    describe('parseTerm', () => {
      it('should instantiate a BlankNode', () => {
        expect(parseTerm({ termType: 'BlankNode' }, ':_G_3543')).toEqual("new BlankNode('_G_3543')");
      });

      it('should shorten a known NamedNode', () => {
        const type = { ...new NamedNode('http://schema.org/name') };
        expect(parseTerm(type, 'http://schema.org/name')).toEqual("NS.schema('name')");
      });

      it('should instantiate an unknown NamedNode', () => {
        const type = { ...new NamedNode('http://example.com/1') };
        expect(parseTerm(type, 'http://example.com/1')).toEqual("new NamedNode('http://example.com/1')");
      });

      it('should instantiate a boolean Literal', () => {
        const type = { ...Literal.fromValue(true) };
        expect(parseTerm(type, 'true')).toEqual('Literal.fromBoolean(true)');
      });

      it('should instantiate a Date Literal', () => {
        const type = { ...Literal.fromValue(new Date()) };
        const value = 'Tue Jan 23 2018 15:18:57 GMT+0100 (CET)';
        expect(parseTerm(type, value)).toEqual(`Literal.fromDate(new Date('${value}'))`);
      });

      it('should instantiate a float Literal', () => {
        const value = 1.5;
        const type = { ...Literal.fromValue(value) };
        expect(parseTerm(type, value.toString())).toEqual('Literal.fromNumber(1.5)');
      });

      it('should instantiate a int Literal', () => {
        const value = 124;
        const type = { ...Literal.fromValue(value) };
        expect(parseTerm(type, value.toString())).toEqual('Literal.fromNumber(124)');
      });

      it('should instantiate a string Literal', () => {
        const value = 'String value';
        const type = { ...Literal.fromValue(value) };
        expect(parseTerm(type, value.toString())).toEqual("new Literal('String value')");
      });

      it('should instantiate a string Literal with apostrophes', () => {
        const value = "String's value";
        const type = { ...Literal.fromValue(value) };
        expect(parseTerm(type, value.toString())).toEqual('new Literal("String\'s value")');
      });
    });

    describe('toObject', () => {
      const devObj = new LinkDevTools(reactDevTools);

      const resource = new NamedNode('http://example.com/resource/1');
      const resource2 = new NamedNode('http://example.com/resource/2');
      const data1 = [
        new Statement(resource, NS.rdf('type'), NS.schema('Thing')),
        new Statement(resource, NS.schema('name'), new Literal('Title')),
        new Statement(resource, NS.schema('text'), new Literal('Lovely contents')),
      ];
      const argumentArr = [
        new NamedNode('https://argu.co/a/1'),
        new NamedNode('https://argu.co/a/2'),
        new NamedNode('https://argu.co/a/3'),
      ];
      const data2 = [
        new Statement(resource2, NS.rdf('type'), NS.schema('CreativeWork')),
        new Statement(resource2, NS.schema('name'), new Literal('Second resource')),
        new Statement(resource2, NS.argu('arguments'), new NamedNode('https://argu.co/a/1')),
        new Statement(resource2, NS.argu('arguments'), new NamedNode('https://argu.co/a/2')),
        new Statement(resource2, NS.argu('arguments'), new NamedNode('https://argu.co/a/3')),
      ];
      const mixed = [
        ...data1,
        ...data2,
      ];

      it('should discard non-arrays', () => {
        expect(devObj.toObject(undefined)).toEqual(undefined);
        expect(devObj.toObject(new Date())).toEqual(undefined);
        expect(devObj.toObject({})).toEqual(undefined);
      });

      it('should handle an empty array', () => {
        expect(devObj.toObject([])).toEqual({});
      });

      it('should convert an array', () => {
        expect(devObj.toObject(mixed)).toEqual({
          [resource]: {
            [NS.rdf('type')]: NS.schema('Thing'),
            [NS.schema('name')]: new Literal('Title'),
            [NS.schema('text')]: new Literal('Lovely contents'),
          },
          [resource2]: {
            [NS.rdf('type')]: NS.schema('CreativeWork'),
            [NS.schema('name')]: new Literal('Second resource'),
            [NS.argu('arguments')]: argumentArr,
          }
        });
      });

      it('should denormalize', () => {
        expect(devObj.toObject(data1)).toEqual({
          [NS.rdf('type')]: NS.schema('Thing'),
          [NS.schema('name')]: new Literal('Title'),
          [NS.schema('text')]: new Literal('Lovely contents'),
        });
      });

      it('should disable denormalization', () => {
        expect(devObj.toObject(data1, false)).toEqual({
          [resource]: {
            [NS.rdf('type')]: NS.schema('Thing'),
            [NS.schema('name')]: new Literal('Title'),
            [NS.schema('text')]: new Literal('Lovely contents'),
          }
        });
      });
    });

    describe('returnWithError', () => {
      it('should display the message', () => {
        LinkDevTools.returnWithError('message');
        const message = 'message';
        expectErr(message, true);
      });

      it('should default without message', () => {
        LinkDevTools.returnWithError();
        const message = 'Is a link component selected? (check the value of `$r`)';
        expectErr(message);
      });
    });

    describe('topology', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should return from props', () => {
        devObj.rDevTools = { props: { topology: 'mock' } };
        expect(devObj.topology).toEqual('mock');
      });

      it('should return from context', () => {
        devObj.rDevTools = { props: { topologyCtx: 'mock' } };
        expect(devObj.topology).toEqual('mock');
      });

      it('should null', () => {
        devObj.rDevTools = { props: { topology: null, topologyCtx: 'mock' } };
        expect(devObj.topology).toBeUndefined();
      });
    });

    describe('tryShorten', () => {
      it('should shorten a known NamedNode', () => {
        expect(LinkDevTools.tryShorten('http://schema.org/name')).toEqual("NS.schema('name')");
      });

      it('should instantiate an unknown NamedNode', () => {
        expect(LinkDevTools.tryShorten('http://example.com/1')).toEqual("new NamedNode('http://example.com/1')");
      });

      it('should instantiate a BlankNode', () => {
        expect(LinkDevTools.tryShorten(':_G_3543')).toEqual("new BlankNode('_G_3543')");
      });
    });

    describe('others', () => {
      const devObj = new LinkDevTools(reactDevTools);

      it('should expose help', () => {
        console.table = jest.fn();
        expect(devObj.help).toBeUndefined();
        expect(console.table).toHaveBeenCalled();
      });

      it('should expose snapshot', () => {
        devObj.snapshotNode = jest.fn().mockReturnValue([]);
        devObj.rDevTools = React.createElement('div', { object: new NamedNode('http://example.com/') });
        expect(devObj.snapshot(0)).toEqual(`const subject = new NamedNode('<http://example.com/>');
  
  const resources = {
    
  };\n`);
        expect(devObj.snapshotNode).toHaveBeenCalled();
      });

      it('should expose getPropArr', () => {
        expect(typeof devObj.getPropArr).toEqual('function');
      });

      it('should expose getPropRawArr', () => {
        expect(typeof devObj.getPropRawArr).toEqual('function');
      });

      it('should expose getProp', () => {
        expect(typeof devObj.getProp).toEqual('function');
      });

      it('should expose getProp with array', () => {
        devObj.showProp = jest.fn().mockReturnValueOnce([]);
        expect(typeof devObj.getProp).toEqual('object');
      });

      it('should expose getPropRaw with array', () => {
        devObj.showProp = jest.fn().mockReturnValueOnce([]);
        expect(typeof devObj.getPropRaw).toEqual('object');
      });

      it('should expose propertyRenderers', () => {
        devObj.getLRS = jest.fn().mockReturnValueOnce({ mapping: 'mock' });
        expect(devObj.propertyRenderers).toEqual('mock');
      });

      it('should expose typeRenderers', () => {
        devObj.getLRS = jest.fn().mockReturnValueOnce({
          mapping: { '<http://purl.org/link-lib/typeRenderClass>': 'mock' }
        });
        expect(devObj.typeRenderers).toEqual('mock');
      });

      it('should expose getLinkedObjectProperty', () => {
        const getResourceProperty = jest.fn();
        expect(devObj.getLinkedObjectProperty(
          NS.schema('name'),
          NS.argu('resource/4'),
          { getResourceProperty }
        )).toBeUndefined();
        expect(getResourceProperty).toHaveBeenCalled();
      });

      it('should expose getLinkedObjectPropertyRaw', () => {
        const getResourcePropertyRaw = jest.fn();
        expect(devObj.getLinkedObjectPropertyRaw(
          NS.schema('name'),
          NS.argu('resource/4'),
          { getResourcePropertyRaw }
        )).toBeUndefined();
        expect(getResourcePropertyRaw).toHaveBeenCalled();
      });
    });
  });
});
