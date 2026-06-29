// eslint-plugin-custom/rules/line-delimiters.js
export const LineDelimiters = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce line delimiters around blocks and method definitions",
      category: "Stylistic Issues",
      recommended: false
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          "class": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          },
          "methods": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          },
          "blocks": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          },
          "return": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          },
          "comments": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          },
          "code_lines": {
            type: "object",
            properties: {
              "lines_before": {
                type: "number",
                minimum: 1
              },
              "lines_before_on_block_start": {
                type: "number",
                minimum: 0
              },
            },
            additionalProperties: false
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: function (context) {

    const TSC_OUTPUT_INDENTATION_SIZE = 4; // Matches tsc indent rule fixed value, tsc cannot be configured
    const ESLINT_CONFIG_INDENTATION_SIZE = 2; // Matches tsc indent rule fixed value, tsc cannot be configured

    const optionsDefaults = {
      "class": {
        "lines_before": 3,
        "lines_before_on_block_start": 0
      },
      "methods": {
        "lines_before": 3,
        "lines_before_on_block_start": 1
      },
      "comments": {
        "lines_before": 3,
        "lines_before_on_block_start": 1
      },
      "blocks": {
        "lines_before": 1,
        "lines_before_on_block_start": 1
      },
      "code_lines": {
        "lines_before": 2,
        "lines_before_on_block_start": 0
      },
      "return": {
        "lines_before": 3,
        "lines_before_on_block_start": 0
      }
    };

    const labeledBlocksNames = [
      "WhileStatement",
      "ForStatement",
      "ForInStatement",
      "ForOfStatement"
    ];

    const handledTokensNames = [
      "ClassDeclaration",
      "MethodDefinition",
      "FunctionDeclaration",
      "IfStatement",
      "WhileStatement",
      "ForStatement",
      "ForInStatement",
      "ForOfStatement",
      "ReturnStatement",
    ];

    const keywordPunctuator = "Punctuator";
    const keywordKeyword = "Keyword";
    const keywordExport = "export";
    const keywordColon = ":";
    const keywordBlockStart = "{";
    const keywordBlockEnd = "}";




    // here we get eslintrc.js config rules
    const indentRuleConfig = (context && context.settings && context.settings.indent) || ["error", ESLINT_CONFIG_INDENTATION_SIZE];
    const eslintConfigIdentPrefixSizeForOneLevel = indentRuleConfig[1];



    function checkBlockSpacing (
      node,
      spacingType
    ) {
      const options = context.options[0] || {};
      const sourceCode = context.getSourceCode();

      let isJsSimple = options.isJsSimple;

      const spacing = {
        "class": options.class || optionsDefaults.class,
        "methods": options.methods || optionsDefaults.methods,
        "blocks": options.blocks || optionsDefaults.blocks,
        "return": options["return"] || optionsDefaults["return"],
        "comments": options.comments || optionsDefaults.comments,
        "code_lines": options.code_lines || optionsDefaults.code_lines
      };

      let linesRequired = 0;
      let newLineCharsNumber = 0;

      let locSpacingType = spacingType;
      let spacingApplied = spacing[locSpacingType];
      if (spacingApplied === undefined ) {
        locSpacingType = "code_lines";
        spacingApplied = spacing[locSpacingType];
      }

      let mode = "before";
      let before = false;

      try {
        before = sourceCode.getTokenBefore(node, { includeComments: true });
      } catch (e) {
        before = false;
      }

      let isFirstInBlock = true;

      if (before && (before.value === keywordBlockStart)) {
        isFirstInBlock = true;
        linesRequired = spacingApplied.lines_before_on_block_start;
        newLineCharsNumber = linesRequired + 1;

      } else if ( !before ) {
        isFirstInBlock = true;
        linesRequired = spacingApplied.lines_before_on_block_start;
        newLineCharsNumber = ( linesRequired ? linesRequired + 1 : 0 );

      } else {
        isFirstInBlock = false;
        linesRequired = spacingApplied.lines_before;
        newLineCharsNumber = linesRequired + 1;
      }


      const lineDiff = {
        before: 0,
        after: 0
      };


      let lineStartToken = {};
      let lineStartTokenBefore = {};

      let labelToken = {};
      let labelTokenBefore = {};

      let exportKeywordToken = {};
      let exportKeywordTokenBefore = {};

      if (labeledBlocksNames.includes(node.type) && ( before && before.value === keywordColon)) {
        labelToken = sourceCode.getTokenBefore(before);
        labelTokenBefore = sourceCode.getTokenBefore(labelToken);

        lineStartToken = labelToken;
        lineStartTokenBefore = labelTokenBefore;

      } else if ( before && (before.type === keywordKeyword) && (before.value === keywordExport)) {
        exportKeywordToken = before;
        exportKeywordTokenBefore = sourceCode.getTokenBefore( exportKeywordToken );

        lineStartToken = exportKeywordToken;
        lineStartTokenBefore = exportKeywordTokenBefore;
      } else {
        lineStartToken = node;
        lineStartTokenBefore = before;
      }

      lineDiff.before = lineStartToken.loc.start.line - (lineStartTokenBefore ? lineStartTokenBefore.loc.end.line : 0) - 1;

      if ((lineStartTokenBefore && lineStartTokenBefore.type === "Line")) { // before is comment
        linesRequired = 0;
        newLineCharsNumber = linesRequired + 1;
      } else if (!lineStartTokenBefore ) {
        isFirstInBlock = true;
        linesRequired = spacingApplied.lines_before_on_block_start;
        newLineCharsNumber = ( (linesRequired !== 0) ? linesRequired + 1 : 0);
      }



      let toSetLinesNumber = true;
      if ((node.type === "ClassDeclaration") && (!lineStartTokenBefore)) {
        toSetLinesNumber = (lineDiff.before !== linesRequired);

      } else if (node.type === "IfStatement") {
        let isElseIfToken = (before && (before.type === "Keyword") && (before.value === "else"));
        toSetLinesNumber = ( isElseIfToken === false );

      } else if (locSpacingType === "code_lines") {
        toSetLinesNumber = (lineDiff.before > linesRequired);

      } else if (locSpacingType === "comments") {
        toSetLinesNumber = (lineDiff.before !== linesRequired);

      } else if (locSpacingType === "return") {
        toSetLinesNumber = (lineDiff.before !== linesRequired);

      } else {
        toSetLinesNumber = (lineDiff.before !== linesRequired);

      }

      toSetLinesNumber = ( toSetLinesNumber && ( linesRequired !== lineDiff.before ) );

      if ( toSetLinesNumber === false ) {
        return;
      }


      let rangeStart = 0;
      let rangeEnd = 0;
      let range = [0, 0];
      let whiteSpacesNumber = 0;
      let linesReplacement = "";

      if ( toSetLinesNumber === true ) {

        rangeStart = lineStartTokenBefore ? lineStartTokenBefore.range[1] : 0;
        rangeEnd = lineStartToken.range[0];

        whiteSpacesNumber = lineStartToken.loc.start.column;

        if ( rangeStart && rangeEnd ) {
          linesReplacement = (newLineCharsNumber !== 0 ? "\n".repeat(newLineCharsNumber) : "") + (whiteSpacesNumber !== 0 ? " ".repeat(whiteSpacesNumber) : "");
        }

        if ( linesReplacement.length !== 0 ) {

          range = [rangeStart, rangeEnd];
          mode = "before";

          context.report({
            node,
            range,
            message: `Expected ${linesRequired} empty line${linesRequired > 1 ? "s" : ""} found ${lineDiff.before} ${mode} block.`,
            fix(fixer) {
              return fixer.replaceTextRange(range, linesReplacement );
            }
          });

        }
      }

      // -----------------------
      // CODE-SNIPPETS FOR LINE-DELIMITER AFTER TOKEN
      // -----------------------
      // let isLastInParent = (node.parent && node.parent.body && (node.parent.body.length > 0) && (node.parent.body[(node.parent.body.length - 1)] === node));
      // lineDiff.after = after.loc.start.line - node.loc.end.line;
      // whiteSpacesNumber = after.loc.start.column;
      // rangeStart = node.end;
      // rangeEnd   = after.start;
      // range = [rangeStart, rangeEnd];

    }


    function checkBlockSpacingAllTokens(
      node,
      spacingType
    ) {
      // console.log(node.type);

      const sourceCode = context.getSourceCode();

      let allTokens = sourceCode.getTokens(node).filter(
        (token) => {
          return (handledTokensNames.includes(token.type) === false);
        }
      );

      allTokens.forEach(
        (t) => {
          checkBlockSpacing(
            t,
            spacingType
          );
        }
      );

    }


    return {
      // ClassDeclaration: Keyword class after keyword export
      // FunctionExpression: function body
      // FunctionDeclaration: function args block in round braces
      ClassDeclaration: function (node) {
        checkBlockSpacing(
          node,
          "class"
        );
      },
      MethodDefinition: function (node) {
        checkBlockSpacing(
          node,
          "methods"
        );
      },
      FunctionExpression: function (node) {
        checkBlockSpacingAllTokens(
          node,
          "code_lines"
        );
      },
      FunctionDeclaration: function (node) {
        checkBlockSpacingAllTokens(
          node,
          "code_lines"
        );
      },
      IfStatement: function (node) {
        checkBlockSpacing(
          node,
          "blocks"
        );
      },
      WhileStatement: function (node) {
        checkBlockSpacing(
          node,
          "blocks"
        );
      },
      ForStatement: function (node) {
        checkBlockSpacing(
          node,
          "blocks"
        );
      },
      ForInStatement: function (node) {
        checkBlockSpacing(
          node,
          "blocks"
        );
      },
      ForOfStatement: function (node) {
        checkBlockSpacing(
          node,
          "blocks"
        );
      },
      Program() {
        const sourceCode = context.getSourceCode();
        const allComments = sourceCode.getAllComments();

        allComments.forEach((comment) => {
          checkBlockSpacing(
            comment,
            "comments"
          );
        });

      },
      ReturnStatement: function (node) {
        checkBlockSpacing(
          node,
          "return"
        );
      }
    };
  }

};

