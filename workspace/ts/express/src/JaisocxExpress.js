
const fs = require('node:fs');
const https = require('node:https');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');
const process = require('node:process');
const express = require('express');

const { TextDecoder, TextEncoder } = require('node:util');

const textDecoder = ( new TextDecoder() );
const textEncoder = ( new TextEncoder() );

// const compressionGgip = zlib.createGzip();





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
      "/cdn_data/": "/cdn_data/",
      "/jaisocx/": "/cdn_node_installs/node_modules/@jaisocx/",
      "/sites_tools/cdn_sites/": "/ts/cloned_repos/jaisocx_sitestools/cdn_sites/",
      "/sites_tools/examples/": "/ts/cloned_repos/jaisocx_sitestools/examples/"
  },
  "mime_types": {
      "json": "application/json; charset=utf8",
      "html": "text/html; charset=utf8",
      "css": "text/css; charset=utf8",
      "js": "text/javascript; charset=utf8",
      "ts": "text/typescript; charset=utf8",
      "ico": "image/x-icon",
      "jpg": "image/jpeg",
      "png": "image/png",
      "webp": "image/webp",
      "svg": "image/svg+xml; charset=utf8"
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
    },
    "server_err": {
      "status": 503,
      "message": "Server error."
    },
    "server_response_compressed_err": {
      "status": 503,
      "message": "Server error. The file on compression hasn't been sent."
    }
  },
  "routes": {
    "index_logo_jaisocx": {
     "url": "/",
     "art": "file",
     "content_type": "image/svg+xml; charset=utf8",
     "data": "/cdn_sites/images/Logos_of_Jaisocx/Logo_left/cropped_logo_left/logo_Jaisocx_2_title_on_the_right_side.png"
    },
    "index_cdn_logo_jaisocx": {
     "url": "/cdn_sites/",
     "art": "file",
     "content_type": "image/svg+xml; charset=utf8",
     "data": "/cdn_sites/images/Logos_of_Jaisocx/Logo_left/cropped_logo_left/logo_Jaisocx_2_title_on_the_right_side.png"
    },
    "html_funny_humour": {
     "url": "/html_funny_humour",
     "art": "text",
     "content_type": "text/html; charset=utf8",
     "data": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/fonts.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/site.css\" />\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/clean_start_zero/html_tags.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 32px;\n      --clean_start--all_tags--font-family: var(--clean_start--sans--font-family);\n      --clean_start--p--font-family: var(--clean_start--sans--font-family);\n      --clean_start--site--width: 50%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n    }\n  </style>\n</head>\n<body>\n  <site>\n    <h1>Hello World!</h1>\n    <p>  😠  Old engineers: we engineer intelligent machines since 1920-ieths!</p>\n    <p>Year 2025:  🚴  My hello world application took just pair of year tens of learning by doing))</p>\n  </site>\n</body>\n</html>\n\n"
    },
    "funny_humour": {
     "url": "/funny_humour",
     "title": "funny humour",
     "art": "html_in_template",
     "template_key": "clean_start_html_template",
     "content_type": "text/html; charset=utf8",
     "data": "  <block>\n    <h1>Hello World!</h1>\n    <p>  😠  Old engineers: we engineer intelligent machines since 1920-ieths!</p>\n    <p>Year 2025:  🚴  My hello world application took just pair of year tens of learning by doing))</p>\n    </block>\n  "
    },
    "sveta_hi": {
     "url": "/sveta_hi",
     "title": "Privet",
     "art": "html_in_template",
     "template_key": "clean_start_html_template",
     "content_type": "text/html; charset=utf8",
     "data": "  <block>\n    <h1> Sveta,   🇨🇦  privet! </h1>\n    <p> доброе утро. </p>\n    </block>\n  "
    },
    "json_example_a": {
     "url": "/helloworld/",
     "art": "json",
     "data": { 'message': 'Hello World!' }
    },
    "favicon": {
     "url": "/favicon.ico",
     "art": "file",
     "data": "/cdn_sites/favicon/Icon_Jaisocx.ico"
    },
    "clean_start_fonts": {
      "url": "/clean_start_zero/fonts.css",
      "art": "file",
      "content_type": "text/css; charset=utf8",
      "data": "/cdn_sites/example__sites_tools/css__clean_start_2026__zero/MediaAndStyles/clean_start_zero__fonts.css"
    },
    "clean_start_site": {
      "url": "/clean_start_zero/site.css",
      "art": "file",
      "content_type": "text/css; charset=utf8",
      "data": "/cdn_sites/example__sites_tools/css__clean_start_2026__zero/MediaAndStyles/clean_start_zero__site.css"
    },
    "clean_start_html_tags": {
      "url": "/clean_start_zero/html_tags.css",
      "art": "file",
      "content_type": "text/css; charset=utf8",
      "data": "/cdn_sites/example__sites_tools/css__clean_start_2026__zero/MediaAndStyles/clean_start_zero__html_tags.css"
    }
  }
};





