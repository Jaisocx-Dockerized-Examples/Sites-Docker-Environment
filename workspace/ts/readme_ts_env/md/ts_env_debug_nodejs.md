
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)


# DEBUG NODE JS

[README.md HOME](./README.md)



## Server side scripts

  `Jaisocx-Tools/jaisocx_sites_tools/libraries/console/JsInvoke`

  > 💡 Write and store scripts to invoke in console, for debugging too.

  not published for yarn or npm for now, since no need to import in other javascript code.

  | 📖️  **Library**  | `@jaisocx/jsc_console_js_invoke` | 🏷️  **ver.**: `1.0.3` |
  
  | 🗓  **Updated**  | 🌼 Summer 2026 | `Satturday, the 13th of June, 21:59:51 UTC 2026` |
  
  | 📐  **Size**     | 🗂 Folder: 33.9 KB | 📦 Tarball: 9.3 KB | 📋 .js: 5 KB |
  
  | ⚡  **JS Engine** | 🌐 Browser: ❌ no | 🧭 Express: ❌ no | 🖥️ Console: ✅ yes |

---



## The aim of the setup
> 💡 The central place in this project,
> to store somewhere the console node scripts,
> calling other node libraries,
> locally linked or installed with yarn or npm.



**For example, to solve a task**:

    You need to invoke in console somehow the node console library "@jaisocx/css-importer", for debug, too.


You need first a custom `.js` script, that uses js classes from the imported node library `"@jaisocx/css-importer"`.

The `.js` script is invoked then in console,
and console commands can be stored as `.sh` scripts.

In our Jaisocx Typescript Environment project, `.js` scripts are invoked in **console** very very easy, using **docker the right way** thanks to the console base bash script `command/base/js_invoke.sh`.

Also, in `${TypescriptEnvironment}/cmd` folder, there we have `.sh` scripts, these can be used as examples or templates.

  ```bash
    ### You need custom script for package @jaisocx/css-importer
    ### Invokes in console like this:
    ./cmd/cssImporter.sh  --debug
  ```

Try, You'll see later how convinient to run commands, prestored in `.sh` scripts with all command line args, no retyping in console, but saved in `.sh` script.



## Calls flow

1. **bash** `cmd/cssImporter.sh`

2. **bash** `command/base/js_invoke.sh`

3. **node** `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke/transpiled/ESNext/invokeCssImporter.js`

4. **node** `"@jaisocx/css-importer"`



## Why good

The Jaisocx bash infrastructure allows the very ease way
to accept command line shell args
in node console scripts thanks to
**base bash script** `${TypescriptEnvironment}/command/base/js_invoke.sh`
and the **node library** `@jaisocx/command-line`.


1. **Stored Centrally**: Easy to get know One **console/JsInvoke folder** for all `typescript` files ( `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke` ), to invoke in terminal.

2. **Local node_modules as a sandbox just for console examples**: These scripts then can be debugged
   in the context of the local `node_modules`
   and `package.json` and `package-lock.json` in this folder `${TypescriptEnvironment}/workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke`,
   for example to **link** other
   imported `js` libraries,
   **to navigate via symlink at debug time to source code** in this project,
   and not to the installed subfolder in the local `node_modules/@jaisocx/...`.

3. **Nice command line args format**: The **Jaisocx bash infrastructure** supports for **command line args** the since longer **best coding practice format** like this: `--arg="whatever"`

4. **Easy read in typescript**: the  **command line args** are available like this: ` commandArgs.arg `

5. The cleaver **typescript variable Root** `commandArgs.Root`,
   pointing to the **folder** `./workspace/ts`, set in `.env` file for **docker** context.

  ```
    .env
        PROJECT_VOLUME="./workspace/ts"
        IN_DOCKER_WORKSPACE_VOLUME="/opt/jaisocx/sites_docker_environment/workspace/ts"
            => docker-compose.yml
  ```

6. **CLI arg --debug**: The easy to notice **command line arg** `--debug` for **node console .js debug**.



## How does it work

### 1. Writing a custom script to invoke in console.

