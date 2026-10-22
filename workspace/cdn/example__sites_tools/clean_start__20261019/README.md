
`Jaisocx Sites Tools`


# clean_start

  I appologize, the library is in enginering. ❌  ul li ol li, ol li ul li examples weren't bugfixed.

  > 💡 Aligning styles of a site, the single file `d_clean_start__html_tags.css` of few hundred code lines.


  | 🗂  **Library**  | `@jaisocx/clean_start` | 🏷  **ver.**: `1.0.1` |

  | 🗓  **Updated**  | 🌾 Autumn 2026 | `AD 2026 Oct 16 19:20:10.500 GMT_24h` |

  | 📐  **Size**     | 🗂 Folder: 316 K | 📦 Tarball: 19 KB | 📄 .css: 70 kb | 📄 .html: 30 kb | 


---





## The aim of the setup

  > 💡 Aligning styles of a site, the single file `clean_start_tiny__all_features.css` of few hundred code lines.

  The tiny css clean start has all styles set hardcoded, 
    and, thanks to this, the css variables code block just has 230 code lines.

  The `clean_start_tiny__base.css` file of smaller size doesn't resolve all features.




### Html pages advantages

. Html pages are of the same technology like multiuser applications in sites browsers.

. Styles for html pages were thought for news and magazines and therefore have wide range of styles and allow styling precision, by typing styles like in programming, til the smallest point rendered by displays.

. Html page may be stored to one file, the styles aren't referenced from other files, however are typed in style tags in html pages.



### Ways of Use.

In order to save up, the styles for the html page are to reference on demand.

Several files may be concatenated to one via command line shell instruction.

The encommented line in the example below, doesn't write the label styles of 1_000 bytes, 
if didn't plan typing label tags in Your html page.

```bash
  cat "MediaAndStyles/clean_start_tiny__html_tags/clean_start_tiny__all_tags.html" >> bundled_styles.css
  cat "MediaAndStyles/clean_start_tiny__html_tags/clean_start_tiny__anchor.html" >> bundled_styles.css
  # cat "MediaAndStyles/clean_start_tiny__html_tags/clean_start_tiny__label.html" >> bundled_styles.css
```


Then, the html single page may have site load of 55 ( fifty five ) k, or 20 (twenty) k., twice smaller.

One of the aims of the setup was to reduce librarie's size, to save up traffic and to raise user experience.

Reducing later in the same SPA images sizes thanks to compression algorythms, 
brings the same good quality site to nice site load time and the traffic save up.



. typing texts in IDE, saving texts in html page.
in the folder MediaAndStyles/clean_start_tiny__styles/styles_display/
  786 bytes     clean_start_tiny__display.css

. aligning of existing other html pages.
1_200 bytes   clean_start_tiny__standard_block_tags__display.css





## Examples

### html example

  ```html
    <html language="en" class="clean_start">
  ```

  ```html
    <html language="en" class="<Your Namespace> clean_start">
  ```

  ```html
    <html language="en" class="clean_start theme_fonts_a">
  ```

  ```html
    <html language="en" class="clean_start theme_fonts_a font_override">
  ```





### css example

  ```css
    .clean_start {
      --clean_start--anchor--color:           navy;
    }
  ```

  ```css
    .<Your Namespace>.clean_start {
      --clean_start--all_tags--font-size:     0.94rem;
    }
  ```





##  Tasks solved


### Four fonts themes

  >  💡  Texts look well, saving SIM mobile traffic.


  >  ❌  Multiplatform fallback fonts are just for the roaming mobile save up mode (nice with the cdn caches fine-tuning), 
  >         don't look the same on other OS' browsers, 
  >         however, still, sans remains the sans and the monospace remains monospace.

  ✅  **Linux** ( just one Linux OS )

  ✅  **Android**: just one font-family for on font-family group, all 4 themes look the same.

  ✅  **iOS** ( iPad )

  ✅  **MacOS** ( MacBook )







  **Multiplatform** font styles, set by styles variables for 4 font familie groups:

  >  ❌  Didn't have real comps with OS', weren't tested: 
  > Microsoft Windows, 
  > Chrome OS, 
  > Free BSD.


  . sans

  . serif

  . handwrite

  . monospace

  ```css
                                           /* microsoft,  ios,         linux,               android  */
    --clean_start--monospace--font-family:   "Consolas",  "Rockwell",  "DejaVu Sans Mono",  "monospace";
  ```



