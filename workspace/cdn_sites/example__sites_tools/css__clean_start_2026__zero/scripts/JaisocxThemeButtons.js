
// import { JaisocxThemeButtonsInterface } from "./JaisocxThemeButtonsInterface";

// export class JaisocxThemeButtons implements JaisocxThemeButtonsInterface

// import { JaisocxThemeButtons_Constants } from "./JaisocxThemeButtons_Constants.ts";

class JaisocxThemeButtons {


    constructor() {}



    // @ready
    getHtmlTag() {

        let loc_HtmlDocNodes = ( new Array() );
        let loc_htmlNode = ( new Object() );

        let loc_init_HtmlDocNodes = false;
        let loc_init_htmlNode = false;


        loc_HtmlDocNodes = document.getElementsByTagName("HTML");
        loc_init_HtmlDocNodes = ( loc_HtmlDocNodes instanceof( HTMLCollection ) === true );

        if ( loc_init_HtmlDocNodes && ( loc_HtmlDocNodes.length !== 0 ) ) {
            loc_htmlNode = loc_HtmlDocNodes[0];
            loc_init_htmlNode = ( loc_htmlNode instanceof( HTMLElement ) === true );
        }


        if ( loc_init_htmlNode === false ) {
            return undefined;
        }

        return loc_htmlNode;
    }



    // @ready
    getClassList_HtmlTagClassList (
        in_HtmlTag,
        in_HtmlTagClassArray,
    ) {

        let loc_htmlTag = in_HtmlTag;
        let loc_HtmlTagClassArray = in_HtmlTagClassArray;

        if ( ! loc_htmlTag ) {
            console.log( "Error. No html tag found" );
            return undefined;
            // throw new Error("No html tag found");
        }


        let loc_htmlTagClassList = ( new Array() );
        let loc_init_htmlTagClassList = false;

        let loc_HtmlTagClassname = loc_htmlTag.className;
        if ( loc_HtmlTagClassname && ( loc_HtmlTagClassname.length !== 0 ) ) {
            loc_htmlTagClassList = loc_htmlTag.classList;
            loc_init_htmlTagClassList = ( loc_htmlTagClassList instanceof ( DOMTokenList ) === true );
        }

        if ( ( loc_init_htmlTagClassList === false ) && ( loc_HtmlTagClassArray.length === 0 ) ) {
            console.error("ClassList was undefined, No class list created the HtmlTag ClassArray wasn't set");
            return undefined;
        }



        if ( loc_init_htmlTagClassList === false ) {
            loc_htmlTag.className = loc_HtmlTagClassArray.join( " " );
        }

        loc_htmlTagClassList = loc_htmlTag.classList;
        loc_init_htmlTagClassList = ( loc_htmlTagClassList instanceof ( DOMTokenList ) === true );

        if ( loc_init_htmlTagClassList === false ) {
            console.error("ClassList was undefined, No class list created the HtmlTag ClassArray wasn't set");
            return undefined;
        }


        return loc_htmlTagClassList;
    }



    // @ready
    cleanupClassNames_HtmlTagThemes (
        keywordTheme,
        in_HtmlClassArray,
        in_HtmlTagClassList
    ) {
        let loc_keywordTheme = keywordTheme;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_HtmlTagClassList = in_HtmlTagClassList;



        if ( loc_HtmlTagClassList === undefined ) {
            console.log( "Error." );
            return 0;
        }



        let loc_classesToCleanup = ( new Array() );

        loc_classesToCleanup = [...loc_HtmlTagClassList.values()]
            .filter (
                ( cia_HtmlTagClassName ) => {
                    let ci_classStartsByKeywordTheme = (
                        ( cia_HtmlTagClassName.startsWith ( loc_keywordTheme ) === true )
                        && ( loc_HtmlClassArray.includes( cia_HtmlTagClassName ) === false )
                    );
                    return ci_classStartsByKeywordTheme;
                }
            );

        if ( ( loc_classesToCleanup === undefined ) || ( loc_classesToCleanup.length === 0 ) ) {
            return 0;
        }

        loc_classesToCleanup
            .forEach (
                ( cib_HtmlTagClassName ) => {
                    loc_HtmlTagClassList.remove( cib_HtmlTagClassName );
                }
            );

        let ret_val = loc_classesToCleanup.length;

        return ret_val;
    }



    // @ready
    setClassName_HtmlTagTheme (
        theme,
        in_HtmlTag,
        in_HtmlTagClassList
    ) {
        let loc_classTheme = theme;
        let loc_HtmlTag = in_HtmlTag;
        let loc_HtmlTagClassList = in_HtmlTagClassList;

        if ( loc_HtmlTagClassList === undefined ) {
            loc_HtmlTag.className = loc_classTheme;
            return true;
        }

        loc_HtmlTagClassList.add ( loc_classTheme );

        return true;
    }



