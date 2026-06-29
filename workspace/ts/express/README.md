# Express Framework example by Jaisocx

  > I could set the paths of private key and ssl cert from .env.dynamic like in settings of node-http,
  > with 3rd partie's dependency like @jaisocx/command-line for ENV variables from .env.dynamic in
  > GitHub project Jaisocx-Tools/TypescriptEnvironment under docker:
  > 
  > ssl_cert_path="/opt/jaisocx/ ... /2026_2027_bundle_for_node_basetasks_site.crt"
  >
  > However I shall keep for now this Express Framework setup without 3rd parties dependencies 
  > for example transparency, and promise to think later on,
  > like, whether in this example as js package needed 2nd similar .env.dynamic, but for Express, 
  > like in TypescriptEnvironment for node-http one level folder up))
  > 
  > If with other deps, then it's not easy to understand,
  > whether one can code having installed what set of deps.
  > The dep required for now still remains very clean:
  > 
  > "express": "~5.1.0"



**Installed** SSL Cert for **Express** in `secure_server.js` location:
`workspace/ts/express/src/secure_server.js`
after Line 215

```js
  // workspace/ts/express/src/secure_server.js
  // Line Nr.: 215
  // ...
  
215:  https
216:    .createServer (
217:      {
218:        key:  fs.readFileSync( ' ... /2026_2027_basetasks_site.key' ),
219:        cert: fs.readFileSync( ' ... /2026_2027_bundle_for_node_basetasks_site.crt' ),
220:      },
221:      app
222:    ).listen( https_port );
```