/** 1. @requires Obj jaisocxExpressOpts */
class JaisocxExpressOptsCaller {

  #expressOpts = ( new Object() );


  constructor() {
    this.#expressOpts = ( new Object() );
  }


  setExpressOpts( opts ) {
    this.#expressOpts = opts;
    return this;
  }


  /**
   * @ret int port number or @default 9445
   */
  getHttpsPort() {
    let loc_port = this.#expressOpts['https_port'] || 9445;

    return loc_port;
  }


  /**
   * @ret array of strings or @default array of zero length
   */
  getAllowedHosts() {
    let loc_allowedHosts = this.#expressOpts['allowed_hosts'] || ( new Array() );

    return loc_allowedHosts;
  }


  /**
  * @ret boolean
  */
  whetherHostAllowed ( host ) {
    let loc_host = host;
    let loc_allowedHosts = this.#expressOpts['allowed_hosts'];
    let siteHostAllowed  = loc_allowedHosts
          .find( ( ci_allowedHost ) => ( ci_allowedHost === loc_host ) ) || false;

    let retVal = ( siteHostAllowed !== false );

    return retVal;
  }


  /**
   * @ret String path on file system or @default ''
   */
  getWorkspacePath() {
    let loc_workspacePath = this.#expressOpts['workspace'] || '';

    return loc_workspacePath;
  }


  /**
   * @ret obj
  */
  getObjLookupPaths() {
    let loc_objLookupPaths = this.#expressOpts['lookup_paths'];
    return loc_objLookupPaths;
  }


  /**
   * @ret String path on file system or @default ''
  */
  getLookupPath ( route ) {
    let loc_lookupPath = this.#expressOpts['lookup_paths'][ route ] || '';
    return loc_lookupPath;
  }


  getHtmlTemplate( templateKey ) {
    let loc_htmlTemplate =  this.#expressOpts['html_templates'][ templateKey ] || { start: '', finish: '' };
    return loc_htmlTemplate;
  }


  getRoutes() {
    let loc_routes = this.#expressOpts['routes'];
    return loc_routes;
  }


  /** 'html' => 'text/html'
   * @ret String mimetype or @default 'application/binary'
   */
  getMimeType ( fnameExtension ) {

    let contentType = this.#expressOpts['mime_types'][ fnameExtension ];

    if ( ! contentType ) {
      contentType = 'application/binary';
    }

    return contentType;

  }


  /** @ret Object payload or @default Object { 'status': 500, 'message': 'Error.' } */
  getRequestExceptionPayload( key ) {
    let loc_retVal = { 'status': 500, 'message': 'Error.' };

    let loc_payload = this.#expressOpts['request_exception_payloads'][ key ] || loc_retVal;

    return loc_payload;
  }

}





/** 2. */
class JaisocxExpressCommons {

  /**
   * @ret String filename extension 'html' or @default ''
   */
  getFilenameExtension ( url ) {

    let fnameExtension = '';


    let fsDelimiterExtensionPos = url.lastIndexOf( "/" );
    let fnameDelimiterExtensionPos = url.lastIndexOf( "." );

    if (
      ( fnameDelimiterExtensionPos === (-1) )
      || (
           ( fsDelimiterExtensionPos !== (-1) )
           && ( fnameDelimiterExtensionPos < fsDelimiterExtensionPos )
         )
    ) {
      return fnameExtension;
    }


    fnameDelimiterExtensionPos++;
    fnameExtension = url.substr( fnameDelimiterExtensionPos );

    return fnameExtension;

  }

}