    // @ready
    getButtons_ThemeButtons (
        in_buttonIDs
    ) {

        let loc_buttonIDs = in_buttonIDs;

        let loc_buttonsIdLen = loc_buttonIDs.length;
        let loc_buttons = ( new Array( loc_buttonsIdLen ) );
        let loc_counter = 0;
        let loc_buttons_found = false;

        for ( let buttonId of loc_buttonIDs ) {

            let ci_buttonNode = document.getElementById( buttonId );

            if ( ci_buttonNode instanceof ( HTMLElement ) === true ) {
                loc_buttons[ loc_counter ] = ci_buttonNode;
                loc_counter++;
            }

        }

        loc_buttons_found = ( loc_counter !== 0 );
        if ( loc_buttons_found === false ) {
            console.log( "Error. No buttons found." );
            return undefined;
        }



        let ret_btns = loc_buttons;
        if ( loc_counter !== loc_buttonsIdLen ) {
            ret_btns = loc_buttons
                .slice( 0, loc_counter );
        }

        return ret_btns;
    }



    // @ready
    getButton_byTheme (
        theme,
        keywordTheme,
        in_buttonIDs
    ) {

        let loc_Theme = theme;
        let loc_keywordTheme = keywordTheme;
        let loc_buttonIDs = in_buttonIDs;

        let loc_buttonsIdLen = loc_buttonIDs.length;
        let loc_buttons = ( new Array( loc_buttonsIdLen ) );
        loc_buttons = this.getButtons_ThemeButtons( loc_buttonIDs );

        let loc_buttonNode_found = false;

        let loc_buttonNodeByTheme = loc_buttons
            .find (
                ( ci_buttonNode ) => {
                    let ci_Theme = this.getTheme_byDataset_of_a_Button ( loc_keywordTheme, ci_buttonNode );
                    let ci_themeEquals = ( ci_Theme === loc_Theme );
                    return ci_themeEquals;
                }
            );

        loc_buttonNode_found = ( ( loc_buttonNodeByTheme !== undefined ) && ( loc_buttonNodeByTheme instanceof ( HTMLElement ) === true ) );
        if ( loc_buttonNode_found === false ) {
            console.log( "Error. No button by theme found." );
            return undefined;
        }


        let ret_btn = loc_buttonNodeByTheme;

        return ret_btn;
    }



    // @ready
    getButtons_CurrentThemeButtons (
        keywordCurrent,
        in_buttonIDs
    ) {
        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonIDs = in_buttonIDs;


        let loc_buttons = this.getButtons_ThemeButtons ( loc_buttonIDs );
        let loc_length_buttons = loc_buttons.length;
        let loc_length_currentButtons = 0;
        let loc_arrayButtonsCurrent = ( new Array( loc_length_buttons ) );


        let loc_init_arrayOfButtons = false;
        let loc_init_buttonNode = false;

        let ci_count = 0;
        ci_marker_btns: for ( let ci_buttonNode of loc_buttons ) {

            let loc_className = ci_buttonNode.className;

            if ( loc_className && ( loc_className.length !== 0 ) ) {
                loc_init_buttonNode = (
                    ( loc_className === loc_keywordCurrent )
                    || ( ci_buttonNode.classList.contains ( loc_keywordCurrent ) === true )
                );
            }

            if ( loc_init_buttonNode === true ) {
                loc_arrayButtonsCurrent[ ci_count ] = ci_buttonNode;
                ci_count++;
            }

            continue ci_marker_btns;
        }

        loc_length_currentButtons = ci_count;
        loc_init_arrayOfButtons = ( loc_length_currentButtons !== 0 );

        if ( loc_init_arrayOfButtons === false ) {
            console.log ( "Error. No current button found." );
            return undefined;
        }


        let loc_arrayTrimmedLength_buttonsCurrent = loc_arrayButtonsCurrent.slice( 0, loc_length_currentButtons );

        return loc_arrayTrimmedLength_buttonsCurrent;
    }



    // @ready
    getButton_CurrentThemeButton (
        keywordCurrent,
        in_buttonIDs
    ) {
        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonIDs = in_buttonIDs;

        let loc_init_button = false;

        let ret_val = ( new Object() );

        let loc_buttons = this.getButtons_CurrentThemeButtons (
            loc_keywordCurrent,
            loc_buttonIDs
        );

        loc_init_button = ( ( loc_buttons !== undefined ) && ( loc_buttons.length !== 0 ) );

        if ( loc_init_button === false ) {
            console.log ( "Error. No loc_init_button found." );
            return undefined;
        }

        let loc_firstButton = loc_buttons[ 0 ];
        ret_val = {...loc_firstButton};

        return ret_val;
    }



