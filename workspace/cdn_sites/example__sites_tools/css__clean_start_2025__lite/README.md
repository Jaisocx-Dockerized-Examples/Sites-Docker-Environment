

# @jaisocx/css_clean_start_lite
  > Template for new .html, mobile friendly, with css3 themes examples. 



#### status
  > ✅  yarn add | npm install Ok

  > ✅ `.html` previews Ok



#### supports
  > Client Side
  > Server Side

```
   Browser |   Express |   Console |
    ✅ yes |     ✅ yes |     ❌ no |
```



#### 📅 latest update
> Winter 2026

**Library**: `@jaisocx/css_clean_start_lite` ver. `1.0.3`

🗓 **Updated at**: `10th of February 2026`

---



## 💡 The aim of the setup
  All front end devs use some normalizing styles for their new projects from scratch.
  
  When You start fresh project from scratch, You have at once the index.html with responsive markup,
  and You are able to set the look and feel of Your site in few minutes,
  via setting very few variables,
  like text color, background color and font family.
  
  In this index.html template,
  several .css files will be loaded with size of very few KB.
  1. base normalizing css file for all html tags
  2. base theme file, where all css variabes becomes values set

---



## 1. html coding example

### 1.1. &lt;html class="jsx"&gt;
Normally set the css class `jsx` and theme css class in &lt;html&gt; tag.

```html
<html lang="en" class="jsx">
```

```html
<html lang="en" class="jsx theme_lightmode">
```

```html
<html lang="en" class="jsx theme_darkmode">
```

```html
<html lang="en" class="jsx theme_darkmode small">
```

```html
<html lang="en" class="jsx theme_darkmode browser-width">
```

```html
<html lang="en" class="jsx theme_darkmode small browser-width">
```



### 1.2. class ul-reset
You can set css class `ul-reset` when You don't need html lists rendering with the predefined 90-s years html look and feel.

```html
<html lang="en" class="jsx ul-reset">
```

or in some tag, where You don't need html lists rendering with the predefined 90-s years html look and feel.
```html
<html lang="en" class="jsx">
      ...
    <a-tag class="ul-reset">
```



## 2. css coding example

```css

    /* Css Clean Start Lite styles overrides */

    .jsx {
      --jsx--css-clean-start-2--h1--margin: 1.4rem 0 1rem 0;
      --jsx--css-clean-start-2--h1--font-weight: 500;
    }

    .jsx label {
      padding: 0.1rem 1rem;
      background-color: #f5fff5;
      border-radius: 0.35rem;
      border: 1px solid #e0ffe0;
    }

```



## 3. Improvals planned

### 3.1. renamings

#### 3.1.1. Libraries:

`@jaisocx/css-clean-start-2` => `@jaisocx/css_clean_start_responsive`



#### 3.1.2. Main css class name "jaisocx" turning on | off tools by Jaisocx:

```html
<html lang="en" class="jaisocx">
```



#### 3.1.3. Main css class name "css_clean_start" turning on | off the CssCleanStart:

```html
<html lang="en" class="jaisocx css_clean_start">
```



#### 3.1.4. Variables start with the Jaisocx keyword: "--jaisocx--"

```css
/* Jaisocx_CssCleanStart_Main.css */

html.jaisocx.css_clean_start * {

  position:     var(--jaisocx--css_clean_start--all-tags--position);
  display:      var(--jaisocx--css_clean_start--custom-tags--display);
  
  ...
  ...

}

```



```css
/* Jaisocx_CssCleanStart_ThemeBase_Main.css */

.jaisocx.css_clean_start {

  ...
  ...

  --jaisocx--css_clean_start--block-tags--display: block;
  
```

---





Have a nice day,

Jaisocx Inc. Software Architect Illia Polianskyi




