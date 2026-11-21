
export interface JaisocxThemeButtonsInterface {

    // @ready
    getHtmlTag(): HTMLHtmlElement;

    /**
        modeTurnOnTheme,
        theme,
        keywordTheme,
        keywordCurrent,
        in_HtmlClassArray,
        in_buttonIDs,
        in_buttonNode
    */

    /*
        let loc_modeTurnOnTheme = modeTurnOnTheme;
        let loc_theme = theme;
        let loc_keywordTheme = keywordTheme;
        let loc_keywordCurrent = keywordCurrent;
        let loc_HtmlClassArray = in_HtmlClassArray;
        let loc_buttonIDs = in_buttonIDs;
        let loc_buttonNode = in_buttonNode;
    */

    /*
        loc_modeTurnOnTheme,
        loc_theme,
        loc_keywordTheme,
        loc_keywordCurrent,
        loc_HtmlClassArray,
        loc_buttonIDs,
        loc_buttonNode
    */



    // @ready
    getClassList_HtmlTagClassList (
        in_HtmlTag: HTMLElement,
        in_HtmlTagClassArray: string[],
    ): DOMTokenList;

    // @ready
    cleanupClassNames_HtmlTagThemes (
        in_HtmlTagClassList: DOMTokenList,
        in_HtmlClasses: string[],
        keywordTheme: string
    ): number;

    // @ready
    setClassName_HtmlTagTheme (
        theme: string,
        in_HtmlTag: HTMLElement,
        in_HtmlTagClassList: DOMTokenList
    ): number;



    // @ready
    getButtons_ThemeButtons (
        in_buttonIDs: string[]
    ): HTMLElement[];

    // @ready
    getButton_byTheme (
        theme: string,
        keywordTheme: string,
        in_buttonIDs: string[]
    ): HTMLElement;

    // @ready
    getButtons_CurrentThemeButtons (
        in_buttonIDs: string[],
        keywordCurrent: string
    ): HTMLElement[];

    // @ready
    getButton_CurrentThemeButton (
        in_buttonIDs: string[],
        keywordCurrent: string
    ): HTMLElement;



    // @ready
    cleanupClassNames_ThemeButtons (
        in_buttonIDs: string[],
        keywordCurrent: string
    ): number;



    // @ready
    setClassName_ThemeButtonClassName (
        in_button: HTMLElement,
        keywordCurrent: string
    ): number;



    // @ready
    getThemes_HtmlTagClassNames (
        in_HtmlTagClassList: DOMTokenList,
        in_HtmlClasses: string[],
        keywordTheme: string
    ): string[];

    // @ready
    getTheme_byKeyword_inHtmlTagClassName (
        in_HtmlTagClassList: DOMTokenList,
        in_HtmlClasses: string[],
        keywordTheme: string
    ): string;



    // @ready
    getTheme_byCurrent_inThemeButtons (
        in_buttonIDs: string[],
        keywordCurrent: string,
        keywordTheme: string
    ): string;

    // @ready
    getTheme_byDataset_of_a_Button (
        in_buttonNode: HTMLElement,
        keywordTheme: string
    ): string;



    // @ready
    // reads html class="clean_start page sites_tools theme_...",
    // does cleanup,
    // sets theme class in html class="clean_start page sites_tools theme_..."
    turnOnTheme_HtmlTagTheme_byClassName (
        theme: string,
        keywordTheme: string,
        in_HtmlClasses: string[]
    ): number;



    // @ready
    // reads dataset.theme of a button class="current" in theme buttons by ids,
    // sets theme class in html class="theme_..."
    turnOnTheme_HtmlTagTheme_byThemeButtons (
        keywordTheme: string,
        keywordCurrent: string,
        in_buttonIDs: string[],
        in_HtmlClasses: string[]
    ): number;

    // @ready
    // reads dataset.theme of a button,
    // sets theme class in html class="theme_..."
    turnOnTheme_HtmlTagTheme_byDatasetOfCurrentButton (
        keywordTheme: string,
        in_buttonNode: HTMLElement,
        in_buttonIDs: string[],
        in_HtmlClasses: string[]
    ): number;



    // @ready
    // by html class set, or current button or class.
    turnOnTheme_HtmlTagTheme_byMode (
        modeTurnOnTheme: string,
        theme: string,
        keywordTheme: string,
        keywordCurrent: string,
        in_buttonIDs: string[],
        in_HtmlClasses: string[]
    ): number;



    // @ready
    turnOnTheme_ButtonStyle_byTheme (
        theme: string,
        keywordTheme: string,
        keywordCurrent: string,
        in_buttonIDs: string[]
    ): number;

    // @ready
    turnOnTheme_ButtonStyle_byNode (
        keywordCurrent: string,
        in_buttonNode: HTMLElement,
        in_buttonIDs: string[]
    ): number;



    // @ready
    addThemeButtonsEventHandlers (
        keywordTheme: string,
        keywordCurrent: string,
        in_buttonIDs: string[],
        in_HtmlClasses: string[]
    ): number;



    onloadExample_byModeTheme(): number;
    onloadExample_byModeButtonDataset(): number;
    onloadExample_byModeHtmlClass(): number;

    onloadArgsExample (
        modeTurnOnTheme: string,
        theme: string,
        keywordTheme: string,
        keywordCurrent: string,
        in_buttonIDs: string[],
        in_HtmlClasses: string[]
    ): number;

}