    // @ready
    cleanupClassNames_ThemeButtons (
        keywordCurrent,
        in_buttonIDs
    ) {
        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonIDs = in_buttonIDs;


        let loc_arrayButtonsCurrent = this.getButtons_CurrentThemeButtons (
            loc_keywordCurrent,
            loc_buttonIDs
        );

        if ( loc_arrayButtonsCurrent === undefined ) {
            console.log( "Error. No current button found." );
            return false;
        }


        let loc_lengthArrayCurrentButtons = loc_arrayButtonsCurrent.length;
        loc_arrayButtonsCurrent
            .forEach ( ( ci_buttonNode ) => {

                let ci_className = ci_buttonNode.className;

                if (
                    ( ci_className !== undefined )
                    && ( ci_className.length !== 0 )
                ) {
                    ci_buttonNode.classList.remove ( ci_className );
                }

            });

        return loc_lengthArrayCurrentButtons;
    }



    // @ready
    setClassName_ThemeButtonClassName (
        keywordCurrent,
        in_buttonNode
    ) {

        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonNode = in_buttonNode;


        let loc_buttonNodeClassList = loc_buttonNode.classList;
        let loc_init_ButtonClassList = ( loc_buttonNodeClassList instanceof ( DOMTokenList ) === true );

        if ( loc_init_ButtonClassList === true ) {
            loc_buttonNodeClassList.add ( loc_keywordCurrent );
        } else {
            loc_buttonNode.className = loc_keywordCurrent;
        }

        return 1;
    }



    // @ready
    getThemes_HtmlTagClassNames (
        keywordTheme,
        in_HtmlClassArray,
        in_HtmlTagClassList
    ) {
        let loc_keywordTheme = keywordTheme;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_HtmlTagClassList = in_HtmlTagClassList;



        if ( loc_HtmlTagClassList  === undefined ) {
            console.log ( "Error. No htmlTag class found." );
            return undefined;
        }

        let loc_classesThemes = [...loc_HtmlTagClassList.values()]
            .filter (
                ( cia_HtmlTagClassName ) => {
                    let ci_classStartsByKeywordTheme = (
                        ( cia_HtmlTagClassName.startsWith ( loc_keywordTheme ) === true )
                        && ( loc_HtmlClassArray.includes( cia_HtmlTagClassName ) === false )
                    );
                    return ci_classStartsByKeywordTheme;
                }
            );

        if ( ( loc_classesThemes === undefined ) || ( loc_classesThemes.length === 0 ) ) {
            return undefined;
        }

        return loc_classesThemes;
    }



    // @ready
    getTheme_byKeyword_inHtmlTagClassName (
        keywordTheme,
        in_HtmlClassArray,
        in_HtmlTagClassList
    ) {
        let loc_keywordTheme = keywordTheme;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_HtmlTagClassList = in_HtmlTagClassList;



        let ret_val = '';

        if ( loc_HtmlTagClassList  === undefined ) {
            console.log ( "Error. No htmlTag class found." );
            return undefined;
        }


        let loc_classesThemes = this.getThemes_HtmlTagClassNames (
            loc_keywordTheme,
            loc_HtmlClassArray,
            loc_HtmlTagClassList
        );

        if ( loc_classesThemes  === undefined ) {
            console.log ( "Error. No htmlTag theme classes found." );
            return undefined;
        }


        ret_val = loc_classesThemes[ 0 ];
        return ret_val;
    }



    // @ready
    getTheme_byCurrent_inThemeButtons (
        keywordTheme,
        keywordCurrent,
        in_buttonIDs
    ) {
        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonIDs = in_buttonIDs;



        let ret_val = '';

        let loc_buttonNodeCurrent = ( new Object() );
        loc_buttonNodeCurrent = this.getButton_CurrentThemeButton (
            loc_keywordCurrent,
            loc_buttonIDs
        );

        if ( loc_buttonNodeCurrent === undefined ) {
            console.log( "Error. No current button found." );
            return undefined;
        }

        let loc_Theme = '';
        loc_Theme = this.getTheme_byDataset_of_a_Button (
            loc_keywordTheme,
            loc_buttonNodeCurrent
        );

        ret_val = loc_Theme;

        return ret_val;
    }



