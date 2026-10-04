
`typescript environment`


![../../../cdn/software_labels/docker/softlabel_docker.svg](../../../cdn/software_labels/docker/softlabel_docker.svg)
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

[HOME Docker for a Site](./../../../../README.md)


[HOME Docker for a Site Typescript Environment](../../../../README_typescript_environment.md)


[HOME Typescript Environment](./README.md)





# Preloads


## The aim of the setup
> 💡 For user experience, sites design implementation quality and network economy.





## Network economy

### No request 

#### 1. Cached ressources no request

**Caching** https **response headers**,
along with a **cdn url**,
**both**, in the **preloadig link** 
and in the **loading link** 
or **loading @import** statement in styles,
tell to a browser **not to request** cached files,
for the network economy.



1. **Caching https response headers** `Expires`

2. **cdn url** `https://cdn.domain.com/...`

3. **preloadig link** `<link rel="preload" href="https://cdn.domain.com/..." />`

4. **loading link** `<link rel="stylesheet" href="https://cdn.domain.com/..." />`

5. **loading @import in styles** `@import url("https://cdn.domain.com/...");`

6. **loading @import in styles** `@font-face { font-family: "font"; src: url("https://cdn.domain.com/.../font.woff"; ... }`





#### 2. OS preinstalled fonts no request

OS preinstalled fonts don't require loading from sites server over network.
   The OS preinstalled fonts to set for rendering in browser,
   require similar fallback fonts preinstalled on every other OS' for the best site user experience.
   I've engineered pair of themes for 4 font familie groups: Sans-Serif, Serif, Monospace, Handwrite.