1. **write** in **console/JsInvoke** custom **typescript** code
   in a `.ts` file in folder `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke/src/`
   like in example: `invokeCssImporter.ts`

2. **transpile** on demand with ProjectBuilder.

> since 2025 node invokes both, javascript and typescript,
> and in this project typescript via node didn't test yet.
> We still shall support legacy, very good for deploy and Your sites user experience multiplatform Long term suppport (LTS).



### 2. Invoke in console

3. **write bash script** calling this new custom `.ts` script ( transpiled to `.js` in folder `transpiled/ESNext/` ) **like in the example**: `./cmd/cssImporter.sh`

4. **invoke** like this in **local terminal**.
   The good thing is, You are sure, this new custom `.js` is **called in docker the right way**, while, on demand, **easy** knew the arg to start **node debug**:

  ```bash
  
    ./cmd/cssImporter.sh --debug
  ```



## Bash Coding Example
> 2 code lines ( bash | sh )

  ```bash

    # invokes the .js from example below 'ts coding example'
    node invokeJsInConsoleExample.js --Root="/home/user/MyProject" --sitesToolPath="sites_tools/SitesTool"
  ```



  ```bash
  
    ./cmd/cssImporter.sh --debug
  ```



**./cmd/cssImporter.sh**

The example is thought for copy and save as other **bash** script in the same folder `./cmd`,
hardcoding there other command line args, for calling another `.js` file.

The reusable via copy/paste working `bash` example to invoke a custom bash script,
however nearly same like in ProjectBuilder's `ts` code,
on the imported to `node_modules/@jaisocx/css-importer`,
available in typescript code,
the typescript package `@jaisocx/css-importer`:
`cmd/cssImporter.sh`



  ```bash
    
    ### TypescriptEnvironment
    ### ./cmd/cssImporter.sh
    
    ### https://github.com/Jaisocx-Tools/TypescriptEnvironment/
    ### https://github.com/Jaisocx-Tools/TypescriptEnvironment/blob/main/cmd/cssImporter.sh
    
    ### Line 55:
    
      "${jsInvokePath}" "$commandLineArgs" \
        --Root="${IN_DOCKER_WORKSPACE_VOLUME}" \
        --BuildData="${IN_DOCKER_WORKSPACE_VOLUME}/ts/BuildData.json" \
        --packagePath="Jaisocx_SitesTools/console/JsInvoke" \
        --script="invokeCssImporter.js" \
            --sitesToolPath="Jaisocx_SitesTools/libraries/sites_tools/css_tools/CssCleanStart_2" \
            --cssFilePath="MediaAndStyles/CssCleanStart_2_main_Webpack.css" \
            --cssTargetFilePath="MediaAndStyles/CssCleanStart_2_543_resolved.css"
    
  ```



## Bash example explained

Let's imagine, the task was to write and to invoke a custom `.js` file
for test or debug purposes of `.js` package `@jaisocx/css-importer`.

For console scripts, I started folder **JsInvoke** `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke`,
where the first example for `@jaisocx/css-importer` resides:
`src/invokeCssImporter.ts`.

The script `invokeCssImporter.ts` implements free logic for tasks using `@jaisocx/css-importer` package,
and for tests or debug purposes, the transpiled `.js` file can be invoked the very ease way like in the example bash script: `cmd/cssImporter.sh`



## Base scripts and libraries

### 1. Command line shell

There is the base script in command line shell scripting language `bash`
to invoke a `.js` file the nice way.

**js_invoke** `command/base/js_invoke.sh`



### 2. Typescript

In order to invoke in terminal a .js file,
there are 2 base Typescript packages:

1. **CommandLine** `workspace/ts/cloned_repos/jaisocx_sitestools/packages/CommandLine`

2. **JsInvoke** `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke`