    // @ready
    getTheme_byDataset_of_a_Button (
        keywordTheme,
        in_buttonNode
    ) {
        let loc_keywordTheme = keywordTheme;
        let loc_buttonNode = in_buttonNode;


        let ret_val = '';

        if ( loc_buttonNode === undefined ) {
            console.log( "Error. No current button found." );
            return undefined;
        }


        let loc_dataset = loc_buttonNode.dataset;
        let loc_init_dataset = ( loc_dataset instanceof( Object ) === true );
        if ( loc_init_dataset === false ) {
            console.log( "Error. No dataset of current button found." );
            return undefined;
        }


        ret_val = loc_dataset[ loc_keywordTheme ];

        return ret_val;
    }



    // @ready
    // reads html class="clean_start page sites_tools theme_...",
    // does cleanup,
    // sets theme class in html class="clean_start page sites_tools theme_..."
    turnOnTheme_HtmlTagTheme_byClassName (
        theme,
        keywordTheme,
        in_HtmlClassArray
    ) {

        let loc_Theme = theme;
        let loc_keywordTheme = keywordTheme;
        let loc_HtmlClassArray = in_HtmlClassArray;

        let loc_HtmlTag = this.getHtmlTag();
        let loc_HtmlTagClassList = this.getClassList_HtmlTagClassList (
            loc_HtmlTag,
            loc_HtmlClassArray
        );

        this.cleanupClassNames_HtmlTagThemes (
            loc_keywordTheme,
            loc_HtmlClassArray,
            loc_HtmlTagClassList
        );

        this.setClassName_HtmlTagTheme (
            loc_Theme,
            loc_HtmlTag,
            loc_HtmlTagClassList
        );


        return 1;
    }



    // @ready
    // reads dataset.theme of a button class="current" in theme buttons by ids,
    // sets theme class in html class="theme_..."
    turnOnTheme_HtmlTagTheme_byThemeButtons (
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs
    ) {

        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_buttonIDs = in_buttonIDs;


        let loc_buttonNode = this.getButton_CurrentThemeButton (
            loc_keywordCurrent,
            loc_buttonIDs
        );

        if ( loc_buttonNode === undefined ) {
            console.log ( "Error. No current button set." );
            return undefined;
        }



        this.turnOnTheme_HtmlTagTheme_byDatasetOfCurrentButton (
            loc_keywordTheme,
            loc_HtmlClassArray,
            loc_buttonNode
        );

        return 1;
    }



    // @ready
    // reads dataset.theme of a button,
    // sets theme class in html class="theme_..."
    turnOnTheme_HtmlTagTheme_byDatasetOfCurrentButton (
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs,
        in_buttonNode
    ) {

        let loc_keywordTheme = keywordTheme;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_buttonNode = in_buttonNode;


        if ( loc_buttonNode instanceof( HTMLElement ) === false ) {
            console.log( "Error. No current button set." );
            return undefined;
        }



        let loc_Theme = this.getTheme_byDataset_of_a_Button (
            loc_keywordTheme,
            loc_buttonNode
        );


        let loc_HtmlTag = this.getHtmlTag();
        let loc_HtmlTagClassList = this.getClassList_HtmlTagClassList (
            loc_HtmlTag,
            loc_HtmlClassArray
        );

        this.cleanupClassNames_HtmlTagThemes (
            loc_keywordTheme,
            loc_HtmlClassArray,
            loc_HtmlTagClassList
        );

        this.setClassName_HtmlTagTheme (
            loc_Theme,
            loc_HtmlTag,
            loc_HtmlTagClassList
        );


        return 1;
    }



    // @ready
    // by html class set, or current button or class.
    turnOnTheme_HtmlTagTheme_byMode (
        modeTurnOnTheme,
        theme,
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs
    ) {

        let loc_modeTurnOnTheme = modeTurnOnTheme;
        let loc_theme = theme;
        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_buttonIDs = in_buttonIDs;

        if (
            ( loc_modeTurnOnTheme === JaisocxThemeButtons_Constants.THEME_TURN_ON_PRIORITY__THEME() )
            || ( loc_modeTurnOnTheme === JaisocxThemeButtons_Constants.THEME_TURN_ON_PRIORITY__HTML_CLASS() )
        ) {
            this.turnOnTheme_HtmlTagTheme_byClassName (
                loc_theme,
                loc_keywordTheme,
                loc_HtmlClassArray
            );

        } else if ( loc_modeTurnOnTheme === JaisocxThemeButtons_Constants.THEME_TURN_ON_PRIORITY__CURRENT_CLASS_BUTTON_DATASET() ) {
            this.turnOnTheme_HtmlTagTheme_byThemeButtons (
                loc_keywordTheme,
                loc_keywordCurrent,
                loc_HtmlClassArray,
                loc_buttonIDs
            );

        }

        return 5;
    }



