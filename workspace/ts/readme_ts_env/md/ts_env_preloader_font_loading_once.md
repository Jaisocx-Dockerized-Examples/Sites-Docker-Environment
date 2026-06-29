
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# Preloads

  [README.md HOME](./README.md)


## Aim Of The Setup

To improve sites quality and minimize traffic required with same site quality achieved.


## Story

### Why loading font file

1. The fonts like defined by a sites designer, have to be set on site as is.

2. On the OS like Android, iOS, Linux, Windows, the predefined set of fonts installed along with OS base software is not the same.

3. When just in the .css the font-family name set, relayed on the preview in browser on a computer with the OS installed, on another computer or mobile with another OS installed, the font may be not preinstalled, and the browser renders with the default font. This is not like the sites designer has set the task.

4. The font files, for example a .ttf file, have to be loaded with a browser and be seen in the developers' console network tab.




### Loading font file for a site once

1. As is, on most sites the font files are loaded several times, and there may be font files with response status other than 200 | 2xx, means not loaded.

2. When a cache response headers are set the right way on the https server, the fonts in the cached mode are not loaded more than once, however when testing with cache turned off is first to ensure the fonts are being loaded.

3. The hardcoded tag &lt;link rel=preload as=font href=font-file along with the .css file with @font-face style rules where all references to the same font-family css style rule are the exact same url every char in the url("font-file") css style value.




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