#### Jaisocx workaround, class .font_override

  text renders by the monospace font,
  set by fonts theme class="theme_fonts_c" for 4 font familie groups:
  
  . sans

  . serif

  . handwrite

  . monospace


  
  ```css
    .clean_start.theme_fonts_c,
    .clean_start  .theme_fonts_c {
      ...
      --clean_start--monospace--font-family: "Consolas", "Rockwell", "DejaVu Sans Mono", "monospace";
      ...
    }
  ```




##  Structure

```ls
📚 clean_start/                                        135_000 b  l_d0_d
_________________________________________________________________
    🗂 favicon/                                          4_286 b  l_d1_f
      📄 Icon_Jaisocx.ico                                4_286 b
    _____________________________________________________________
    🗂 MediaAndStyles/                                  60_000 b  l_d1_f
      📄 a_clean_start__fonts.css                        6_217 b
      📄 clean_start__sites_tools.css                    4_487 b
      📄 d_clean_start__html_tags.css                   51_347 b
    📒 README.md                                        16_682 b
    📦 jaisocx-clean_start-1.0.1.tgz                    20_319 b
    📄 index_preview.html                               32_205 b

```





## Theme Base

  >  ❌  I appologize, the review of the base theme in 📒 `README.md` was in Summer 2026.

  **styles.css**

