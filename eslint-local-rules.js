const IMPORT = 'IMPORT';
const EXPORT_NAMED = 'EXPORT_NAMED';
const DEFAULT_PROPS = 2;

/**
 * Enforce placing import and export variables on separate lines
 * @param node
 * @param context
 * @param moduleType - export or import
 * @returns {{range: int[], text: string}|null}
 */
function lintModuleVariablesNewline(node, context, moduleType) {
  const minProperties = context.options[0].minProperties || DEFAULT_PROPS;
  const defaultCorrection = context.options[0].countDefault ? 0 : 1;

  if (node.specifiers.length < minProperties) {
    return null;
  }
  const sourceCode = context.getSourceCode();
  const moduleTypeNameForMessage = moduleType === IMPORT ? 'imported' : 'exported';

  let moduleVariables = null;
  if (node.specifiers) {
    // for import
    moduleVariables = node.specifiers;
  } else if (node.declaration.type === 'ObjectExpression') {
    // for some exports (export { a, b, c }
    moduleVariables = node.declaration.properties
  }

  if (!moduleVariables) {
    return null;
  }

  const report = (fixer) => context.report({
    fix: fixer,
    message: `Each ${moduleTypeNameForMessage} variable should starts with a new line`,
    node,
  });

  for (let i = 1; i < moduleVariables.length; i++) {
    const firstTokenOfCurrentProperty = sourceCode.getFirstToken(moduleVariables[i]);
    if (moduleVariables[i].loc.start.line === moduleVariables[i - 1].loc.start.line) {

      const nodeSource = context.getSourceCode();
      const containsDefault = node.specifiers.find((t) => t.type === 'ImportDefaultSpecifier')
        ? defaultCorrection
        : 0;
      const namedImportAfterDefault = moduleType === IMPORT
        && node.specifiers[i].type === 'ImportSpecifier'
        && (
          node.specifiers[i - 1]
          && node.specifiers[i - 1].type === 'ImportDefaultSpecifier'
        );

      if (node.specifiers.length < minProperties + containsDefault) {
        return null;
      }

      if (namedImportAfterDefault) {
        const endOfDefaultImport = node.specifiers[i - 1].range[1];
        const beginningOfNamedImport = node.specifiers[i].range[0];

        const brace = nodeSource.tokensAndComments.find(
          (token) => token.type === 'Punctuator'
            && token.value === '{'
            && token.range[0] >= endOfDefaultImport
            && token.range[1] <= beginningOfNamedImport
        );
        const rangeAfterBrace = [brace.range[0], brace.range[1]];

        report((fixer) => fixer.replaceTextRange(rangeAfterBrace, '{\n'));
      } else {
        const comma = nodeSource.getTokenBefore(firstTokenOfCurrentProperty);
        const rangeAfterComma = [comma.range[1], firstTokenOfCurrentProperty.range[0]];
        // don't fix if comments between the comma and the next property.
        if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
          return null;
        }
        report((fixer) => fixer.replaceTextRange(rangeAfterComma, '\n'));
      }
    }
  }
}

const schema = {
  additionalProperties: false,
  properties: {
    countDefault: {
      type: 'boolean'
    },
    minProperties: {
      type: 'number',
    },
  },
  type: 'object',
};

const exportDeclarationNewline = {
  create: (context) => ({
    ExportNamedDeclaration(node) {
      lintModuleVariablesNewline(node, context, EXPORT_NAMED)
    },
  }),
  meta: {
    schema: [
      schema
    ],
  },
};


const importDeclarationNewline = {
  create: (context) => ({
    ImportDeclaration(node) {
      lintModuleVariablesNewline(node, context, IMPORT)
    },
  }),
  meta: {
    fixable: true,
    schema: [
      schema
    ],
  },
};

// eslint-disable-next-line no-undef
module.exports = {
  'export-declaration-newline': exportDeclarationNewline,
  'import-declaration-newline': importDeclarationNewline,
  // 'test-rule': {
  //   meta: {
  //     docs: {
  //       description: 'disallow identifiers',
  //       category: 'Possible Errors',
  //       recommended: false,
  //     },
  //     schema: [],
  //   },
  //   create: function(context) {
  //     return {
  //       Identifier: function(node) {
  //         context.report({
  //           node: node,
  //           message: 'Identifiers not allowed for Super Important reasons.',
  //         });
  //       },
  //     };
  //   },
  // },
};
