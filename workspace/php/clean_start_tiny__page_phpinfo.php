<!DOCTYPE html>
<html lang="en" class="page phpinfo responsive clean_start theme_fonts_c">
<head>

  <!--# FAVICON -->
  <link
      rel="icon"
      type="image/x-icon"
      href="clean_start_tiny/Icon_Jaisocx.ico"
  />

  <title> PHP Info </title>



  <base href="./" />

  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />


  <!--# CleanStart_Tiny Theme_Base 5_375 b -->
  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="clean_start_tiny/clean_start_tiny__theme_base.css"
  />

  <!--# CleanStart_Tiny 11_616 b -->
  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="clean_start_tiny/clean_start_tiny__html_tags_n_styles.css"
  />

  <!--# CleanStart_Tiny Fonts 592 b | 3_174 b -->
  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="clean_start_tiny/clean_start_tiny__fonts.css"
  />

  <!--# CleanStart_Tiny Sites Tools 10_526 b -->
  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="clean_start_tiny/clean_start_tiny__sites_tools.css"
  />

  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="designed_1024_800_styles_hardcoded/styles_page_main.css"
  />

  <!--# CleanStart_Tiny Mobile friendly 1_966 b -->
  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="clean_start_tiny/clean_start_tiny__responsive.css"
  />

  <link
      rel="stylesheet"
      type="text/css"
      charset="utf-8"
      href="phpinfo/styles/phpinfo.css"
  />

  <style>

    .page.clean_start {
      --clean_start--rem: 16px;
      --clean_start--h1--margin: 0 0 0 0;
      --clean_start--h1--padding: 0 0 0 0;
      --clean_start--h--margin: 0 0 0 0;
      --clean_start--h--padding: 0 0 0 0;
      --clean_start--site--padding: 0 0 20rem 0;
    }

    .page.night_mode.phpinfo.clean_start {
      --clean_start--body_tag--background: #0e0e0e;
      --clean_start--site--background: #040404;
      --clean_start--all_tags--color: var(--php-dark-grey);

      --clean_start--anchor--color: #009;
      --clean_start--anchor_hover--color: #009;

      --clean_start--table_th--color:                   #fdfdfd;
      --clean_start--table_th--background-color:        var(--php-dark-blue);
      --clean_start--table_th--border:                  1px solid white;

      --clean_start--table_td--color:                   var(--php-medium-blue);
      --clean_start--table_td--background-color:        var(--php-dark-blue);
      --clean_start--table_td--border:                  1px solid white;
     }

     .page.day_mode.phpinfo.clean_start {
        --clean_start--body_tag--background: var(--php-medium-blue);
        --clean_start--site--background: var(--php-light-blue);
        --clean_start--all_tags--color: #1a1a1a;

        --clean_start--anchor--color: #009;
        --clean_start--anchor_hover--color: #009;

        --clean_start--table_th--color:                   #fdfdfd;
        --clean_start--table_th--background-color:        var(--php-medium-blue);
        --clean_start--table_th--border:                  1px solid white;

        --clean_start--table_td--color:                   var(--php-dark-grey);
        --clean_start--table_td--background-color:        var(--php-light-blue);
        --clean_start--table_td--border:                  1px solid white;
      }
    }

    .page.clean_start main {
      min-width: 70%;
      max-width: 100%;
      width: 70%;
    }

    .page.clean_start main layout-block.layout_2 {
      padding: 1.4rem 0.3rem 1.4rem 0.3rem;
    }

    .page.clean_start table {
      min-width: 100%;
      max-width: 100%;
      width: 100%;
    }

    .page.clean_start layout-block,
    .page.clean_start text-block {
      display: block;
    }

    .page.clean_start main {
      display: block;

      min-height: 100vh;
      max-height: unset;
      height: auto;

      /* aligning block 2 inline-block; *
      text-align: center; */

      overflow-x: hidden;
      overflow-y: visible;
    }

    .page.clean_start h1 {
      display: block;
    }

    .page.clean_start ul#tests {
      display: none;
    }

    .page.clean_start main layout-block.layout_1,
    .page.clean_start main layout-block.layout_3,
    .page.clean_start main layout-block.layout_3 layout-block.l31,
    .page.clean_start main layout-block.layout_3 layout-block.l32 {
      width: 100%;
    }

    .page.clean_start layout-block.layout_1 {
      top: 0.2px;

      width: 100%;

      min-height: 6.5rem;
      max-height: 6.5rem;
      height: 6.5rem;

      background-color: #fdfdfd;
      color: #0a0a0a;

      text-align: center;
      padding: 2.4375rem 0 2.4375rem 0;

      z-index: 100;
    }

    .page.clean_start main layout-block.layout_2 {
      /* main text-align center, inline-block like texts *
      display: inline-block; */

      border: 0 solid lime;

      min-height: 100%;
      max-height: fit-content;
      height: auto;

      min-width: unset;
      max-width: 100%;
      width: 100%;

      padding: 1.4rem 5rem 1.4rem 5rem;

      background: var(--clean_start--site--background);
      background-color: var(--clean_start--site--background);

      z-index: 10;

      overflow-x: hidden;
      overflow-y: visible;
    }

    .page.clean_start main layout-block.layout_3 {
      position: fixed;
      left: 0.1px;
      bottom: var(--page_phpinfo--l3--bottom);

      z-index: 50;
    }

  </style>

</head>
<body>
<main>

  <layout-block class="layout_2">

<?php

  phpinfo();

?>

  </layout-block>



  <layout-block class="layout_3 shown_effect_fadeIn with-transition">

    <layout-block class="l31">

      <!-- <img
          src="designed_1024_800_styles_hardcoded/bg_img_l3.svg"
      /> -->

      <picture>

        <!--

        440
        768
        1024
        1200
        1440

        -->


        <source
            srcset="designed_1024_800_styles_hardcoded/bg_img_l3_440.svg"
            media="(min-width: 2px) and (max-width: 440px)" />

        <source
            srcset="designed_1024_800_styles_hardcoded/bg_img_l3_768.svg"
            media="(min-width: 441px) and (max-width: 768px)" />

        <source
            srcset="designed_1024_800_styles_hardcoded/bg_img_l3_1024.svg"
            media="(min-width: 769px) and (max-width: 1024px)" />

        <source
            srcset="designed_1024_800_styles_hardcoded/bg_img_l3_1200.svg"
            media="(min-width: 1025px) and (max-width: 1200px)" />

        <source
            srcset="designed_1024_800_styles_hardcoded/bg_img_l3_1440.svg"
            media="(min-width: 1201px) and (max-width: 1440px)" />

        <img
            src="designed_1024_800_styles_hardcoded/bg_img_l3_1440.svg"
        />

      </picture>

    </layout-block>


    <layout-block class="l32">

      <ul class="inline slash powered-by">
        <li>
          <i>
            <img style="top: 0; display: block; overflow-y: hidden; width: auto; height: 1.45rem; min-height: 1.45rem; max-height: 1.45rem;" src="/cdn/images/Logos_of_Jaisocx/Logo_left/original_logo_left/logo_green.png" />
          </i>
        </li>
        <li><i> powered by Jaisocx </i></li>
      </ul>

    </layout-block>

  </layout-block>

</main>
</body>
</html>

<?php

  exit(0);

?>
