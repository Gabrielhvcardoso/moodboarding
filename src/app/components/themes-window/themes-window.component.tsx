import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import AppPortal from "../app-portal/app-portal.component";
import styles from "./themes-window.module.scss";
import { THEMES } from "@/config/themes.config";

const ManropeFont = Manrope({
    subsets: ["latin"],
    weight: ["400", "700", "800"]
});

interface Props {
    onClose: () => void;
}

export default function ThemesWindow ({ onClose }: Props) {
    const [currentTheme, setCurrentTheme] = useState<string>(localStorage.getItem('user-theme') ?? 'default');

    useEffect(() => {
        localStorage.setItem('user-theme', currentTheme);
        window.dispatchEvent(new Event("theme-change"));
    }, [currentTheme]);

    return (
        <AppPortal>
            <div
                className={styles.themesWinBackdrop}
                onMouseDown={onClose}
            >
                <div
                    className={`${styles.themesWinContainer} ${ManropeFont.className}`}
                    onMouseDown={e => e.stopPropagation()}
                >
                    <header>
                        <strong>Themes</strong>
                    </header>

                    {
                        THEMES.map(({ slug, author, websiteAuthor, title, theme }) => (
                            <div
                                key={slug}
                                className={styles.themeContainer}
                                onClick={() => setCurrentTheme(slug)}
                            >
                                <div className={styles.themeView}>
                                    <div style={{ backgroundColor: theme.background }} />
                                    <div style={{ backgroundColor: theme.surface }} />
                                    <div style={{ backgroundColor: theme.main }} />
                                    <div style={{ backgroundColor: theme.stroke }} />
                                    <div style={{ backgroundColor: theme.highlight }} />
                                </div>
                                <span>{ title }</span>
                                <Link target="_blank" href={websiteAuthor}>{ author }</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppPortal>
    )
}
