
`Docker for a Site` Jaisocx &#8482; &#169;



![../img_software_labels/softlabel_docker.svg](../img_software_labels/softlabel_docker.svg)    ![../img_software_labels/softlabel_jaisocx.svg](../img_software_labels/softlabel_jaisocx.svg)


[HOME Docker for a Site](../../../README.md)


[HOME Docker for a Site Typescript Environment](../../../README_typescript_environment.md)


[HOME Typescript Environment](./README.md)


---



#  JaisocxExpress

  >  ✨  Jaisocx  &#8482;  Express. The server-side nodejs sites framework. 
  >         Pair of js classes by Jaisocx &#8482; &#169; for the CodeIgniter like coding flavour.


  |  🗓  **Since**  |  🌾  Autumn 2026  |  `AD 2026 Oct 27 20:30:00.950 GMT_24h`

  |  🗓  **Date**   |  🌾  Autumn 2026  |  `AD 2026 Nov 05 21:18:10.000 GMT_24h`



  | ⚡  **just JS Base Engine required** | ❌ no |

  | ⚡  **Support by JS Engines** | 🌐 Browser: ❌ no | 🧭 Server-side Express: ✅ yes | 🖥️ Command Line: ❌ no |

  | ⚡  **JS Calls** | Network(fetch): ❌ no | 🌐 Browser(DOM): ❌ no | 🧭 Server-side Express(FS | DB): ✅ yes | 🖥️ Command Line: ❌ no |





##  a. Framework like opts


### Opts

  > just a constant for a dinamique url in pair of minutes coding.
  > 
  >  💡  url, art:( text | json | file ), data





####  routing opts 

  .  `routes`, configuring urls easier 


  .  `lookup_paths`, publishing folders `url:folder, url2:folder2, ...`




####  routing html opts 

  .  `html_templates`, for styling routes of `art: html_in_template`




####  routing validation opts 

  .  `allowed_hosts`, just for validation and blocks.  💡  might think on space for crawlers (  ⛔  the Express could respond by port number and any hostname in any dns or /etc/hosts by comp's ip address )




####  opts

  .  `https_port`, the tcp/ip port number reserved by a JaisocxExpress server on start (  💡  required `docker-compose.yml:ports` and `Dockerfile:EXPOSE` )


  .  `workspace`, just the base path for other paths in the entire Jaisocx Express Opts, guess the path of the workspace easier))  💡  smth all to one))


  .  `mime_types`, mime-types by filenames extensions requested from `lookup_paths` by browsers.  💡  saving up on js interpreting, keeping mime_types forEach cmp-by-key lookup object smaller.




#### exception opts

  .  `request_exception_payloads`, example for configured exceptions responses




####  art of a route in jaisocxExpressOpts

  >  💡  data due to art, renders the right way by content_type.
  >        { url: "/style",   art: "text",   data: ".clean_start { --clean_start--rem: 32px; }",   content_type: "text/css; charset=utf8" }
  

  .  `art:text`
  

  .  `art:json`

  
  .  `art:file`

  
  .  `art:html_in_template` ( title, template_key, content_type )
  




#####  html_in_template. art of a route in jaisocxExpressOpts

```json

"a_route_id": {
    "url":   "/",
    "title":   "funny humour",
    "art":   "html_in_template",
    "template_key":   "clean_start_html_template",
    "content_type":   "text/html; charset=utf8",
    "data":   "  <block>\n    <h1>Hello World!</h1>\n    </block>\n  "
}

```



```json

"html_templates": {
    "clean_start_html_template": {
        "start": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <title> {{ title }} </title>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/fonts.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/site.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/html_tags.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 16px;\n      --clean_start--site--width: 62%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n      --clean_start--body_tag--background: #f0fff5;\n    }\n  </style>\n</head>\n<body>\n  <site>\n",
        "finish": "\n  <site>\n</body>\n</html>\n\n"
    }
}

```





#### jaisocxExpressOpts Example