## Structure

  ```ls
  📚 JsInvoke
      🗂 node_modules/
        🗂 @jaisocx/
          🗂 comand-line/
          🗂 css-importer/
          🗂 event-emitter/
          🗂 file-writer/
          🗂 tokens-parser/
      🗂 src/
        📄 index.ts
        📄 invokeCssImporter.ts
      📊 test/
      🗂 transpiled/
        🗂 CommonJS/
        🗂 ESNext/
          ...
          📄 invokeCssImporter.js
          ...
      📦 jaisocx-jsc_console_js_invoke-1.0.3.tgz
      📄 example_package_json
      📄 example_package-lock_json
      📒 README.md
  ```



### 3. Debug
> 2 options: easier in local OS, or finer under docker.



### 3.A) Debugs easier
> Debug Not in docker, in local OS

> package.json "scripts"."start": "node ... invokeCssImporter.js" in Microsoft Visual Studio Code IDE (VSCode) choose option "start debug"



**Microsoft Visual Studio Code IDE (VSCode)** debugs node scripts out-of-the-box.

Like a charm.

**Microsoft Visual Studio Code** remains since longer the only IDE with debug for js and other programming languages, without have required payments for plugins in addition.

**Microsoft Visual Studio Code** supports the most of known OS like `Microsoft Windows`, `Linux` ( Linux Ubuntu, Linux under Microsoft Windows WSL ), Apple Macintosh OS `MacOS`.

**Do like this**: In `package.json`, in the json property "scripts", You may set a **bash script, invoking node cli**,
like the example json code snippet below.
In VSCode in opened for view `package.json`,
mouse over json object property name `"scripts"."start"` shows command option "debug".
Debug works really like a charm, without no having had need of plugins install in addition.

**Path in the Jaisocx Typescript Environment project**: `workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke/package.json`

**Runs | Debugs "invokeCssImporter.js" via node cli** in this `package.json` Line 17

  ```json
    1:  {
          ...
          {
          ...
          ...
          },
    16:   "scripts": {
    17:     "start": "node ./transpiled/ESNext/invokeCssImporter.js"
    18:   },
          ...
        }
  ```



I didn't try to set a custom `.sh` script in the `package.json` "scripts"."start",
neither know for now, how then to notice where our central `cmd` folder for bash `.sh` scripts in this project)).

Just invokes on `node` cli in `package.json` "scripts" are well seen
in repos for `js` libs, like `yarn` or `npm`.
Repos for js libs are thought for `.js`, not for `.sh` command line scripts.



### 3.B) Debug finer, under Docker. Microsoft Visual Studio Code, too.
>  💡  Alpine Image with fixed versions numbers of node, typescript and other software.

**launch.json**

  ```bash
    
    cp -a  "./.vscode/example_launch_json"  "./.vscode/launch.json"
  ```



  ```json
    // ./.vscode/launch.json
    "configurations": [
      {
        "name": "JS Docker Server Side",
        "type": "node",
        "request": "attach",
        "protocol": "inspector",
        "address": "localhost",
        "port": 9229,
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/opt/jaisocx/sites_tools",
        "skipFiles": [
          "<node_internals>/**"
        ]
      },
      {
        "name": "Debug Site",
  ```



#### Why under Docker well
>  💡  Fixed numbers of versions of software packages and all confs relevant just to this project, not touching Host OS confs and software bundles installed.



The **Jaisocx Typescript Environment** Project was started **under Docker**
for architecturing later the finer control about:

- **Known OS and Command Line Shell**, like for now `Alpine ver. 3.22.2`, knew that **with Bash**, not just sh,
  known Users Groups and Users' Names and IDs, also whether with sudier users' group.

- **Known set of software packages**, installed for NodeJS and Typescript on Your Computer,

- **Fixed versions numbers** for NodeJS, Node Package Managing Software, Typescript versions,

- **Turning on|off** the https endpoints ran on Your Computer, **serving Your sites**, in engineering mode.



### 3.D) Client or server: in debug time, the server-side scripts interpreting languages under docker
>   💡  both two confs, IDE's debugging addon, and under docker scripting language interpreting engine,
>          set in debug configurations the same debug server port number.
>          Then, no one knows, whether the IDE registers the port, or under docker the scripts interpreting engine registeres the port.
>          For example, php-fpm server-client debug scheme the one way, and node the other, (client-server).



