
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# Versions numbers in package.json

  [README.md HOME](./README.md)

## Understanding Version Symbols

### For what:
When You wish:
1. to upgrade some of Your npm packages,
2. You have read on the newest ver. available on the package release site,
3. and You'd like to know the actual version,
4. or to get know the version installed in Your project's folder after update,
5. and to know whether the updates to `patch` and `minor` versions allowed.




### When You need npm install | update
#### 1. You have git cloned a project
normally node_modules is in .gitignore and is not stored on git repos and not available when cloned from git repos. Then You have to install npm packages after git clone.
```
npm i
```

#### 2. You have installed a new npm dependency from a registry.
```
# for example:
npm i some-npm-package
```

#### 3. You want to upgrade the npm package to newer ver.
```
# for example:
npm update some-npm-package
```



### Symbols

When you see version strings like this in package.json:
```
"some-npm-package": "^5.1.0"
```

The symbol **^** will be handled by the npm install to allow versions from 5.1.0 to 5.9.9 inklusive, since ^ symbol allows patch and minor versions when npm update.




```
Symbol    | Meaning                     | Example | Resolves to
~ Tilde   | Patch versions updates      | ~5.1.0  | from 5.1.0 to 5.1.9 inklusively
^ Dach    | Minor & patch updates       | ^5.1.0  | from 5.1.0 to 5.9.9 inklusively
>=        | Minimum allowed ver.        | >=5.1.0 | from 5.1.0 to 99999999.9.9
<=        | Maximum allowed ver.        | <=5.1.0 | from 0.0.0 to 5.1.0 inklusively
* Star    | Match any version           | *       | Any. when installs then latest, and when updates, then to latest too.
No symbol | Exact version               | 5.1.0   | 5.1.0
```



### To update a package to the absolute latest (even if outside range):

With the keyword `@latest`

```
npm install some-package@latest
```



### What to check when install or update

To know the version, this will be installed on `npm i` or `npm update`:

First check **whether You have both** `package.json` and `package-lock.json` files.

#### a) **Both** `package.json` and `package-lock.json`

1. `npm install`: (**package-lock.json**) `the exact version` of npm package and it's npm dependencies will be installed, these were set in the `package-lock.json`.

2. `npm update`: (**package.json**) `in the limited range` of versions numbers, set in the `package.json`. The newest available version, allowed by range, will be installed.







#### b) **Just one** `package.json` is available, or You `have deleted` the package-`lock`.json file.

The same as **a) 2.** (npm update: by rules in the (package.json) in the limited range)


1. `npm install` and `npm update`: (**package.json**) `in the limited range` of versions numbers, set in the `package.json`. The newest available version, allowed by range, will be installed.



### Example
`some-package: "^2.3.2"` means **allowed until** "2.9.9"` inclusively.

If **in the range bounds** the latest ver available on npm registry in this range is "2.4.1".

then "2.4.1" will be installed.

if **above range bounds** the latest ver is "4.2.2",

then may be installed, what is available on npm `until "2.9.9"`.

When in that range there is the newest "2.8.5", then the "2.8.5" will be installed, not the "4.2.2.".




### To see the version gets installed:
```
docker compose exec ts bash
/opt/jaisocx/sites_tools/workspace/ts/express
# npm install express@^5.1.0
npm update express
npm list express
```
response:
```
docker-express-example@1.0.0 /opt/jaisocx/sites_tools/workspace/ts/express
`-- express@5.1.0

```


