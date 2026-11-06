
`Docker for a Site`  Jaisocx &#8482; &#169;



# Express Framework examples by Jaisocx

  >  a server-side engine for sites written in nodejs


  |  🗓  **Updated**  |  🌾  Autumn 2026 | `AD 2026 Nov 05 21:18:10.900 GMT_24h`



  | ⚡  **just JS Base Engine required** | ❌ no |

  | ⚡  **Support by JS Engines** | 🌐 Browser: ❌ no | 🧭 Server-side Express: ✅ yes | 🖥️ Command Line: ✅ yes |

  | ⚡  **JS Calls** | Network(fetch): ❌ no | 🌐 Browser(DOM): ❌ no | 🧭 Server-side Express(FS | DB): ✅ yes | 🖥️ Command Line: ✅ yes |



```javascript
  // js server-side example by Express
  app.get (  '/hello_world', (req, resp) => {resp.send( "Hello World!" ); resp.end();}  );
```



## TLS Cert. Express Framework example by Jaisocx

  >   **why no .envs read automated in the JaisocxExpress.js**: 
  >   💡  why we like docker for deploys, the images, built by hardcoded numbers of software and other variables, 
  >       having known the images' numbers)). 
  > 
  > I could set the paths of private key and tls cert from `env_dc_dinamique/.env_ts` 
  > like in other settings for node-http,
  > with the 3rd partie's dependency to express, 
  > our `@jaisocx/command-line` in the GitHub project **Jaisocx-Tools/jaisocx_sites_tools**:
  > 
  > `ssl_cert_path="/opt/jaisocx/ ... /2026_2027_bundle_for_node_basetasks_site.crt"`
  >
  > However I shall keep for now this Express Framework setup without 3rd parties dependencies 
  > for example transparency, and promise to think later on,
  > like, 
  >  
  > 1. how would that work normally, 
  > having `nodejs` installed under the host OS on the harddrive, under `nvm` or a newer similar.
  > 
  > Having called the `package.json` **script**, 
  > both, once by Host OS nodejs install,
  > and once another time, from within the docker,
  > like a normal programmer having a day not known, 
  > whether in the project for where, with the docker or no))
  > 
  > You see, in the workspace, the `node_modules` folder is on the harddrive,
  > **both** for the **Host OS**, and, like the mounted volume, for the **Docker**.
  >
  > 2. and, whether in this example as a js package needed a 2nd similar dinamique .env,
  > but, for the Express, 
  > requiring then for the best practice the env reader install to node_modules,
  > no hardcopy.
  > 
  > If the example has in the package.json other 3rd partie's libraries to express, 
  > then it ain't easy to know, whether one can code having installed what set of deps.
  > The dep required for now, still, remains very clean:
  > 
  >  ✅  "express": "~5.1.0"



  **Installed** the TLS Cert for **Express** in `secure_server.js` location:
  `workspace/ts/express/src/secure_server.js`
  after Line `295`.
  
  in the `JaisocxExpress.js` remained like in `secure_server.js` 
  since **the JaisocxExpress** needs time to learn what where, 
  moreover the https, ain't too easy)) Line Nr. `1_462`.

```js
  // workspace/ts/express/src/secure_server.js
  
  // Settings variables Line Nr.: 17
 17:  const https_port = 9443;
 18:  const domain = 'local.basetasks.site';
  
  // Line Nr.: 295
  // ...
295:  https
296:    .createServer (
297:      {
298:        key:  fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key' ),
299:        cert: fs.readFileSync( '/opt/jaisocx/sites_docker_environment/workspace/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt' ),
300:      },
301:      app
302:    ).listen( https_port, () => {
303:  
304:      console.log(`Secure(https) Express Framework Server started at https://${domain}:${https_port}`);
305:  
306:    }
307:  );
```


---



Have a nice day, Jaisocx Inc. Software Architect Illia Polianskyi




