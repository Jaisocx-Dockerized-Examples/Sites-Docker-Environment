
const fs = require('node:fs');
const https = require('node:https');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');

const express = require('express');

const { TextDecoder, TextEncoder } = require('node:util');

const textDecoder = new TextDecoder();
// const textEncoder = new TextEncoder();
// const compressionGgip = zlib.createGzip();



const https_port = 9443;
const domain = 'local.basetasks.site';

const urls = [
    "/",
    "/cdn_sites/",
    "/favicon.ico",
    "/cdn_sites/clean_start_zero__all.css",
    "/json/",
    "/json/data/table-conf-by-express.json",
    "/json/data/table-records-by-express.json"
];





const app = express();



const readAndSendFileAsIs = function (
    req,
    resp,
    filePath,
    contentType
  ) {

    let readContents = fs.readFileSync( filePath );

    resp.status( 200 );

    resp.set (
      {
        'Content-Type': contentType,
        'Content-Length': ( '' + readContents.length ),
      }
    );

    resp.send ( readContents );

    resp.end()

};



const readAndSendJsonAsIs = function (
    req,
    resp,
    filePath
  ) {

  jsonContentType = 'application/json; utf8';

  readAndSendFileAsIs (
      req,
      resp,
      filePath,
      jsonContentType
  );

};



const readAndSendFileCompressed = function (
    req,
    resp,
    filePath,
    contentType
  ) {

    const onError = (err) => {
      if (err) {
        resp.status( 500 );
        resp.end();
        console.error('An error occurred:', err);
      }
    };



    resp.status( 200 );

    resp.set (
      {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
      }
    );



    const readStream = fs.createReadStream( filePath );

    pipeline (
        readStream,
        zlib.createGzip(),
        resp,
        onError
    );

};





const corsHeadersMiddleware = function (req, resp, next) {

      let envCors = '/opt/jaisocx/sites_docker_environment/workspace/ts/express/.env.allow-origin';
      let readEnvCorsContents = fs.readFileSync( envCors );
      let allowOriginRe = textDecoder.decode( readEnvCorsContents ).trim();
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
};

app.use( corsHeadersMiddleware );





app.get ('/', (req, resp) => {

    let clean_start_html_template = {
      "start": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <title> Express </title>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/cdn_sites/clean_start_zero__all.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 16px;\n      --clean_start--site--width: 62%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n      --clean_start--body_tag--background: #f5fff0;\n    }\n  </style>\n</head>\n<body>\n  <site>\n",
      "finish": "\n  <site>\n</body>\n</html>\n\n"
    };

    let humour_html = "  <block>\n    <h1>Hello World!</h1>\n    <p>  😠  Old engineers: we engineer intelligent machines since 1920-ieths!</p>\n    <p>Year 2025:  🚴  My hello world application took just pair of year tens of learning by doing))</p>\n    </block>\n  "

    let html_text = [
       clean_start_html_template.start,
       humour_html,
       clean_start_html_template.finish
    ].join('');

    resp.send( html_text );
    resp.end();

});



app.get ('/cdn_sites/', (req, resp) => {

    let filePath = '/opt/jaisocx/sites_docker_environment/workspace/cdn_sites/images/Logos_of_Jaisocx/Logo_left/cropped_logo_left/logo_Jaisocx_2_title_on_the_right_side.png';
    let contentType = 'image/jpeg';

    readAndSendFileAsIs (
        req,
        resp,
        filePath,
        contentType
      );

});



app.get ('/favicon.ico', (req, resp) => {

    let filePath = '/opt/jaisocx/sites_docker_environment/workspace/cdn_sites/favicon/flaticon_com_flowers_ico/023_cherry_blossom.ico';
    let contentType = 'image/x-icon';

    readAndSendFileAsIs (
        req,
        resp,
        filePath,
        contentType
      );

});



app.get ('/cdn_sites/clean_start_zero__all.css', (req, resp) => {

    let filePath = '/opt/jaisocx/sites_docker_environment/workspace/cdn_sites/example__sites_tools/css__clean_start_2026__zero/MediaAndStyles/clean_start_zero__all.css';
    let contentType = 'text/css; charset=utf8';

    readAndSendFileAsIs (
        req,
        resp,
        filePath,
        contentType
      );

});



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
  '/json/data/table-conf-by-express.json',
  (req, resp) => {

    let filePathJson = '/opt/jaisocx/sites_docker_environment/workspace/cdn_data/json/flat-data/table-conf_records_3000.json';
    let contentType = 'application/json; charset=utf8';

    readAndSendFileCompressed (
        req,
        resp,
        filePathJson,
        contentType
    );

});



app.get (
  '/json/data/table-records-by-express.json',
  (req, resp) => {

    let filePathJson = '/opt/jaisocx/sites_docker_environment/workspace/cdn_data/json/flat-data/table-records_50.json';
    let contentType = 'application/json; charset=utf8';

    readAndSendFileCompressed (
        req,
        resp,
        filePathJson,
        contentType
    );

});



https
  .createServer (
    {
      key:  fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key' ),
      cert: fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt' ),
    },
    app
  ).listen( https_port, () => {

    console.log(`Secure(https) Express Framework Server started at https://${domain}:${https_port}`);

  }
);


