
`Docker for a Site`

![./workspace/cdn/software_labels/docker/software_tm_label_docker_29_4_3.svg](./workspace/cdn/software_labels/docker/software_tm_label_docker_29_4_3.svg)


![./workspace/cdn/software_labels/Prince/software_tm_label_prince.svg](./workspace/cdn/software_labels/Prince/software_tm_label_prince.svg)
![./workspace/cdn/software_labels/php/software_tm_label_php.svg](./workspace/cdn/software_labels/php/software_tm_label_php.svg)
![./workspace/cdn/software_labels/Typescript/software_tm_label_typescript_2_593.svg](./workspace/cdn/software_labels/Typescript/software_tm_label_typescript_2_593.svg)
![./workspace/cdn/software_labels/Node/software_tm_label_nodejs_2.svg](./workspace/cdn/software_labels/Node/software_tm_label_nodejs_2.svg)
![./workspace/cdn/software_labels/Jaisocx/js_clientside_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/js_clientside_tm_label_jaisocx.svg)
![./workspace/cdn/software_labels/Jaisocx/js_serverside_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/js_serverside_tm_label_jaisocx.svg)
![./workspace/cdn/software_labels/Jaisocx/software_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/software_tm_label_jaisocx.svg)

[software_labels preview](./README_software_labels.md)

[HOME](./README.md)

---

  >  🗓  **Updated**:  🌼  Summer 2026, Sun. 28 jun. 17:40:03



# package.json
  > **AI powered**



```json

{
  "name": "your-lib",
  "version": "1.0.0",

  "engines": {
    "node": ">=18"
  },

  "browserslist": [
    "defaults",
    "not IE 11"
  ],

  "jsTarget": "ES2020",   // custom metadata

  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    }
  }
}

```




```
| ES Level         | Node (min) | Safe Node | Browser baseline | Notable features introduced                                                                                                                                               |   |                   |
| ---------------- | ---------- | --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - | ----------------- |
| **ES5 (2009)**   | 0.10       | 10+       | Chrome 23+       | `var`, `Array.prototype.forEach`, `map`, `filter`, `Object.keys`, strict mode                                                                                             |   |                   |
| **ES2015 (ES6)** | 6          | 12+       | Chrome 49+       | `let`, `const`, arrow functions `=>`, classes, modules (`import/export`), template literals, destructuring, default params, **spread/rest `...`**, `Promise`, `Map`/`Set` |   |                   |
| **ES2017**       | 8          | 14+       | Chrome 61+       | `async/await`, `Object.values()`, `Object.entries()`, shared memory (`Atomics`, `SharedArrayBuffer`)                                                                      |   |                   |
| **ES2020**       | 14         | 16+       | Chrome 80+       | optional chaining `?.`, nullish coalescing `??`, `Promise.allSettled`, `globalThis`, dynamic `import()`                                                                   |   |                   |
| **ES2022**       | 16         | 18+       | Chrome 89+       | top-level `await`, class fields, private fields `#x`, `Array.at()`, logical assignment (`                                                                                 |   | =`, `&&=`, `??=`) |
```




You’re aiming for something many library authors *wish* existed natively: a clear, machine-readable statement of **language level + runtime requirements**. You can absolutely do this—you just need to combine standard fields with a small amount of **well-structured custom metadata**.

Below is a practical system you can adopt, plus a **feature → ES → Node/browser mapping** and authoritative lookup sources.

---

# 1) Recommended `package.json` structure (real + custom)

Use standard fields for enforcement, and your own for documentation:

```json
{
  "name": "your-lib",
  "version": "1.0.0",

  "engines": {
    "node": ">=18"
  },

  "browserslist": [
    "defaults",
    "not IE 11"
  ],

  "runtime": {
    "node": ">=18",
    "browsers": "defaults"
  },

  "language": {
    "ecmaMin": "ES2017",
    "ecmaMaxTested": "ES2022",
    "features": [
      "let",
      "const",
      "classes",
      "spread",
      "promises",
      "async-await"
    ],
    "webApis": [
      "fetch",
      "AbortController"
    ],
    "nodeApis": [
      "fs/promises",
      "stream/promises"
    ]
  }
}
```

✔ `engines` → enforced by tools
✔ `browserslist` → used by build tools
✔ `language` (custom) → your quality metadata

---

# 2) Expanded ES feature reference (what you asked for)

## ES5 (baseline)

* `var`
* Array methods: `map`, `filter`, `reduce`
* `Object.keys`
* `"use strict"`

---

## ES2015 (ES6) — major jump

**Syntax**

* `let`, `const`
* arrow functions `() => {}`
* classes
* template literals `` `text ${x}` ``
* destructuring
* default parameters
* spread/rest `...`

**Built-ins**

* `Promise`
* `Map`, `Set`, `WeakMap`, `WeakSet`
* `Symbol`

---

## ES2016

* `Array.includes()`
  *(small release)*

---

## ES2017

**Syntax**

* `async/await`

**Built-ins**

* `Object.values()`
* `Object.entries()`
* `String.padStart()`, `padEnd()`

---

## ES2018

* object spread `{...obj}`
* async iterators (`for await...of`)
* `Promise.finally()`

---

## ES2019

* `Array.flat()`, `flatMap()`
* `Object.fromEntries()`
* `String.trimStart()`, `trimEnd()`

---

## ES2020

**Syntax**

* optional chaining `?.`
* nullish coalescing `??`
* dynamic `import()`

**Built-ins**

* `Promise.allSettled()`
* `globalThis`

---

## ES2021

* logical assignment: `||=`, `&&=`, `??=`
* `String.replaceAll()`
* `Promise.any()`

---

## ES2022

**Syntax**

* class fields
* private fields `#x`
* top-level `await`

