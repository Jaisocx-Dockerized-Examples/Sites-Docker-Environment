import { resolve } from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "url";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import jaisocxPlugin from "./build_tools/EslintPlugins/EslintPluginJaisocxJS/src/index.js";


// Resolve paths for tsconfig in an ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");
const tsconfigPath = resolve(__dirname, "tsconfig.ESNext.json");


const TSC_OUTPUT_INDENTATION_SIZE = 4; // Matches tsc indent rule fixed value, tsc cannot be configured


export default [
  {
    "ignores": ["node_modules/**"],
    "languageOptions": {
      "ecmaVersion": 2023,
      "sourceType": "module"
    },
    "rules": {
      "indent": ["error", 2, { "SwitchCase": 2 }],
      "no-mixed-spaces-and-tabs": "error",
      "quotes": ["warn", "double"],
      "no-trailing-spaces": ["error", { "skipBlankLines": false, "ignoreComments": false }]
    }
  },
  {
    "files": ["data/**/*.json"],
    "rules": {
      "quote-props": ["error", "always"],
      "quotes": ["error", "double"],
      "comma-dangle": [
        "error",
        {
          "arrays": "never",
          "objects": "never",
          "imports": "never",
          "exports": "never",
          "functions": "never"
        }
      ]
    }
  },
  {
    "files": ["**/src/**/*.ts"],
    "plugins": {
      "@typescript-eslint": typescriptEslintPlugin,
      "jaisocx": jaisocxPlugin
    },
    "languageOptions": {
      "parser": typescriptEslintParser,
      "parserOptions": {
        "ecmaVersion": 2023,
        "sourceType": "module",
        "project": tsconfigPath
      }
    },
    "rules": {
      "indent": ["error", 2, { "SwitchCase": 2 }],
      "no-mixed-spaces-and-tabs": "error",

      "jaisocx/multiline-args": ["error", { "args-chars-max-number": 28 }],
      "jaisocx/line-delimiters": [
        "error",
        {
          "class": {
            "lines_before": 3,
            "lines_before_on_block_start": 0
          },
          "methods": {
            "lines_before": 3,
            "lines_before_on_block_start": 1
          },
          "comments": {
            "lines_before": 2,
            "lines_before_on_block_start": 1
          },
          "blocks": {
            "lines_before": 1,
            "lines_before_on_block_start": 1
          },
          "code_lines": {
            "lines_before": 3,
            "lines_before_on_block_start": 0
          },
          "return": {
            "lines_before": 2,
            "lines_before_on_block_start": 0
          }
        }
      ],
      "comma-dangle": [
        "error",
        {
          "arrays": "never",
          "objects": "never",
          "imports": "never",
          "exports": "never",
          "functions": "never"
        }
      ],
      "no-extra-semi": "error",
      "semi": ["error", "always"]
    }
  },
  {
    "files": ["Jaisocx_SitesTools/**/transpiled/**/*.js"],
    "plugins": {
      "jaisocx": jaisocxPlugin
    },
    "rules": {
      "no-mixed-spaces-and-tabs": "error",
      "indent": ["error", TSC_OUTPUT_INDENTATION_SIZE],

      "jaisocx/class-statement-cleanup": "error",
      "jaisocx/multiline-args": ["error", { "args-chars-max-number": 28 }],
      "jaisocx/line-delimiters": [
        "error",
        {
          "class": {
            "lines_before": 3,
            "lines_before_on_block_start": 0
          },
          "methods": {
            "lines_before": 3,
            "lines_before_on_block_start": 1
          },
          "comments": {
            "lines_before": 2,
            "lines_before_on_block_start": 1
          },
          "blocks": {
            "lines_before": 1,
            "lines_before_on_block_start": 1
          },
          "code_lines": {
            "lines_before": 3,
            "lines_before_on_block_start": 0
          },
          "return": {
            "lines_before": 2,
            "lines_before_on_block_start": 0
          }
        }
      ],
      "comma-dangle": [
        "error",
        {
          "arrays": "never",
          "objects": "never",
          "imports": "never",
          "exports": "never",
          "functions": "never"
        }
      ],
      "no-extra-semi": "error",
      "semi": ["error", "always"]
    }
  }
];




