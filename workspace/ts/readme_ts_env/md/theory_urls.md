
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# URL 
  > URL ( Unified Ressource Link ) types. For Navigation and Loading on Site.

  [README.md HOME](./README.md)


## 1. Types Of URLs

### 1.1. Sites Browser Resolving Types Of References

    1.1.1. Reference By URL: https://cdn.example.com/images/image.webp
    
    1.1.2. Hardcoded Resources Contents Base64 Encoded: data:image/png;base64,iVBORw0...



### 1.2. Webpack and @jaisocx/css-importer @Aliases Resolving Types

    1.2.1. To include hardcoded imported styles and scripts to `bundle.js`.
    
    1.2.2. To rewrite urls in `bundle.js` Javascript code, and to save the Hardcopies of the Linked Resources in the folder of the `bundle.js`. 



### 1.3. Addressing Types of URLs

    1.3.1. Relative: image.webp
    
    1.3.2. Absolute
    
       1.3.2.1. Slash Started: /images/image.webp
    
       1.3.2.2. Protocol and DomainName Started: https://cdn.example.com/images/image.webp



## 2. Resolving Relative URLs

When a sites browser loads a site and styles from a sites server,
then the relative URLs in these files
are resolved with this logique:

### 2.1. In HTML Pages

- For URLs in HTML files:
  Relative URLs are resolved relative to the HTML file's location

Page URL on site:
```
https://site.com/application/first-page.html
```

Relative URL of an image in the `first-page.html`:
```html
<img src="images/image.webp" />
```


Absolute URL of the image 
is relative to the `first-page.html`.

The base url where `first-page.html` is published:
```
https://site.com/application/
```

And the Absolute URL of the image:
```
https://site.com/application/images/image.webp
```



### 2.2. In CSS Stylesheets

- For URLs in CSS files:
  If the CSS was loaded
  via a relative URL in the HTML page,
  then the relative URLs within the CSS are
  resolved relative to the CSS file's location


Page URL on site:
```
https://site.com/application/first-page.html
```

Relative URL of a stylesheet in the `first-page.html`:
```html
<link rel="stylesheet" href="styles/sites-tool-5.css" />
```

In the `sites-tool-5.css`, another stylesheet 
is referenced via a relative URL:
```css
@import url("fonts/fonts-imports.css");
```

The Absolute URL of `fonts-imports.css` 
is relative to `sites-tool-5.css`:
```
https://site.com/application/styles/fonts/fonts-imports.css
```



## 3. Sites Server's Request Headers

  [http_timeline.md](./http_timeline.md)

### 3.1. HTTP/1.1

The first request line sent by a sites browser:
```http/1.1
GET /sites_tools/js_tools/Tree/tree_preview_dev.html HTTP/1.1
```



### 3.2. HTTP/2, HTTP/3

The request headers, relevant to a url, sent by a sites browser:
```http/2
:method = "GET"
:authority = "site.com"
:path = "/sites_tools/js_tools/Tree/tree_preview_dev.html"
```









---



# Examples


### 1.1. Sites Browser Resolving Types Of References

#### 1.1.1. Reference By URL

**Few Examples**

Hyperlink

*.html*
```html
<a href="example.html">Navigates To example.html</a>
```

Other stylesheet

*.html*
```html
<link rel="stylesheet" href="style.css" />
```

*.css*
```css
@import url("style.css");
```

Font

*.html*
```html
<link rel="preload" as="font" href="font.ttf" />
```

*.css*
```css
@font-face { font-name: Font; src: url("font.ttf"); }
```


Image

*.html*
```html
<img src="image.webp" />
```

*.css*
```css
background-image: url("image.webp");
```



#### 1.1.2. Hardcoded Resources Contents Base64 Encoded

Format:
```javascript
`data:${MimeType};base64,${Base64Encoded_Image}`
```


**Few Examples**

Image

![House](data:image/png;base64,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)

*.html*
```html
  <img src="data:image/png;base64,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" />
```

*.css*
```css
  background-image: url("data:image/png;base64,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");
```




### 1.2. Webpack and @jaisocx/css-importer @Aliases Resolving Types

#### 1.2.1. To Include Hardcoded

*.css*
```css
@import url("@MediaAndStyles/style.css");
```



#### 1.2.2. Resolve Reference By URL Relative To The Produced `bundle.js`

*.css*
```css
@font-face { font-name: Font; src: url("font.ttf"); }
```



### 1.3. Addressing Types of URLs

#### 1.3.1. Relative URL

Image

*.html*
```html
<img src="image.webp" />
```

*.html*
```html
<img src="../../images/image.webp" />
```

*.html*
```html
<img src="images/mini-images/mime-types/mini-image-mime-type-MS_Excel.png" />
```


#### 1.3.2. Absolute URL

##### 1.3.2.1. Slash Started Absolute URL

Image

*.html*
```html
<img src="/mini-images/mime-types/mini-image-mime-type-MS_Excel.png" />
```


##### 1.3.2.2. Protocol and DomainName Started Absolute URL

Image

*.html*
```html
<img src="https://images.cdn.company.com/mini-images/mime-types/mini-image-mime-type-MS_Excel.png" />
```



