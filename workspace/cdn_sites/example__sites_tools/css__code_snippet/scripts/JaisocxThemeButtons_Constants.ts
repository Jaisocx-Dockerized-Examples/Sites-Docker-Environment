
export class JaisocxThemeButtons_Constants {

    #THEME_TURN_ON_PRIORITY__THEME: string = '';
    #THEME_TURN_ON_PRIORITY__HTML_CLASS: string = '';
    #THEME_TURN_ON_PRIORITY__CURRENT_CLASS_BUTTON_DATASET: string = '';

    constructor() {
        this.#THEME_TURN_ON_PRIORITY__THEME = 'priority__theme';
        this.#THEME_TURN_ON_PRIORITY__HTML_CLASS = 'priority__html_class';
        this.#THEME_TURN_ON_PRIORITY__CURRENT_CLASS_BUTTON_DATASET = 'priority__current_class_button_dataset';
    }



    /** @getter "" */
    priorityTheme(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.#THEME_TURN_ON_PRIORITY__THEME;
    }

    /** @getter "" */
    priorityHtmlClass(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.#THEME_TURN_ON_PRIORITY__HTML_CLASS;
    }

    /** @getter "" */
    priorityCurrentClassButtonDataset(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.#THEME_TURN_ON_PRIORITY__CURRENT_CLASS_BUTTON_DATASET;
    }



    /** @getter "" */
    static THEME_TURN_ON_PRIORITY__THEME(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.priorityTheme();
    }

    /** @getter "" */
    static THEME_TURN_ON_PRIORITY__HTML_CLASS(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.priorityHtmlClass();
    }

    /** @getter "" */
    static THEME_TURN_ON_PRIORITY__CURRENT_CLASS_BUTTON_DATASET(): string {
        const cls: JaisocxThemeButtons_Constants = ( new JaisocxThemeButtons_Constants() );
        return cls.priorityCurrentClassButtonDataset();
    }
}