/** 3. @requires Class JaisocxExpressOptsCaller */
class JaisocxExpressRequestException {

  #expressOptsCaller = ( new Object() );


  constructor() {

    this.#expressOptsCaller = ( new Object() );

  }


  setExpressOptsCaller( clsExpressOptsCaller ) {
    this.#expressOptsCaller = clsExpressOptsCaller;
    return this;
  }



  // @overrides
  handleRequestException ( req, resp, payload ) {

    let loc_reqMethod = req.method;

    resp.status( payload.status );

    if (
      ( loc_reqMethod === 'head' )
      || ( loc_reqMethod === 'options' )
    ) {
      resp.end()

    } else {
      if ( req.get( 'Accept' ) === 'application/json' ) {
        resp.json ( payload );

      } else {

        // in theory, html template for exceptions,
        //   in a future release I read .html template from fs.
        resp.send( payload.message );
      }

      resp.end()
    }

  }

  // @overrides
  handleServerError ( req, resp, optsKey ) {
    let loc_key = optsKey || 'server_err';

    let loc_payload = this.#expressOptsCaller.getRequestExceptionPayload( loc_key );

    let in_payload = {...loc_payload};
    in_payload.url = req.url;

    this.handleRequestException ( req, resp, in_payload );

  }



  // @overrides
  handleFileNotFound ( req, resp ) {
    this.handleServerError ( req, resp, 'file_not_found' );
  }

  // @overrides
  handleUrlUnsupported ( req, resp ) {
    this.handleFileNotFound ( req, resp );
  }

}





/** 4.
 * @requires JaisocxExpressOptsCaller
 *    method getCdn():
 *      JaisocxExpressOptsCaller
 *      JaisocxExpressCommons
 *      JaisocxExpressRequestException
 */
class JaisocxExpressMiddleware {

  #fs                         = ( new Object() );
  // #zlib                       = ( new Object() );
  // #pipeline                   = ( new Object() );
  #textDecoder                = ( new Object() );
  // #textEncoder                = ( new Object() );

  #expressCommons             = ( new Object() );
  #expressOptsCaller          = ( new Object() );
  #expressRequestException    = ( new Object() );
  #expressResponse            = ( new Object() );


  constructor() {
    this.#fs                         = ( new Object() );
    // this.#zlib                       = ( new Object() );
    // this.#pipeline                   = ( new Object() );
    this.#textDecoder                = ( new Object() );
    // this.#textEncoder                = ( new Object() );

    this.#expressCommons             = ( new Object() );
    this.#expressOptsCaller          = ( new Object() );
    this.#expressRequestException    = ( new Object() );
    this.#expressResponse            = ( new Object() );
  }



  setNodeFs ( in_fs ) {
    this.#fs = in_fs;
    return this;
  }

  /* setNodeZlib ( in_zlib ) {
    this.#zlib = in_zlib;
    return this;
  } */

  /* setNodeStreamPipeline ( in_pipeline ) {
    this.#pipeline = in_pipeline;
    return this;
  } */

  setNodeUtilTextDecoder ( in_textDecoder ) {
    this.#textDecoder = in_textDecoder;
    return this;
  }



  setExpressOpts( opts ) {
    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    this.#expressOptsCaller.setExpressOpts( opts );

    return this;
  }

  setExpressCommons( cls ) {
    this.#expressCommons          = cls;
    return this;
  }

  setExpressOptsCaller( cls ) {
    this.#expressOptsCaller       = cls;
    return this;
  }

  setExpressRequestException( cls ) {
    this.#expressRequestException = cls;

    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    return this;
  }

  setExpressResponse( cls ) {
    this.#expressResponse = cls;

    if ( ! this.#expressRequestException ) {
      throw new Error( 'Needs JaisocxExpressRequestException class first' );
    }

    return this;
  }



  domainPolicy (req, resp, next) {

    let siteHost = req.host;
    let siteHostAllowed = this.#expressOptsCaller.whetherHostAllowed( siteHost );

    if ( ! siteHostAllowed ) {
      resp.status(500);
      resp.end()
    }

    next()

  }