```javascript
const jaisocxExpressOpts = {
  "https_port": 9445,
  "allowed_hosts": [
      "local.basetasks.site:9445"
  ],
  "workspace": "/opt/jaisocx/sites_docker_environment/workspace",
  "lookup_paths": {
      "/cdn_sites/": "/cdn_sites/",
      "/jaisocx/": "/cdn_node_installs/node_modules/@jaisocx/",
  },
  "mime_types": {
      "html": "text/html; charset=utf8",
  },
  "html_templates": {
    "clean_start_html_template": {
      "start": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <title> {{ title }} </title>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/fonts.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/site.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/html_tags.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 16px;\n      --clean_start--site--width: 62%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n      --clean_start--body_tag--background: #f0fff5;\n    }\n  </style>\n</head>\n<body>\n  <site>\n",
      "finish": "\n  <site>\n</body>\n</html>\n\n"
    }
  },
  "request_exception_payloads": {
    "file_not_found": {
      "status": 404,
      "message": "File not found"
    }
  },
  "routes": {
    "funny_humour": {
     "url": "/",
     "title": "funny humour",
     "art": "html_in_template",
     "template_key": "clean_start_html_template",
     "content_type": "text/html; charset=utf8",
     "data": "  <block>\n    <h1>Hello World!</h1>\n    <p>  😠  Old engineers: we engineer intelligent machines since 1920-ieths!</p>\n    <p>Year 2025:  🚴  My hello world application took just pair of year tens of learning by doing))</p>\n    </block>\n  "
    },
    "favicon": {
     "url": "/favicon.ico",
     "art": "file",
     "data": "/cdn_sites/favicon/Icon_Jaisocx.ico"
    },
    "html_funny_humour": {
     "url": "/html_funny_humour",
     "art": "text",
     "content_type": "text/html; charset=utf8",
     "data": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/fonts.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/site.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/html_tags.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 32px;\n      --clean_start--all_tags--font-family: var(--clean_start--sans--font-family);\n      --clean_start--p--font-family: var(--clean_start--sans--font-family);\n      --clean_start--site--width: 50%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n    }\n  </style>\n</head>\n<body>\n  <site>\n    <h1>Hello World!</h1>\n    <p>  😠  Old engineers: we engineer intelligent machines since 1920-ieths!</p>\n    <p>Year 2025:  🚴  My hello world application took just pair of year tens of learning by doing))</p>\n  </site>\n</body>\n</html>\n\n"
    },
    "json_example_a": {
     "url": "/helloworld/",
     "art": "json",
     "data": { 'message': 'Hello World!' }
    }
  }
};
```






##  b. JaisocxExpress.js


>  the placeholder ... in this example like tells that the code of might several tens of lines goes there.
>    just to save up code space in the example in the readme.



```javascript
// workspace/ts/express/src/JaisocxExpress.js

const fs = require('node:fs');
const https = require('node:https');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');
const process = require('node:process');
const express = require('express');

const { TextDecoder, TextEncoder } = require('node:util');

const textDecoder = ( new TextDecoder() );
const textEncoder = ( new TextEncoder() );





const jaisocxExpressOpts = {
  "https_port": 9445,
  "allowed_hosts": [
      "local.basetasks.site:9445",
      "cdn.local.basetasks.site:9445",
      "cdn-local.basetasks.site:9445"
  ],
  "workspace": "/opt/jaisocx/sites_docker_environment/workspace",
  "lookup_paths": {
      "/cdn_sites/": "/cdn_sites/",
  ...
  ...
  ...



// JaisocxExpress classes
class JaisocxExpress...
...
...





// a. the Express
const app = express();



// b. JaisocxExpress Classes Instances
const clsJaisocxExpressApp = ( new JaisocxExpressApp() );

const clsExpressCommons            = ( new JaisocxExpressCommons() );
const clsExpressOptsCaller         = ( new JaisocxExpressOptsCaller() );
const clsExpressRequestException   = ( new JaisocxExpressRequestException() );
const clsExpressResponse           = ( new JaisocxExpressResponse() );
const clsExpressMiddleware         = ( new JaisocxExpressMiddleware() );
const clsJaisocxExpressController  = ( new JaisocxExpressController() );






// c. the ExpressApp sets classes the right way as private fields
clsJaisocxExpressApp
  .setNodeFs ( fs )
  .setNodeZlib ( zlib )
  .setNodeStreamPipeline ( pipeline )
  .setNodeUtilTextDecoder ( textDecoder )
  .setNodeUtilTextEncoder ( textEncoder )
  .setExpressCommons ( clsExpressCommons )
  .setExpressOptsCaller ( clsExpressOptsCaller )
  .setExpressOpts ( jaisocxExpressOpts )
  .setExpressRequestException ( clsExpressRequestException )
  .setExpressResponse ( clsExpressResponse )
  .setExpressMiddleware ( clsExpressMiddleware );







// d. middleware functions like the Express requires
const middlewareForDomainPolicy = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().domainPolicy(req, resp, next);
};

const middlewareForCorsPolicy = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().corsPolicy(req, resp, next);
};

const middlewareForMultipleDirectories = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().multipleDirectories(req, resp, next);
};





// e. applies JaisocxExpress middleware the Express class instance application variable
app.use( middlewareForDomainPolicy );
app.use( middlewareForCorsPolicy );
app.use( middlewareForMultipleDirectories );





// f. registers routes of express opts via Controller.register()
clsJaisocxExpressApp
  .setNodeExpressApp( app )
  .setExpressController( clsJaisocxExpressController )
  .register();





// g. starts https server
https
  .createServer (
    {
      key:  fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key' ),
      cert: fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt' ),
    },
    app
  ).listen( jaisocxExpressOpts.https_port, () => {

    console.log(`Jaisocx Express started at https://local.basetasks.site:${jaisocxExpressOpts.https_port}`);

  }
);

