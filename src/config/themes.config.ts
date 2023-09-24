import { ThemeConfigType } from "@/types/core/theme-config.type";

export const THEMES: ThemeConfigType[] = [
    {
        slug: "2624e9c7-4bfe-42ec-ba30-d063f6d7ef99",
        title: "Theme 1",
        author: "HappyHues",
        websiteAuthor: "https://www.happyhues.co/",
        theme: {
            backdropNone: "#00000000",
            backdropSoft: "#00000022",

            background: "#232946",
            backgroundHover: "#414B81",

            surface: "#414B81",

            headline: "#fffffe",
            paragraph: "#b8c1ec",
            button: "#eebbc3",
            buttonHover: "#E8A1AC",
            buttonText: "#192331",

            stroke: "#121629",
            main: "#b8c1ec",
            mainHold: "#79809F",

            highlight: "#eebbc3",
            secondary: "#b8c1ec",
            tertiary: "#121629",
            warning: "#eeebbb",
            danger: "#e69a99",
        },
        palette: {
            yellow: "#eeebbb",
            orange: "#dc9b6f",
            red: "#e69a99",
            green: "#c5eebb",
            blue: "#bbd1ee",
            purple: "#414B81",
            pink: "#eebbc3",
        }
    },
    {
        slug: "ae911675-b3ae-4c55-8e1f-717734046d62",
        title: "Theme 2",
        author: "HappyHues",
        websiteAuthor: "https://www.happyhues.co/",
        theme: {
            backdropNone: "#00000000",
            backdropSoft: "#00000022",
        
            background: "#f9f4ef",
            backgroundHover: "#F0E3D7",
        
            surface: "#F0E3D7",
        
            headline: "#020826",
            paragraph: "#716040",
            button: "#8c7851",
            buttonHover: "#776645",
            buttonText: "#fffffe",
        
            stroke: "#020826",
            main: "#020826",
            mainHold: "#040F47",
        
            highlight: "#FFBB34",
            secondary: "#eaddcf",
            tertiary: "#B5AA98",
            warning: "#eeebbb",
            danger: "#e69a99",
        },
        palette: {
            yellow: "#eeebbb",
            orange: "#dc9b6f",
            red: "#e69a99",
            green: "#c5eebb",
            blue: "#bbd1ee",
            purple: "#414B81",
            pink: "#eebbc3",
        }
    }
]