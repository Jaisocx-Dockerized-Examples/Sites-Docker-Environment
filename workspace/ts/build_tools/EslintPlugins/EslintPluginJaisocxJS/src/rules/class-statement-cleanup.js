// eslint-plugin-custom/rules/class-statement-cleanup.js
export const ClassStatementCleanup = {
  meta: {
    type: "layout",
    docs: {
      description: "Cleanup import and export statements before class declaraton",
      category: "Stylistic Issues",
      recommended: false
    },
    fixable: "code",
    schema: [] // no options
  },
  create(context) {
    function cleanupBeforeClassStart(node) {
      context.report({
        node,
        message: `Expected class declaration start from the file position 1`,
        fix(fixer) {
          return fixer.replaceTextRange([0, node.start], "");
        }
      });
    }
    function cleanupAfterClassEnd(node, range) {
      context.report({
        node,
        message: `Expected no lines after class declaration`,
        fix(fixer) {
          return fixer.replaceTextRange(range, " \n\n\n");
        }
      });
    }

    // Helper to check if there’s exactly one line space before and after a node
    function checkClassStart(node) {
      if (node.start > 1) {
        cleanupBeforeClassStart(node);
      }
    }
    function checkClassEnd(node) {
      let classEnd = node.body.end;
      let range = [];
      let tokens = node.parent.comments;

      if ( !tokens || !tokens.length ) {
        return;
      }

      let tokensNumber = tokens.length;
      let lastTokenId = tokensNumber - 1;
      let lastChar = tokens[lastTokenId].end;

      if ( lastChar > classEnd) {
        range = [classEnd, lastChar];
        cleanupAfterClassEnd(node, range);
      }
    }

    return {
      ClassDeclaration(node) {
        checkClassStart(node);
        checkClassEnd(node);
      }
    };
  }
};


