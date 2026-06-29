const fs = require('node:fs');
const https = require('node:https');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');
const express = require('express');
const { TextDecoder, TextEncoder } = require('node:util');



const https_port = 9443;
const textDecoder = new TextDecoder();
// const textEncoder = new TextEncoder();
// const compressionGgip = zlib.createGzip();



const app = express();

const corsHeadersMiddleware = function (req, resp, next) {

      let envCors = '/opt/jaisocx/sites_tools/workspace/ts/express/.env.allow-origin';
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
        resp.header( { 'Content-Length': 0 } );
        resp.status( 204 );
        return;
      }

      next()
};

app.use( corsHeadersMiddleware );



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



app.get ('/', (req, resp) => {

    let filePath = '/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools/index_preview.html';
    let contentType = 'text/html; charset=utf8';

    readAndSendFileCompressed (
        req,
        resp,
        filePath,
        contentType
      );

//    resp.send('<h1>Hello from Express via https!</h1><a href="/json/">example json</a>');
});



app.get (
    '/json/',
    (req, resp) => {

      resp
        .status ( 200 )
        .json (
          {'message': 'Hello World!'}
        );

});



app.get (
  '/json/data/table-conf-by-express.json',
  (req, resp) => {

    let filePathJson = '/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools/libraries/sites_tools/json_styling_tools/jstable/www/data/table-conf.json';
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

    let filePathJson = '/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools/libraries/sites_tools/json_styling_tools/jstable/www/data/table-records.json';
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
      key:  fs.readFileSync( '/opt/jaisocx/sites_tools/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key' ),
      cert: fs.readFileSync( '/opt/jaisocx/sites_tools/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt' ),
    },
    app
  ).listen( https_port );