// end-of-file JaisocxExpress.js
```







##  c. Interfaces. JaisocxExpress


###  JaisocxExpressOptsCaller



```javascript
class JaisocxExpressOptsCaller {

  setExpressOpts( opts );

  getHttpsPort();

  getAllowedHosts();

  whetherHostAllowed ( host );

  getWorkspacePath();

  getObjLookupPaths();

  getLookupPath ( route );

  getHtmlTemplate( templateKey );

  getRoutes();

  getMimeType ( fnameExtension );

  getRequestExceptionPayload( key );

}

```






```javascript
/** 1. @requires Obj jaisocxExpressOpts */
class JaisocxExpressOptsCaller {

  setExpressOpts( opts );


  /**
   * @ret int port number or @default 9445
   */
  getHttpsPort();


  /**
   * @ret array of strings or @default array of zero length
   */
  getAllowedHosts();


  /**
  * @ret boolean
  */
  whetherHostAllowed ( host );


  /**
   * @ret String path on file system or @default ''
   */
  getWorkspacePath();


  /**
   * @ret obj
  */
  getObjLookupPaths();


  /**
   * @ret String path on file system or @default ''
  */
  getLookupPath ( route );


  getHtmlTemplate( templateKey );


  getRoutes();


  /** 'html' => 'text/html'
   * @ret String mimetype or @default 'application/binary'
   */
  getMimeType ( fnameExtension );


  /** @ret Object payload or @default Object { 'status': 500, 'message': 'Error.' } */
  getRequestExceptionPayload( key );

}

```




###  JaisocxExpressCommons



```javascript
class JaisocxExpressCommons {

  getFilenameExtension ( url );

}
```




```javascript
class JaisocxExpressCommons {

  /**
   * @ret String filename extension 'html' or @default ''
   */
  getFilenameExtension ( url );

}
```




###  JaisocxExpressRequestException 




```javascript
class JaisocxExpressRequestException {

  handleRequestException ( req, resp, payload );

  handleServerError ( req, resp, optsKey );

  handleFileNotFound ( req, resp );

  handleUrlUnsupported ( req, resp );

}
```






```javascript
/** 3. @requires Class JaisocxExpressOptsCaller */
class JaisocxExpressRequestException {

  setExpressOptsCaller( clsExpressOptsCaller );


  // @overrides
  handleRequestException ( req, resp, payload );


  // @overrides
  handleServerError ( req, resp, optsKey );


  // @overrides
  handleFileNotFound ( req, resp ) {
    this.handleServerError ( req, resp, 'file_not_found' );
  }


  // @overrides
  handleUrlUnsupported ( req, resp ) {
    this.handleFileNotFound ( req, resp );
  }

}
```





###  JaisocxExpressMiddleware




```javascript
class JaisocxExpressMiddleware {

  domainPolicy (req, resp, next);

  corsPolicy (req, resp, next);

  multipleDirectories (req, resp, next);

}
```





```javascript
/** 4.
 * @requires JaisocxExpressOptsCaller
 *    method getCdn():
 *      JaisocxExpressOptsCaller
 *      JaisocxExpressCommons
 *      JaisocxExpressRequestException
 */
class JaisocxExpressMiddleware {

  constructor() {
    this.#fs                         = ( new Object() );
    this.#textDecoder                = ( new Object() );

    this.#expressCommons             = ( new Object() );
    this.#expressOptsCaller          = ( new Object() );
    this.#expressRequestException    = ( new Object() );
    this.#expressResponse            = ( new Object() );
  }


  setNodeFs ( in_fs );
  setNodeUtilTextDecoder ( in_textDecoder );
  setExpressOpts( opts );
  setExpressCommons( cls );
  setExpressOptsCaller( cls );
  setExpressRequestException( cls );
  setExpressResponse( cls );