    // @ready
    turnOnTheme_ButtonStyle_byTheme (
        theme,
        keywordTheme,
        keywordCurrent,
        in_buttonIDs
    ) {
        let loc_theme = theme;
        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonIDs = in_buttonIDs;

        let loc_buttonNode = ( new Object() );
            loc_buttonNode = this.getButton_byTheme (
                loc_theme,
                loc_keywordTheme,
                loc_buttonIDs
            );

        if ( loc_buttonNode === undefined ) {
            console.log( "Error. No theme button found." );
            return undefined;
        }


        this.turnOnTheme_ButtonStyle_byNode (
            loc_keywordCurrent,
            loc_buttonIDs,
            loc_buttonNode
        );

        return true;
    }



    // @ready
    turnOnTheme_ButtonStyle_byNode (
        keywordCurrent,
        in_buttonIDs,
        in_buttonNode
    ) {

        let loc_keywordCurrent = keywordCurrent;
        let loc_buttonNode = in_buttonNode;
        let loc_buttonIDs = in_buttonIDs;

        if ( loc_buttonNode === undefined ) {
            console.log( "Error. No theme button set." );
            return undefined;
        }

        this.cleanupClassNames_ThemeButtons (
            loc_keywordCurrent,
            loc_buttonIDs
        );

        this.setClassName_ThemeButtonClassName (
            loc_keywordCurrent,
            loc_buttonNode
        );

        return 1;
    }



    // @ready
    addThemeButtonsEventHandlers (
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs
    ) {

        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_buttonIDs = in_buttonIDs;

        let loc_arrowFunc_eventHandler = ( evt ) => {

            let loc_buttonNodeClicked = evt.target;

            this.turnOnTheme_HtmlTagTheme_byDatasetOfCurrentButton (
                loc_keywordTheme,
                loc_keywordCurrent,
                loc_HtmlClassArray,
                loc_buttonIDs,
                loc_buttonNodeClicked
            );

            this.turnOnTheme_ButtonStyle_byNode (
                loc_keywordCurrent,
                loc_buttonIDs,
                loc_buttonNodeClicked
            );
        };

        let loc_BoundFunc_eventHandler = loc_arrowFunc_eventHandler.bind( this );




        let loc_themeButtons = this.getButtons_ThemeButtons ( loc_buttonIDs );
        loc_themeButtons
            .forEach ( ( ci_themeButton ) => {
                ci_themeButton.addEventListener ( "click", loc_BoundFunc_eventHandler );
            });

        return 1;
    }



    /**
    onloadExample_byModeTheme(): number;
    onloadExample_byModeButtonDataset(): number;
    onloadExample_byModeHtmlClass(): number;

    onloadArgsExample (
        modeTurnOnTheme,
        theme,
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs,
        in_buttonNode
    ): number; */





    /**  // @override_example
    onloadExample() {

        // if the call encommented,
        //   the html tag classname for the theme turns the look and feel for the page.
        * this.turnOnTheme_HtmlTagTheme_byMode ( loc_modeThemeTurnOn ) (
            JaisocxThemeButtons_Constants.THEME_TURN_ON_PRIORITY__HTML_CLASS_THEME()
        ); *

        // adding to buttons the event handler to turn on the theme.
        this.addThemeButtonsEventHandlers (
            [
                "button-turn-on-base",
                "button-turn-on-daymode",
                "button-turn-on-nightmode"
            ],
            "theme",
            "current",
            [
                "clean_start",
                "page",
                "sites_tools",
                "theme_fonts_a"
            ]
        );

        return true;
    }



    // @override
    onloadArgsExample (
         modeTurnOnTheme,
         theme,
         keywordTheme,
         keywordCurrent,
         in_HtmlClassArray,
         in_buttonIDs,
         in_buttonNode
     ) {
        let loc_modeThemeTurnOn = in_modeThemeTurnOn;
        let loc_buttonIDs = in_buttonIDs;
        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_HtmlTagClassArray = in_HtmlTagClassArray;


        // if the call encommented,
        //   the html tag classname for the theme turns the look and feel for the page.
        this.turnOnTheme_HtmlTagTheme_byMode ( loc_modeThemeTurnOn );

        // adding to buttons the event handler to turn on the theme.
        this.addThemeButtonsEventHandlers ( loc_buttonIDs, loc_keywordTheme, loc_keywordCurrent, loc_HtmlTagClassArray );

        return true;
    } */

}