  corsPolicy (req, resp, next) {

    // let envCors = '/opt/jaisocx/sites_docker_environment/workspace/ts/express/.env.allow-origin';
    let loc_workspacePath = this.#expressOptsCaller.getWorkspacePath();
    let envCors = [ loc_workspacePath, '/ts/express/.env.allow-origin' ].join('');


    let readEnvCorsContents = this.#fs.readFileSync( envCors );
    let allowOriginRe       = this.#textDecoder.decode( readEnvCorsContents ).trim();
    // console.log( allowOriginRe );

    // let re = /^https:\/\/([a-z0-9]+\.)*basetasks\.site(:[0-9]{2,5})*$/;
    let re = new RegExp( allowOriginRe );



    let origin = req.get( 'Origin' );
    // console.log( origin );

    let allowOrigin = '';

    if ( re.test( origin ) ) {
      allowOrigin = origin;
    }

    resp.set (
      {
        'Access-Control-Request-Method': 'OPTIONS',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS'
      }
    );

    if ( req.method === "OPTIONS" ) {
      resp.status(204);
      resp.header( { 'Content-Length': '0' } );
      resp.end()
    }


    next()
  }



  multipleDirectories (req, resp, next) {

    let logs = ( new Object() );

    // let workspacePath = '/opt/jaisocx/sites_docker_environment/workspace';
    let workspacePath = this.#expressOptsCaller.getWorkspacePath();
    let lookupPaths   = this.#expressOptsCaller.getObjLookupPaths();

    let ar_keysLookupPaths = Object.keys( lookupPaths );

      logs.workspacePath = workspacePath;
      logs.lookupPaths = lookupPaths;
      logs.ar_keysLookupPaths = ar_keysLookupPaths;


    let loc_urlStr = req.url;
      logs.loc_urlStr = loc_urlStr;

    let loc_urlLength = loc_urlStr.length;
      logs.loc_urlLength = loc_urlLength;

    let ar_filteredLookupPaths = ar_keysLookupPaths
      .filter( ( ci_lookupUrl ) => ( loc_urlLength >= ci_lookupUrl.length ) );

      logs.ar_filteredLookupPaths = ar_filteredLookupPaths;



    let ar_comparedUrls = ( new Array() );

    if ( ar_filteredLookupPaths && ( ar_filteredLookupPaths.length != 0 ) ) {

      ar_comparedUrls = ar_filteredLookupPaths
        .map (
          ( ci_lookupUrl ) => {
            let ci_len = ci_lookupUrl.length;

            let ci_route  = loc_urlStr.substr( 0, ci_len );
            let ci_found  = ( ci_lookupUrl === ci_route );
            let ci_url    = "";

            if ( ci_found ) {
              ci_url = loc_urlStr.substr( ci_len );
            }

            let ci_retVal = { 'found': ci_found, 'route': ci_route, 'url': ci_url };

            return ci_retVal;
          }
        );
    }

      logs.ar_comparedUrls = ar_comparedUrls;



    let ar_filteredUrlObjs = ( new Array() );

    if ( ar_comparedUrls && ( ar_comparedUrls.length != 0 ) ) {
      ar_filteredUrlObjs = ar_comparedUrls
        .filter( ( obj ) => obj.found );
    }
      logs.ar_filteredUrlObjs = ar_filteredUrlObjs;



    let ar_foundLongestUrlObj = ( new Array() );

    if ( ar_filteredUrlObjs && ( ar_filteredUrlObjs.length != 0 ) ) {
      ar_foundLongestUrlObj = ar_filteredUrlObjs[0];
        logs.dbgArr = ( new Array() );
    }

    if ( ar_filteredUrlObjs.length > 1 ) {

      ar_filteredUrlObjs
        .reduce (
          ( obj_r, obj_curr ) => {

            // logs.dbgArr.push( { obj_r, obj_curr } );

            if ( obj_r.route.length < obj_curr.route.length ) {
              obj_r.route = obj_curr.route;
              obj_r.url   = obj_curr.url;
            }

          },
          ar_foundLongestUrlObj
        );

    }

    logs.ar_foundLongestUrlObj = ar_foundLongestUrlObj;


    let loc_route       = ar_foundLongestUrlObj.route;
    let loc_relativeUrl = ar_foundLongestUrlObj.url;



    if ( loc_route ) {

      let loc_filenameExtension = this.#expressCommons.getFilenameExtension( loc_relativeUrl );

      if ( loc_filenameExtension.length === 0 ) {
        this.#expressRequestException.handleUrlUnsupported ( req, resp );

      } else {

        let loc_pathRoute = this.#expressOptsCaller.getLookupPath( loc_route );
          logs.loc_pathRoute = loc_pathRoute;

        let loc_filePath = [ workspacePath, loc_pathRoute, loc_relativeUrl ].join( '' );
          logs.loc_filePath = loc_filePath;

        if ( ! this.#fs.existsSync( loc_filePath ) ) {
          this.#expressRequestException.handleFileNotFound ( req, resp );

        } else {

          let loc_contentType = this.#expressOptsCaller.getMimeType( loc_filenameExtension );

          /* resp
            .status ( 200 )
            .json (
              {
                'reponse_art': 'Test Zaglushka',
                'url': req.url,
                loc_relativeUrl,
                loc_filenameExtension,
                loc_contentType,
                logs
              }
            );
          resp.end(); */


          this.#expressResponse.readAndSendFileCompressed (
            req,
            resp,
            loc_filePath,
            loc_contentType
          );

        }
      }

    } else {
      next()
    }


  }

}