  domainPolicy (req, resp, next);

  corsPolicy (req, resp, next);

  multipleDirectories (req, resp, next);

}
```




###  JaisocxExpressResponse 




```javascript
class JaisocxExpressResponse {

  readAndSendFileAsIs ( req, resp, filePath, contentType );

  readAndSendJsonAsIs ( req, resp, filePath );

  readAndSendFileCompressed ( req, resp, filePath, contentType );

  readAndSendJsonCompressed ( req, resp, filePath );

}
```




```javascript

/** 5. @requires JaisocxExpressRequestException */
class JaisocxExpressResponse {

  constructor() {
    this.#fs                         = ( new Object() );
    this.#zlib                       = ( new Object() );
    this.#pipeline                   = ( new Object() );
    this.#textDecoder                = ( new Object() );
    this.#textEncoder                = ( new Object() );

    this.#expressRequestException = ( new Object() );
  }



  setNodeFs ( in_fs );
  setNodeZlib ( in_zlib );
  setNodeStreamPipeline ( in_pipeline );
  setNodeUtilTextDecoder ( in_textDecoder );
  setNodeUtilTextEncoder ( in_textEncoder );
  setExpressRequestException ( cls );


  readAndSendFileAsIs (
    req,
    resp,
    filePath,
    contentType
  );

  readAndSendJsonAsIs (
    req,
    resp,
    filePath
  );

  readAndSendFileCompressed (
    req,
    resp,
    filePath,
    contentType
  );

  readAndSendJsonCompressed (
    req,
    resp,
    filePath
  );

}

```




###  JaisocxExpressController

  >  .register() like app.get ( '/url', handler ) for every route of the express opts


```javascript
class JaisocxExpressController {

  register();

}
```




```javascript
class JaisocxExpressController {

  constructor() {
    this.#fs                         = ( new Object() );
    this.#textEncoder                = ( new Object() );
    this.#textDecoder                = ( new Object() );

    this.#nodeExpressApp             = ( new Object() );

    this.#expressCommons             = ( new Object() );
    this.#expressOptsCaller          = ( new Object() );
    this.#expressRequestException    = ( new Object() );
    this.#expressResponse            = ( new Object() );
  }


  setNodeFs ( in_fs );
  setNodeUtilTextDecoder ( in_textDecoder );
  setNodeUtilTextEncoder ( in_textEncoder );

  setNodeExpressApp ( in_expressApp );

  setExpressOpts( opts );
  setExpressCommons( cls );
  setExpressOptsCaller( cls );
  setExpressRequestException( cls );
  setExpressResponse( cls );


  register();

}
```






###  JaisocxExpressApp

  >  💡  same like the `Controller.register( opts )`, 
  >        and, before sets all: classes, middleware and opts for the controller.





```javascript
class JaisocxExpressApp {
  
    getExpressMiddleware();
    
    getExpressResponse();
    
    
    
    setNodeExpressApp ( in_expressApp );
    
    setExpressOpts( opts );
    
    setExpressMiddleware( cls );
    
    setExpressController( cls );
    


    register();

}
```






```javascript
class JaisocxExpressApp {
  
    constructor() {
      this.#fs                         = ( new Object() );
      this.#zlib                       = ( new Object() );
      this.#pipeline                   = ( new Object() );
      this.#textDecoder                = ( new Object() );
      this.#textEncoder                = ( new Object() );
  
      this.#nodeExpressApp             = ( new Object() );
  
      this.#expressCommons             = ( new Object() );
      this.#expressOptsCaller          = ( new Object() );
      this.#expressRequestException    = ( new Object() );
      this.#expressMiddleware          = ( new Object() );
      this.#expressResponse            = ( new Object() );
      this.#expressController          = ( new Object() );
    }


    
    getExpressMiddleware();
    
    getExpressResponse();
    
    
    
    setNodeFs ( in_fs );
    
    setNodeZlib ( in_zlib );
    
    setNodeStreamPipeline ( in_pipeline );
    
    setNodeUtilTextDecoder ( in_textDecoder );
    
    setNodeUtilTextEncoder ( in_textEncoder );
    
    setNodeExpressApp ( in_expressApp );
    
    setExpressOpts( opts );
    
    setExpressCommons( cls );
    
    setExpressOptsCaller( cls );
    
    setExpressRequestException( cls );
    
    setExpressResponse( cls );
    
    setExpressMiddleware( cls );
    
    setExpressController( cls );
    


    register();

}
```





---



Have a nice day, Jaisocx Inc. Software Architect Illia Polianskyi









