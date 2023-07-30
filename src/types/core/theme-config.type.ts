export interface ThemeConfigType {
    title: string,
    slug: string,
    author: string,
    websiteAuthor: string,
    theme: {
        backdropNone: string,
        backdropSoft: string,

        background: string,
        backgroundHover: string,

        surface: string,

        headline: string,
        paragraph: string,
        button: string,
        buttonHover: string,
        buttonText: string,

        stroke: string,
        main: string,
        mainHold: string,

        highlight: string,
        secondary: string,
        tertiary: string,
        warning: string,
        danger: string,
    },
    palette: {
        yellow: string,
        orange: string,
        red: string,
        green: string,
        blue: string,
        purple: string,
        pink: string,
    }
}