**Built-ins**

* `Array.at()`
* `Object.hasOwn()`

---

# 3) Node.js-specific APIs (important for server-side)

These are **not ES features**, but runtime APIs from **Node.js**.

## Node 10+

* `fs.promises` (async file system)

## Node 12+

* stable ES modules support

## Node 14+

* optional chaining support (no transpile needed)

## Node 16+

* `stream/promises`
* better ESM support

## Node 18+

* ✅ `fetch()` (native!)
* `Web Streams API`
* `Blob`, `FormData`

Example usage you mentioned:

* `fs.promises.writeFile()` ✔ (not `writeAsync`, small correction)

---

# 4) How to derive your version fields (workflow)

### Step 1 — list features you used

Example:

```txt
let, const, classes, async/await, fetch
```

### Step 2 — map to ES level

* async/await → ES2017
  👉 result: **ES2017 minimum**

---

### Step 3 — check runtime requirements

* `fetch` in Node → requires Node 18
  👉 result:

```json
"engines": {
  "node": ">=18"
}
```

---

### Step 4 — define browsers

```json
"browserslist": [
  "defaults",
  "not IE 11"
]
```

---

# 5) Authoritative lookup sources (very important)

Use these instead of guessing:

### 🌐 Feature support (best overall)

* **Can I Use**
  → browser support per feature

### 📘 Language + APIs

* **MDN Web Docs**
  → ES features + Web APIs + examples

### 🟢 Node compatibility

* **Node.js documentation**
* [https://node.green](https://node.green)
  → ES feature support per Node version

---

# 6) Practical presets you can reuse

## A) “Classic modern” library

```json
{
  "engines": { "node": ">=14" },
  "language": { "ecmaMin": "ES2017" }
}
```

---

## B) Uses `fetch` on server

```json
{
  "engines": { "node": ">=18" },
  "language": {
    "ecmaMin": "ES2017",
    "webApis": ["fetch"]
  }
}
```

---

## C) Fully modern (no transpile mindset)

```json
{
  "engines": { "node": ">=18" },
  "language": { "ecmaMin": "ES2022" }
}
```

---

# 7) Final guidance (important)

* ✔ You **can** define `jsTarget`, `ecmaMin`, etc. → good practice
* ✔ Use `engines.node` for real enforcement
* ✔ Use `browserslist` for browser compatibility
* ❗ Always separate:

  * ES language features
  * Web APIs (`fetch`)
  * Node APIs (`fs.promises`)

---

If you want, I can:

* analyze one of your actual packages
* and generate the exact `package.json` metadata automatically from its code

That’s usually the most accurate way to ensure quality.




