
const express = require('express');
const fs = require('node:fs');

// const { TextDecoder, TextEncoder } = require('node:util');

// const textDecoder = new TextDecoder();
// const textEncoder = new TextEncoder();



const http_port = 3000;
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





app.get ('/', (req, resp) => {

    let clean_start_html_template = {
      "start": "<html class=\"jaisocx_express clean_start theme_fonts_a\">\n<head>\n  <title> Express </title>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"/cdn_sites/clean_start_zero__all.css\" />\n  <style>\n    .jaisocx_express.clean_start {\n      --clean_start--rem: 16px;\n      --clean_start--site--width: 62%;\n      --clean_start--site--padding: 1rem 2rem 10rem 2rem;\n      --clean_start--all_tags--border-width: 0;\n      --clean_start--p--margin: 1rem 0 0 0;\n      --clean_start--body_tag--background: #fff5f0;\n    }\n  </style>\n</head>\n<body>\n  <site>\n",
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

    let filePath = '/opt/jaisocx/sites_docker_environment/workspace/cdn_sites/favicon/flaticon_com_flowers_ico/004_sunflower.ico';
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

    readAndSendFileAsIs (
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

    readAndSendJsonAsIs (
        req,
        resp,
        filePathJson
    );

});



app.listen( http_port, () => {
    console.log(`Express Framework Server started at http://${domain}:${http_port}`);
});