For debug, the IDE debugging addon (under Host OS), or server-side scripts interpreting language (under Docker), starts a debugging server.

IDE works under Host OS, and scripts interpreting language engine works under docker.

Docker in the docker-compose.yml opens a port, docker starts and reserves the port number.
IDE's addon on debug start, may not start a debug server, since the port is busy by docker.

Otherwise, if no port opened in docker-compose.yml, the IDE debug addon like a client,
may not connect to a server under docker, since the port isn't open.



1. **php-fpm**, when sending to browser in response `html` powered by `php`, with `XDebug module` turned on, acts like a **client**

2. **node**: `node --inspect-brk=0.0.0.0:9229`, when invokes node server-side `.js` in terminal, starts a debug **server**.

You see, that **debug docker config** for **node**, ain't same like of **php**, another programming language for sites.



**node: requires debug port in docker-compose.yml**

Since node for debug starts a server, the dockerized node service (in our setup [ts]) requires **server port** docker configs.



**php-fpm: NO debug port in docker-compose.yml**

Other server-side programming language, **php**, [php-fpm], doesn't. **No**, the under docker **php xdebug** module doesn't,
**but** the **XDebug addon in IDE** under **Host OS**, starts debugging server for php-fpm,
and reserves port for `php-fpm` xdebug IDE addon's server.
Then, the **docker** config for **php-fpm** **may not** open the **port of xdebug** server,
**otherwise** the xdebug addon in IDE **under Host OS may not start**,
the port is busy, that the IDE's debug server tries to reserve on start.



### 3.E) Theory of a server under docker

- **ip**: The **ip address** is the **ID-number** of the **computer** in the **inet**.

- **port**: The **port** of a **server** ( for example a server for sites ),
  since a server acts like a **central data exchange unit** in the **inet**,
  is the **ID-number** of a **server on a computer** in the inet, in addition to the **ip address** ( ID-number of the computer in the inet ).

Under every OS architecture, a server on start always reserves one own port number til works,
and no other servers may not start under the same port number.



A server under docker, has to open the port for connections from clients, these aren't under docker in the same docker network.

Then, the docker reserves this port, and other servers may not start under the port.

1. **hardcoded port number, not a bash variable from .env file**

**Dockerfile**

  ```Dockerfile
    # ./docker/ts/Dockerfile
    EXPOSE 9229
  ```



**docker-compose.yml**

  ```yaml
    # ./docker-compose.yml
    ts:
      ...
      ...
      ports:
        ...
        - "9229:9229"
      ...
  ```



2. **by the bash variable from .env file**

**.env**

  ```bash
    # ./.env
    NODE_DEBUG_PORT=9229
  ```



**docker-compose.yml**

  ```yaml
    # ./docker-compose.yml
    ts:
      build:
        context: "./docker/ts"
        args:
          ...
          # NODE_DEBUG_PORT from .env file,
          # for EXPOSE ${NODE_DEBUG_PORT} expression in Dockerfile
          A_NODE_DEBUG_PORT: "${NODE_DEBUG_PORT}"
      ...
      ...
      ports:
        ...
        # NODE_DEBUG_PORT from .env file
        - "${NODE_DEBUG_PORT}:${NODE_DEBUG_PORT}"
      ...
  ```



**Dockerfile**

  ```Dockerfile
    # ./docker/ts/Dockerfile

    # from docker-compose.yml:services.ts.build.args.A_NODE_DEBUG_PORT: "${NODE_DEBUG_PORT}"
    # where "${NODE_DEBUG_PORT}" from .env file
    ARG   A_NODE_DEBUG_PORT
    ENV NODE_DEBUG_PORT="${A_NODE_DEBUG_PORT}"

    # opens server port
    EXPOSE ${NODE_DEBUG_PORT}
  ```



Node invokes a server-side script in terminal, and for debugging,
the node starts under docker the listening server having a tcp port ( 9229 ) registered.

IDEs node debug addon connects to the node under docker by IP address and port number
to the dockerized node service  as a network client.

---



Have a nice day,

Jaisocx Software Architect Elias Polianskyi



