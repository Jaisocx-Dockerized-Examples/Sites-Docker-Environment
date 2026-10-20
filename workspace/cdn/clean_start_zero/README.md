
`Jaisocx Sites Tools`


# clean_start_zero

  > 💡 Aligning styles of a site, the single file `clean_start_zero__site.css` of three hundred code lines of filesize 8k.


  | 🗂  **Library**  | `@jaisocx/clean_start_zero` | 🏷  **ver.**: `1.0.1` |

  | 🗓  **Updated**  | 🌾 Autumn 2026 | `AD 2026 Oct 20 10:35:10.500 GMT_24h` |

  | 📐  **Size**     | 🗂 Folder: 80 K | 📦 Tarball: 8_809 B | 📄 .css: 9_000 B | 📄 .html: 7_862 B | 


---





## The aim of the setup

  > 💡 Aligning styles of a site, the single file `clean_start_zero__site.css` of three hundred code lines of filesize 8k.

  The zero css clean start sets just the few styles for the tags html, head, body, main or site.

  The `clean_start_zero__base.css` file of smaller size solves just the base aligning.





## Examples

### html example

  ```html
    <html language="en" class="clean_start">
  ```

  ```html
    <html language="en" class="<Your Namespace> clean_start theme_fonts_a">
  ```




### css example

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
📚 clean_start_zero/                                     80_000 b  l_d0_d
_________________________________________________________________
    🗂 favicon/                                           4_286 b  l_d1_f
       📄  Icon_Jaisocx.ico                               4_286 b
    _____________________________________________________________
    🗂 MediaAndStyles/                                   12_901 b  l_d1_f
       📄  clean_start_zero__fonts.css                    1_516 b 
       📄  clean_start_zero__html_tags.css                3_218 b 
       📄  clean_start_zero__site.css                     8_167 b 
    📒  README.md                                         6_746 b 
    📦  jaisocx-clean_start_zero-1.0.1.tgz                8_809 b
    📄  clean_start_zero__all_tags.html                  13_248 b
    📄  clean_start_zero__base.html                       6_396 b
    📄  clean_start_zero_cdn__all_tags.html              13_128 b
    📄  clean_start_zero_cdn__base.html                   7_852 b

```





## Theme Base

  >  ✅  the base theme in 📒 `README.md` 


  **style in clean_start_zero__base.html**

  ```css
  
      .jaisocx.clean_start {
  
        --clean_start--rem:      16px;
  
        --clean_start--all_tags--font-size:      0.9rem;
        --clean_start--all_tags--line-height:    1.2rem;
  
        --clean_start--all_tags--border-width:   0;
  
        --clean_start--site--background:         #fdfdfd;
        --clean_start--body_tag--background:     #eefdf4;
  
        --clean_start--site--padding:            1rem 3rem 20rem 3rem;
        --clean_start--site--width:              55%;
  
        --clean_start--scrollbar-thumb--background-color:   lime;
        --clean_start--scrollbar-track--background-color:   #eafdfa;
        --clean_start--scrollbar--color:                    lime #eafdfa;
  
      }
  
  ```



  **all variables**

  ```css
  
    .jaisocx.clean_start {

      --clean_start--rem:      16px;

      --clean_start--all_tags--font-family:    var(--clean_start--sans--font-family, "Arial");
      --clean_start--all_tags--font-size:      0.9rem;
      --clean_start--all_tags--line-height:    1.2rem;


      --clean_start--pre--font-family:         var(--clean_start--monospace--font-family, "Courier");
      --clean_start--pre_tags--font-family:    var(--clean_start--monospace--font-family, "Courier");


      --clean_start--all_tags--border-width:   0;



      --clean_start--site--display:            block;
      --clean_start--custom_tags--display:     inline-block;
      --clean_start--inline_tags--display:     inline-block;
      --clean_start--block_tags--display:      block;



      --clean_start--all_tags--box-sizing:     border-box;
      --clean_start--site--box-sizing:         border-box;

      --clean_start--site--padding:            0 0 0 0;
      --clean_start--site--margin:             0 auto 0 auto;

      --clean_start--site--min-height:         100vh;
      --clean_start--site--max-height:         unset;
      --clean_start--site--height:             auto;

      --clean_start--site--min-width:          unset;
      --clean_start--site--max-width:          100%;
      --clean_start--site--width:              auto;

      --clean_start--site--overflow-x:          hidden;
      --clean_start--site--overflow-y:          visible;


      --clean_start--site--background:         #fdfdfd;
      --clean_start--body_tag--background:     #eefdf4;



      --clean_start--scrollbar-thumb--background-color:   lime;
      --clean_start--scrollbar-track--background-color:   #eafdfa;
      --clean_start--scrollbar--color:                    lime #eafdfa;

      --clean_start--scrollbar--size:                     0.3rem;
      --clean_start--scrollbar--width:                    thin;

    }
  
  ```

---



Have a nice day, Jaisocx Inc. Software Architect I. Polianskyi