```css

    .clean_start {

      --clean_start--rem:  16px;

      --clean_start--all_tags--font-family:   var(--clean_start--sans--font-family);
      --clean_start--all_tags--font-size:     0.95rem;
      --clean_start--all_tags--line-height:   1.49rem;
      --clean_start--all_tags--color:         black;
      --clean_start--all_tags--border-width:  0;

      --clean_start--anchor--color:           navy;
      --clean_start--anchor_hover--color:     #2292e5;

      --clean_start--h1--font-size:           1.25rem;
      --clean_start--h1--line-height:         1.7rem;

      --clean_start--h--font-size:            0.9rem;
      --clean_start--h--line-height:          1.4rem;
      --clean_start--h--margin:               1.4rem 0 0.4rem 0;
      --clean_start--h--color:                black;

      --clean_start--p--margin:               1.4rem 0 0 0;
      --clean_start--p--font-size:            var(--clean_start--all_tags--font-size);
      --clean_start--p--line-height:          var(--clean_start--all_tags--line-height);

      /* ul li i */
      --clean_start--ul--margin:              0.3rem 0 0.4rem 0.5rem;
      --clean_start--i_ul--margin:            0.3rem 0 0.4rem 3.0rem;

      --clean_start--ul_li_i--padding:        0 0 0 0.5rem;
      --clean_start--i_ul_li_i--padding:      0 0 0 0.2rem;

      --clean_start--ul_li_i--font-size:      var(--clean_start--all_tags--font-size);
      --clean_start--ul_li_i--line-height:    var(--clean_start--all_tags--line-height);

      /* .tag_content */
      --clean_start--ul_li_i_c--content: '-';
      --clean_start--ul_li_i_c--top:          0;
      --clean_start--ul_li_i_c--left:         -0.5rem;
      --clean_start--ul_li_i_c--font-size:    var(--clean_start--ul_li_i--font-size);
      /* --clean_start--ul_li_i_c--line-height: var(--clean_start--ul_li_i--line-height); */
      --clean_start--ul_li_i_c--color:        #33ab55;

      /* ul.tag_border */
      --clean_start--ul_li_i_o--tag_border--content: '';
      --clean_start--ul_li_i_o--tag_border--top:            0.44rem;
      --clean_start--ul_li_i_o--tag_border--left:           0;
      --clean_start--ul_li_i_o--tag_border--font-size:      0;
      --clean_start--ul_li_i_o--tag_border--size:           0.32rem;
      --clean_start--ul_li_i_o--tag_border--border-radius:  0;
      --clean_start--ul_li_i_o--tag_border--border:         1px solid yellow;
      --clean_start--ul_li_i_o--tag_border--background:     #fdfda0;


      /* label */
      --clean_start--label--display:           block;

      --clean_start--label--font-size:         0.79rem;
      --clean_start--label--line-height:       var(--clean_start--label--font-size);

      --clean_start--label--padding:           0.12rem 0.5rem 0.16rem 0.5rem;
      --clean_start--label--margin:            0 0 0 0;

      --clean_start--label--color:             green;
      --clean_start--label--background-color:  #eefafd;

      --clean_start--label--border:            1px solid green;
      --clean_start--label--border-radius:     0.8rem;

      --clean_start--label--overflow-x:        hidden;
      --clean_start--label--overflow-y:        hidden;


      /* pre */
      --clean_start--pre--font-family:    var(--clean_start--monospace--font-family);
      --clean_start--pre--font-size:      0.9rem;
      --clean_start--pre--line-height:    1.2rem;


      /* site */
      --clean_start--site--padding:              1.4rem 1.9rem 12rem 1.9rem;
      --clean_start--site--width:                72%;

      --clean_start--site--background:           #fdfdfd;
      --clean_start--body_tag--background:       #eefefa;


      /* table */
      --clean_start--table--border:                     0.5px solid green;

      --clean_start--table_caption--text-align:         left;
      --clean_start--table_caption--color:              #333;
      --clean_start--table_caption--background-color:   #fdfdfd;
      --clean_start--table_caption--border:             0.5px solid green;

      --clean_start--table_th--text-align:              center;
      --clean_start--table_th--color:                   black;
      --clean_start--table_th--background-color:        #eefedd;

      --clean_start--table_td--color:                   green;
      --clean_start--table_td--background-color:        #fdfdfd;

      --clean_start--table_td_odd--color:               #553322;
      --clean_start--table_td_odd--background-color:    #fafaf2;

      --clean_start--table_td_even--color:              darkgreen;
      --clean_start--table_td_even--background-color:   #f2faf2;

      --clean_start--table_tfoot--color:                black;
      --clean_start--table_tfoot--background-color:     #fdfdfd;


      /* scroll */
      --clean_start--scrollbar-thumb--background-color: lime;
      --clean_start--scrollbar-track--background-color: #fafefa;
      --clean_start--scrollbar--size:                   0.3rem;

      /*
      scrollbar-width: auto;
      scrollbar-width: thin;
      scrollbar-width: none;
      */
      --clean_start--scrollbar--width: thin;
    }


    /* ul inline */
    .clean_start ul.inline {
      --clean_start--ul_li_i_c--content: '🔵';

      --clean_start--ul_li_i_c--top:     0;
      --clean_start--ul_li_i_c--left:   -0.5rem;

      --clean_start--ul--margin:         0.3rem 0 0.4rem 0.5rem;
      --clean_start--i_ul--margin:       0 0 0 0;

      --clean_start--ul_li_i--padding:     0 0.44rem 0 0.44rem;
      --clean_start--i_ul_li_i--padding:   0 0 0 0;

      --clean_start--ul_li_i_c--font-size:    0.4rem;
      --clean_start--ul_li_i_c--line-height:  var(--clean_start--ul_li_i--line-height);

      --clean_start--ul_li_i_c--color: #33ab55;
    }


    /* ul inline slash */
    .clean_start ul.inline.slash {
      --clean_start--ul_li_i_c--content: '|';

      --clean_start--ul_li_i_c--top:   0;
      --clean_start--ul_li_i_c--left: -0.5rem;

      --clean_start--ul--margin:      0.3rem 0 0.4rem 0.5rem;
      --clean_start--i_ul--margin:    0 0 0 0;

      --clean_start--ul_li_i--padding:     0 0.44rem 0 0.44rem;
      --clean_start--i_ul_li_i--padding:   0 0 0 0;

      --clean_start--ul_li_i_c--font-size:    var(--clean_start--ul_li_i--font-size);
      --clean_start--ul_li_i_c--line-height:  var(--clean_start--ul_li_i--line-height);

      --clean_start--ul_li_i_c--color:    #33ab55;
    }


    /* ul tag_border */
    .clean_start ul.tag_border {
      --clean_start--ul_li_i_c--content: '';
      --clean_start--ul_li_i_o--tag_border--content: '';

      --clean_start--ul_li_i_o--tag_border--display: block;

      --clean_start--ul_li_i_o--tag_border--top:     0.44rem;
      --clean_start--ul_li_i_o--tag_border--left:   -0.7rem;

      --clean_start--ul--margin:        0.3rem 0 0.4rem 0.7rem;
      --clean_start--i_ul--margin:      0.3rem 0 0.4rem 3.0rem;

      --clean_start--ul_li_i--padding:      0 0 0 0.23rem;
      --clean_start--i_ul_li_i--padding:    0 0 0 0.2rem;


      --clean_start--ul_li_i_o--tag_border--font-size:    0;
      --clean_start--ul_li_i_o--tag_border--line-height:  0;

      --clean_start--ul_li_i_o--tag_border--border:   0px solid green;
      --clean_start--ul_li_i_o--tag_border--size:           0.4rem;
      --clean_start--ul_li_i_o--tag_border--border-radius:  0;
      --clean_start--ul_li_i_o--tag_border--background:   green; /* #eafdf2; */
    }


    /* ul inline tag_border */
    .clean_start ul.inline.tag_border {

      --clean_start--ul_li_i_c--content: '';
      --clean_start--ul_li_i_o--tag_border--content: '';

      --clean_start--ul_li_i_o--tag_border--display: block;

      --clean_start--ul_li_i_o--tag_border--top:   0.385rem;
      --clean_start--ul_li_i_o--tag_border--left: -0.7rem;

      --clean_start--ul--margin:      0.3rem 0 0.4rem 0.7rem;
      --clean_start--i_ul--margin:    0 0 0 0;

      --clean_start--ul_li_i--padding:        0 1.9rem 0 0.23rem;
      --clean_start--i_ul_li_i--padding:      0 0 0 0;


      --clean_start--ul_li_i_o--tag_border--font-size:     0;
      --clean_start--ul_li_i_o--tag_border--line-height:   0;

      --clean_start--ul_li_i_o--tag_border--border:         1px solid green;
      --clean_start--ul_li_i_o--tag_border--size:           0.4rem;
      --clean_start--ul_li_i_o--tag_border--border-radius:  0.2rem;
      --clean_start--ul_li_i_o--tag_border--background:     #eafdf2;


      --clean_start--ul_li_i_c--top:           var(--clean_start--ul_li_i_o--tag_border--top);
      --clean_start--ul_li_i_c--left:          var(--clean_start--ul_li_i_o--tag_border--left);

      --clean_start--ul_li_i_c--font-size:     0;
      --clean_start--ul_li_i_c--line-height:   0;

      --clean_start--ul_li_i_c--color:         unset;
    }


    .clean_start li i label,
    .clean_start p label,
    .clean_start layout-block p label,
    .clean_start text-block p label,
    .clean_start layout-block text-block label,
    .clean_start layout-block text-line label {
      --clean_start--label--display:            inline-block;

      --clean_start--label--font-size:          0.72rem;
      --clean_start--label--line-height:        var(--clean_start--label--font-size);

      --clean_start--label--padding:            0.14rem 0.45rem 0.14rem 0.45rem;

      /* margin: left and right allowed. in styles hardcoded margin-bottom: -2px; */
      --clean_start--label--margin:             0 0.24rem -2px 0;

      --clean_start--label--color:              green;
      --clean_start--label--background-color:   #eefef2;

      --clean_start--label--border:             1px solid lime;
      --clean_start--label--border-radius:      0.5rem;

      --clean_start--label--overflow-x:   hidden;
      --clean_start--label--overflow-y:   hidden;
    }

```




Have a nice day, Jaisocx Inc. Software Architect I. Polianskyi