/** 5. @requires JaisocxExpressRequestException */
class JaisocxExpressResponse {

  #fs                         = ( new Object() );
  #zlib                       = ( new Object() );
  #pipeline                   = ( new Object() );
  #textDecoder                = ( new Object() );
  #textEncoder                = ( new Object() );

  #expressRequestException = ( new Object() );

  constructor() {
    this.#fs                         = ( new Object() );
    this.#zlib                       = ( new Object() );
    this.#pipeline                   = ( new Object() );
    this.#textDecoder                = ( new Object() );
    this.#textEncoder                = ( new Object() );

    this.#expressRequestException = ( new Object() );
  }



  setNodeFs ( in_fs ) {
    this.#fs = in_fs;
    return this;
  }

  setNodeZlib ( in_zlib ) {
    this.#zlib = in_zlib;
    return this;
  }

  setNodeStreamPipeline ( in_pipeline ) {
    this.#pipeline = in_pipeline;
    return this;
  }

  setNodeUtilTextDecoder ( in_textDecoder ) {
    this.#textDecoder = in_textDecoder;
    return this;
  }

  setNodeUtilTextEncoder ( in_textEncoder ) {
    this.#textEncoder = in_textEncoder;
    return this;
  }

  setExpressRequestException ( cls ) {
    this.#expressRequestException = cls;
    return this;
  }



  readAndSendFileAsIs (
    req,
    resp,
    filePath,
    contentType
  ) {

    let readContents = this.#fs.readFileSync( filePath );

    resp.status( 200 );

    resp.set (
      {
        'Express-Middleware': 'Jaisocx Express 2026',
        'Content-Type': contentType,
        'Content-Length': ( '' + readContents.length ),
      }
    );

    resp.send ( readContents );

    resp.end()

  }



  readAndSendJsonAsIs (
    req,
    resp,
    filePath
  ) {

    let jsonContentType = 'application/json; utf8';

    this.readAndSendFileAsIs (
        req,
        resp,
        filePath,
        jsonContentType
    );

  }



  readAndSendFileCompressed (
    req,
    resp,
    filePath,
    contentType
  ) {

    const loc_onError = (err) => {
      if (err) {
        this.#expressRequestException.handleServerError( req, resp, 'server_response_compressed_err' );

        console.error('An error occurred:', err);
      }
    };



    resp.status( 200 );

    resp.set (
      {
        'Express-Middleware': 'Jaisocx Express 2026',
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
      }
    );



    const loc_readStream = this.#fs.createReadStream( filePath );

    this.#pipeline (
        loc_readStream,
        this.#zlib.createGzip(),
        resp,
        loc_onError
    );

  }



  readAndSendJsonCompressed (
    req,
    resp,
    filePath
  ) {

    let jsonContentType = 'application/json; utf8';

    this.readAndSendFileCompressed (
        req,
        resp,
        filePath,
        jsonContentType
    );

  }

}





class JaisocxExpressController {