**Local link**:  🌐  **Sites Tools via Statique http**  [http://local.basetasks.site:8085/html_examples_sites_tools/fonts_os_installed_preview.html](http://local.basetasks.site:8085/html_examples_sites_tools/fonts_os_installed_preview.html)

**Local link**:  🌐  **Sites Tools via Statique Secure https**  [https://local.basetasks.site:8445/html_examples_sites_tools/fonts_os_installed_preview.html](https://local.basetasks.site:8445/html_examples_sites_tools/fonts_os_installed_preview.html)





### Images files sizes minimization


#### Picture html node

Html node `<picture>` loads for a mobile portrait the url of the image of the smaller filesize 
than the url of the same image for the big TV display,
if downgraded image versions were generated and set for the picture html node urls.





## Font preload


### Fine tuning dev mode advise

>  💡  Dev mode One font, Prod mode several fallback fonts and cdn preloading link fallback onerror event handler.




#### Story

>  💡  since it ain't easy)) 



#### How to render by font

The `font-family` style to apply for render,
achieves via loading by browser the font file, for example a `.ttf` file,
and shown in the browser developer tools, tab **Network**.



##### One css class for text, one font, 4 files needed. where what.


1. html markup, css class set for html node where the text was typed.

2. in html markup, 2 .css styles have to be referenced, the css class and the font loading style.

3. the sites server publishes the font file on another url, than the .html and the styles.


#### One font for render of the fallback fonts

In styles, the font for rendering is set via `font-family` style rule just by the name of the font.


The browser loads a font from a sites server in other styles, via @font-face styles block,
and this is another styles file, 
and it ain't easy to know whether what was where)).


If the sites server on request of the url of a font file 
didn't respond with the the font file, 
the font wasn't loaded to the browser,
and the texts are rendered by the default font then.


If the font was preinstalled in the OS,
the browser could render the text by the font.


Always recommended are the modern css styles, 
these allow several fonts in a style rule,
for the case if some of fonts weren't loaded.


Browser developer tools Network tab can show 
whether the font file was loaded by the browser.


However normally getting know the font used for rendering,
just when the font-family style was set by just one font, no fallbacks.


**font fallback style example**

```css
/* fonts.css */
  font-family: Arial, Tahoma, Verdana;
```


The browser developer tools don't tell the font, 
tell just about this style,
whether applied, not the font, the one of the fallback fonts.


Both, the rendering `font-family` and the calculated style `font-family`
tell the same `font-family` style rule typed,
not the exactly applied for rendering the one font name.


In dev mode, my advise, set **one** `font-family` name **without no fallback** fonts.


Otherwise, couldn't checkout, whether a text was rendered by a font,
that was set in styles.





### Why loading font file

1. The fonts like defined by a sites designer, have to be set on site as is.

2. On the OS like Android, iOS, Linux, Windows, 
the predefined set of fonts installed along with OS base software ain't the same.

3. When just in the `.css` the font-family name set, 
relayed on the preview in browser on a computer with the OS installed, 
on another computer or mobile with another OS installed, 
the font may be not preinstalled, and the browser renders with the default font. 
The default font wasn't in the front-end task to solve. 
The nice site sees pixel perfect like designed by the site implementation of the designer.



### Loading font file for a site once

1. As is, on most sites the font files are loaded several times, 
and there may be font files with response status other than 200 | 2xx, means not loaded.

2. When a cache response headers are set the right way on the https server, 
the fonts in the cached mode are not loaded more than once, 
however when testing with cache turned off is first to ensure the fonts are being loaded.

3. The hardcoded tag &lt;link rel=preload as=font href=font-file along with the `.css` file with `@font-face` style rules 
where all references to the same font-family css style rule 
are the exact same url every char in the url("font-file") css style value.




### Why referencing fonts with cdn urls

1. Examples on the npm may not have font files published on npm, in order to avoid hardcopies of font files, and rather have to be referenced with a cdn url.

2. a cdn url for a font may be just one, and for loading font file once this is the best way.





## Problems encountered


### Blocked site

1. when a cdn is a remote machine and may not be accessed by the site admin, and when a cdn is not responding, the tag &lt;link rel=preload blocks rendering of a site.


### Fonts loaded several times

1. if in the .css with @font-face styles the urls are not equal.

2. if the cache response headers aren't set on the https server for the font cdn url, when a font is loading once first time, is still loading evey time the site loads later.




## Tasks solved

1. the js &lt;script&gt; block to stop waiting for the font response if a cdn is not responding from a remote machine.

```javascript
<!DOCTYPE html>
<html lang="en" class="jsx">
<head>

  <title>Tree</title>

  <base href="./" />

  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />



  <script>

    let statLinkTagsPreloading = {
      "icon_brightday": 1,
      "font_LibreFranklin_Medium": 1,
      "font_LibreFranklin_Regular": 1,
      "font_LibreFranklin_SemiBold": 1,
      "font_Niconne_Regular": 1,
      "font_BalooPaaji2_Regular": 1,
      "stylesheet_cdn_fonts": 1,
      "theme_base_styles_tree_loading_cdn_fonts": 1,
      "theme_funny_styles_tree_loading_cdn_fonts": 1,
      "theme_funny_styles_tree": 1
    };



    let statLinksLoadingStopOnTimeout = ( idsObject ) => {

      console.log( "Started script, cleaning up hanging hard preloads links, if cdn doesn't respond, in order to prevent blocked render in the browser." );

      let ids = Object.keys( idsObject );
      let idsNumber = ids.length;
      let id = "";
      let i = ( idsNumber - 1 );
      let tag = new Object();

      let secureCounter = 1;
      let secureMaxCounter = 14;

      marker1: while ( i >= 0 ) {
        secureCounter++;
        if ( secureCounter >= secureMaxCounter ) {
          break marker1;
        }


        id = ids[i];

        if ( idsObject[id] === 3 ) {
          i--;
          continue marker1;
        }


        let url = "";
        try {
          tag = document.getElementById( id );
          url = tag.getAttribute( "href" );
        } catch (e) {}
        try {
          tag.onerror = null;
        } catch (e) {}
        try {
          tag.setAttribute( "rel", "stylesheet" );
        } catch (e) {}
        try {
          tag.setAttribute( "href", "javascript: void(0);" );
        } catch (e) {}
        try {
          tag.remove();
          console.log( "Cleaned up, after timeout, the hanging hard preload url:", url );
        } catch (e) {}

        tag = null;

        i--;
      }
    }



    setTimeout (
      () => {
        statLinksLoadingStopOnTimeout( statLinkTagsPreloading );
      },
      1000
    );

  </script>

```




2. the hardcoded tags &lt;link examples loading font file once.

```html
  <!--# FONTS PRELOAD WITHOUT JAVASCRIPT CALL -->
  <!-- the crossorigin attribute prevents loading fonts twice.
          The fonts are loaded twice, even if the urls matches exactly in the @font-face src url and tag <link href="" />
  -->
  <link
    id="font_LibreFranklin_Regular"
    fetchpriority="low"
    rel="preload"
    as="font"
    type="font/ttf"
    crossorigin
    href="https://sandbox.brightday.email/cdn/www/fonts/LibreFranklin/static/LibreFranklin-Regular.ttf"
    onload="javascript: ( () => { const id = this.id; statLinkTagsPreloading[id] = 3; } )();"
    onerror="javascript: ( () => { this.remove(); this.onerror = null; } )();"
  />
```




3. the .css examples with @font-face styles to load fonts with cdn url.

```css
@font-face {
  font-family: LibreFranklin;
  src: url("https://sandbox.brightday.email/cdn/www/fonts/LibreFranklin/static/LibreFranklin-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
```














