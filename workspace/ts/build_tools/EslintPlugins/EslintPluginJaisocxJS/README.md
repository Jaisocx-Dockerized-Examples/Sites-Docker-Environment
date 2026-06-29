# ESLint

## eslint.config.js

### args of rules

Rules are on this path

```
workspace/ts/build_tools/EslintPlugins/EslintPluginJaisocxJS/src/rules
```

For example, on line 73, the arg "args-chars-max-number" of the jaisocx/multiline-args

```
"jaisocx/multiline-args": [ "error", { "args-chars-max-number": 10 } ],
```


When writing an eslint plugin and rule, in the .js file for the eslint rule,
in the first object, property on the line 11 schema:

```
export const MultilineArgs = {
...
...
...
    schema: [
      {
        type: "object",
        properties: {
          "args-chars-max-number": {
            type: "number",
            minimum: 5,
          }
        },
        additionalProperties: false
      }
    ]
  },
```


the one arg is defined as object and it has property *"args-chars-max-number"* of the datatype number.
The property minimum is the built-in prop for default values validation.


On the line 29, this setting from *eslint.config.js*, You see how in js code into the variable *argsCharsMaxNumber*
to set the value of

```
let options = context.options[0] || {};
let argsCharsMaxNumber = options["args-chars-max-number"];
```