  #fs                         = ( new Object() );
  // #zlib                       = ( new Object() );
  // #pipeline                   = ( new Object() );
  #textEncoder                = ( new Object() );
  #textDecoder                = ( new Object() );

  #nodeExpressApp             = ( new Object() );

  #expressCommons             = ( new Object() );
  #expressOptsCaller          = ( new Object() );
  #expressRequestException    = ( new Object() );
  #expressResponse            = ( new Object() );


  constructor() {
    this.#fs                         = ( new Object() );
    // this.#zlib                       = ( new Object() );
    // this.#pipeline                   = ( new Object() );
    this.#textEncoder                = ( new Object() );
    this.#textDecoder                = ( new Object() );

    this.#nodeExpressApp             = ( new Object() );

    this.#expressCommons             = ( new Object() );
    this.#expressOptsCaller          = ( new Object() );
    this.#expressRequestException    = ( new Object() );
    this.#expressResponse            = ( new Object() );
  }



  setNodeFs ( in_fs ) {
    this.#fs = in_fs;
    return this;
  }

  /* setNodeZlib ( in_zlib ) {
    this.#zlib = in_zlib;
    return this;
  }*/

  /* setNodeStreamPipeline ( in_pipeline ) {
    this.#pipeline = in_pipeline;
    return this;
  } */

  setNodeUtilTextDecoder ( in_textDecoder ) {
    this.#textDecoder = in_textDecoder;
    return this;
  }

  setNodeUtilTextEncoder ( in_textEncoder ) {
    this.#textEncoder = in_textEncoder;
    return this;
  }



  setNodeExpressApp ( in_expressApp ) {
    this.#nodeExpressApp = in_expressApp;
    return this;
  }



  setExpressOpts( opts ) {
    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    this.#expressOptsCaller.setExpressOpts( opts );

    return this;
  }

  setExpressCommons( cls ) {
    this.#expressCommons          = cls;
    return this;
  }

  setExpressOptsCaller( cls ) {
    this.#expressOptsCaller       = cls;
    return this;
  }

  setExpressRequestException( cls ) {
    this.#expressRequestException = cls;

    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    return this;
  }

  setExpressResponse( cls ) {
    this.#expressResponse = cls;

    if ( ! this.#expressRequestException ) {
      throw new Error( 'Needs JaisocxExpressRequestException class first' );
    }

    return this;
  }





  register() {

    let loc_routes = this.#expressOptsCaller.getRoutes();
    let loc_keys = Object.keys( loc_routes );

    loc_keys.forEach (
      ( ci_key ) => {

        let oRoute = loc_routes[ ci_key ];
        let ci_url = oRoute.url;

        // text || json || file
        if ( oRoute.art === "file" ) {
        // file

          let loc_workspacePath = this.#expressOptsCaller.getWorkspacePath();
          let filePath = [ loc_workspacePath, oRoute.data ].join('');
          let fnameExtension = this.#expressCommons.getFilenameExtension( oRoute.data );
          let contentType = this.#expressOptsCaller.getMimeType( fnameExtension );



          this.#nodeExpressApp.get (
            ci_url,
            (req, resp) => {

              this.#expressResponse.readAndSendFileAsIs (
                req,
                resp,
                filePath,
                contentType
              );

            }
          );


        } else if ( oRoute.art === "json" ) {
        // json

          let json = oRoute.data;

          this.#nodeExpressApp.get (
            ci_url,
            (req, resp) => {

              resp.status( 200 );
              resp.json( json );
              resp.end();

            }
          );


        } else if (
          ( oRoute.art === "text" )
          || ( oRoute.art === "html_in_template" )
        ) {
          // text || html

          let ci_text = "";
          let ci_title = oRoute.title || ci_key;

          if ( oRoute.art === "text" ) {
            ci_text = oRoute.data;
          } else if ( oRoute.art === "html_in_template" ) {
            let ci_htmlTemplate = this.#expressOptsCaller.getHtmlTemplate( oRoute.template_key );
            let ci_startHtmlTemplate = ci_htmlTemplate.start.replace( '{{ title }}', ci_title );

            ci_text = [
              ci_startHtmlTemplate,
              oRoute.data,
              ci_htmlTemplate.finish
            ].join('');
          }


          // oRoute.data => ci_text => encContents
          let encContents = this.#textEncoder.encode( ci_text, 'utf8' );
          let contentType = oRoute.content_type;

          this.#nodeExpressApp.get (
            ci_url,
            (req, resp) => {

              resp.status( 200 );
              resp.set( { 'Content-Type': contentType, 'Express-Middleware': 'Jaisocx Express 2026' } );
              resp.send( encContents );
              resp.end();

            }
          );

        }

      }
    );
  }

}





class JaisocxExpressApp {

  #fs                         = ( new Object() );
  #zlib                       = ( new Object() );
  #pipeline                   = ( new Object() );
  #textDecoder                = ( new Object() );
  #textEncoder                = ( new Object() );

  #nodeExpressApp             = ( new Object() );

  #expressCommons             = ( new Object() );
  #expressOptsCaller          = ( new Object() );
  #expressRequestException    = ( new Object() );
  #expressMiddleware          = ( new Object() );
  #expressResponse            = ( new Object() );
  #expressController          = ( new Object() );


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



  getExpressMiddleware() {
    const loc_middleware = this.#expressMiddleware;
    return loc_middleware;
  }

  getExpressResponse() {
    const loc_expressResponse = this.#expressResponse;
    return loc_expressResponse;
  }



  setNodeFs ( in_fs ) {
    this.#fs = in_fs;
    return this;
  }

  setNodeZlib ( in_zlib ) {
    this.#zlib = in_zlib;
    return this;
  }

  setNodeStreamPipeline ( in_pipeline ) {
    this.#pipeline = in_pipeline;
    return this;
  }

  setNodeUtilTextDecoder ( in_textDecoder ) {
    this.#textDecoder = in_textDecoder;
    return this;
  }

  setNodeUtilTextEncoder ( in_textEncoder ) {
    this.#textEncoder = in_textEncoder;
    return this;
  }



  setNodeExpressApp ( in_expressApp ) {
    this.#nodeExpressApp = in_expressApp;
    return this;
  }



  setExpressOpts( opts ) {
    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    this.#expressOptsCaller.setExpressOpts( opts );

    return this;
  }

  setExpressCommons( cls ) {
    this.#expressCommons          = cls;
    return this;
  }

  setExpressOptsCaller( cls ) {
    this.#expressOptsCaller       = cls;
    return this;
  }

  setExpressRequestException( cls ) {
    this.#expressRequestException = cls;

    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    this.#expressRequestException.setExpressOptsCaller( this.#expressOptsCaller );
    return this;
  }


  setExpressResponse( cls ) {
    this.#expressResponse         = cls;


    if ( ! this.#fs ) {
      throw new Error( 'Needs node:fs library first' );
    }

    if ( ! this.#zlib ) {
      throw new Error( 'Needs node:zlib class first' );
    }

    if ( ! this.#pipeline ) {
      throw new Error( 'Needs node:stream pipeline class first' );
    }

    if ( ! this.#textDecoder ) {
      throw new Error( 'Needs node:util { TextDecoder } class first' );
    }

    if ( ! this.#textEncoder ) {
      throw new Error( 'Needs node:util { TextEncoder } class first' );
    }

    if ( ! this.#expressRequestException ) {
      throw new Error( 'Needs JaisocxExpressRequestException class first' );
    }


    this.#expressResponse
      .setNodeFs( this.#fs )
      .setNodeZlib( this.#zlib )
      .setNodeStreamPipeline( this.#pipeline )
      .setNodeUtilTextDecoder( this.#textDecoder )
      .setNodeUtilTextEncoder( this.#textEncoder )
      .setExpressRequestException( this.#expressRequestException );

    return this;
  }


  setExpressMiddleware( cls ) {

    this.#expressMiddleware       = cls;


    if ( ! this.#fs ) {
      throw new Error( 'Needs node:fs library first' );
    }

    if ( ! this.#textDecoder ) {
      throw new Error( 'Needs node:util { TextDecoder } class first' );
    }

    if ( ! this.#expressCommons ) {
      throw new Error( 'Needs JaisocxExpressCommons class first' );
    }

    if ( ! this.#expressOptsCaller ) {
      throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
    }

    if ( ! this.#expressRequestException ) {
      throw new Error( 'Needs JaisocxExpressRequestException class first' );
    }



    this.#expressMiddleware
      .setNodeFs( this.#fs )
      .setNodeUtilTextDecoder( this.#textDecoder )
      .setExpressCommons( this.#expressCommons )
      .setExpressOptsCaller( this.#expressOptsCaller )
      .setExpressRequestException( this.#expressRequestException )
      .setExpressResponse( this.#expressResponse );

    return this;
  }



  setExpressController( cls ) {

      this.#expressController = cls;


      if ( ! this.#fs ) {
        throw new Error( 'Needs node:fs library first' );
      }

      if ( ! this.#textDecoder ) {
        throw new Error( 'Needs node:util { TextDecoder } class first' );
      }

      if ( ! this.#textEncoder ) {
        throw new Error( 'Needs node:util { TextEncoder } class first' );
      }

      if ( ! this.#expressCommons ) {
        throw new Error( 'Needs JaisocxExpressCommons class first' );
      }

      if ( ! this.#expressOptsCaller ) {
        throw new Error( 'Needs JaisocxExpressOptsCaller class first' );
      }

      if ( ! this.#expressResponse ) {
        throw new Error( 'Needs JaisocxExpressResponse class first' );
      }



      this.#expressController
        .setNodeFs( this.#fs )
        .setNodeUtilTextDecoder( this.#textDecoder )
        .setNodeUtilTextEncoder( this.#textEncoder )
        .setNodeExpressApp( this.#nodeExpressApp )
        .setExpressCommons( this.#expressCommons )
        .setExpressOptsCaller( this.#expressOptsCaller )
        .setExpressRequestException( this.#expressRequestException )
        .setExpressResponse( this.#expressResponse );

      return this;
    }



    register() {
      this.#expressController.register();

      return this;
    }

}





const app = express();

const clsJaisocxExpressApp = ( new JaisocxExpressApp() );

const clsExpressCommons            = ( new JaisocxExpressCommons() );
const clsExpressOptsCaller         = ( new JaisocxExpressOptsCaller() );
const clsExpressRequestException   = ( new JaisocxExpressRequestException() );
const clsExpressResponse           = ( new JaisocxExpressResponse() );
const clsExpressMiddleware         = ( new JaisocxExpressMiddleware() );
const clsJaisocxExpressController  = ( new JaisocxExpressController() );



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



const middlewareForDomainPolicy = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().domainPolicy(req, resp, next);
};

const middlewareForCorsPolicy = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().corsPolicy(req, resp, next);
};

const middlewareForMultipleDirectories = function (req, resp, next) {
  clsJaisocxExpressApp.getExpressMiddleware().multipleDirectories(req, resp, next);
};



app.use( middlewareForDomainPolicy );
app.use( middlewareForCorsPolicy );
app.use( middlewareForMultipleDirectories );



clsJaisocxExpressApp
  .setNodeExpressApp( app )
  .setExpressController( clsJaisocxExpressController )
  .register();





app.get (
    '/json/',
    (req, resp) => {

      resp
        .status ( 200 )
        .json (
          {'message': 'Hello World!'}
        );

      resp.end()
});



app.get (
    '/usr/',
    (req, resp) => {

      let username = process.geteuid();

      resp
        .status ( 200 )
        .json (
          {'message': 'Hello World!', "username": username }
        );

      resp.end()
});



app.get (
  '/json/data/table-conf-by-express.json',
  (req, resp) => {

    let filePathJson = '/opt/jaisocx/sites_docker_environment/workspace/cdn_data/json/flat-data/table-conf_records_3000.json';
    let contentType = 'application/json; charset=utf8';

    clsJaisocxExpressApp.getExpressResponse().readAndSendJsonCompressed (
        req,
        resp,
        filePathJson
    );

});



app.get (
  '/json/data/table-records-by-express.json',
  (req, resp) => {

    let filePathJson = '/opt/jaisocx/sites_docker_environment/workspace/cdn_data/json/flat-data/table-records_50.json';
    let contentType = 'application/json; charset=utf8';

    clsJaisocxExpressApp.getExpressResponse().readAndSendJsonCompressed (
        req,
        resp,
        filePathJson
    );

});



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


