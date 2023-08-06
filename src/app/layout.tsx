'use client'

import './globals.scss'
import './typography.scss'

import { usePathname } from 'next/navigation'
import { Manrope } from 'next/font/google'
import Link from 'next/link'
import AppLogo from './components/app-logo/app-logo.component';
import styles from './layout.module.scss'
import type { Metadata } from 'next'
import { List, PaletteFill } from 'react-bootstrap-icons'
import { useEffect, useMemo, useState } from 'react'
import ThemesWindow from './components/themes-window/themes-window.component'
import { THEMES } from '@/config/themes.config'
import AppAvatar from './components/app-avatar/app-avatar.component'
import { useWindowSize } from 'usehooks-ts'
import AppIconButton from './components/app-icon-button/app-icon-button.component'
import AppPortal from './components/app-portal/app-portal.component'

// Metadata


export const metadata: Metadata = {
    title: 'Moodboarding',
    description: 'Create and share ideas by your way',
}

// Fonts

const ManropeFont = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin']
});

// Props

interface Props {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    
    // App Header Menu
    const { width: windowWidth } = useWindowSize();
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const isMenuExpandable = useMemo(() => windowWidth < 768, [windowWidth]);
    const appLinkClassName = `${ManropeFont.className} ${styles.appHeader_link}`;
    const appLinkOnMouseUp = () => setIsMenuExpanded(false);

    function handleMenuIconClick() {
        if (isMenuExpandable) {
            setIsMenuExpanded(!isMenuExpanded);
        }
    }

    useEffect(() => {
        if (!isMenuExpandable) setIsMenuExpanded(false);
    }, [isMenuExpandable]);

    // App Theme
    const [themesWindowState, setThemesWindowState] = useState(false);

    useEffect(() => {
        const updateCSSVariables = () => {
            const { theme, palette } = THEMES.find(({ slug }) => slug === localStorage.getItem('user-theme') ?? 'default') ?? THEMES[0];

            console.log(theme, palette);

            if (theme && palette) {
                document.documentElement.style.setProperty("--color-backdrop-none", theme.backdropNone);
                document.documentElement.style.setProperty("--color-backdrop-soft", theme.backdropSoft);
                document.documentElement.style.setProperty("--color-background", theme.background);
                document.documentElement.style.setProperty("--color-background-hover", theme.backgroundHover);
                document.documentElement.style.setProperty("--color-surface", theme.surface);
                document.documentElement.style.setProperty("--color-headline", theme.headline);
                document.documentElement.style.setProperty("--color-paragraph", theme.paragraph);
                document.documentElement.style.setProperty("--color-button", theme.button);
                document.documentElement.style.setProperty("--color-button-hover", theme.buttonHover);
                document.documentElement.style.setProperty("--color-button-text", theme.buttonText);
                document.documentElement.style.setProperty("--color-stroke", theme.stroke);
                document.documentElement.style.setProperty("--color-main", theme.main);
                document.documentElement.style.setProperty("--color-main-hold", theme.mainHold);
                document.documentElement.style.setProperty("--color-highlight", theme.highlight);
                document.documentElement.style.setProperty("--color-secondary", theme.secondary);
                document.documentElement.style.setProperty("--color-tertiary", theme.tertiary);
                document.documentElement.style.setProperty("--color-warning", theme.warning);
                document.documentElement.style.setProperty("--color-danger", theme.danger);
                document.documentElement.style.setProperty("--color-palette-yellow", palette.yellow);
                document.documentElement.style.setProperty("--color-palette-orange", palette.orange);
                document.documentElement.style.setProperty("--color-palette-red", palette.red);
                document.documentElement.style.setProperty("--color-palette-green", palette.green);
                document.documentElement.style.setProperty("--color-palette-blue", palette.blue);
                document.documentElement.style.setProperty("--color-palette-purple", palette.purple);
                document.documentElement.style.setProperty("--color-palette-pink", palette.pink);
            }
        }

        updateCSSVariables();
        setIsLoading(false);

        window.addEventListener('theme-change', updateCSSVariables);
        return () => window.removeEventListener('theme-change', updateCSSVariables);
    }, []);

    if (isLoading) {
        return (
            <html lang="pt-br">
                <body>
                    <div className={styles.loadingContainer}>
                        <AppLogo />
                        <span className={ManropeFont.className}>Construindo sua experiência...</span>
                    </div>
                </body>
            </html>
        )
    }

    return (
        <html lang="pt-br">
            <body>
                <header className={styles.appHeader}>

                    { /**/ }

                    <AppLogo />

                    { /**/ }

                    {
                        isMenuExpandable ? (
                            <AppIconButton
                                title="Open menu"
                                onClick={handleMenuIconClick}
                                className={styles.appHeader_ExpandMenu}
                            >
                                <List
                                    fontSize={24}
                                    className={styles.appHeader_MenuIcon}
                                />
                            </AppIconButton>
                        ) : (
                            <div className={styles.appHeader_linkContainer}>
                                <Link className={appLinkClassName} href="/board">Create</Link>
                                <Link className={appLinkClassName} href="/discover">Discover</Link>
                                <span className={appLinkClassName}>Boards</span>
                                <PaletteFill className={styles.appHeader_link} onClick={() => setThemesWindowState(true)} />

                                <AppAvatar src={null} href="/profile" />
                            </div>
                        )
                    }

                    <AppPortal>
                        <div
                            className={`${styles.appHeader_linkContainer_Wrapper} ${isMenuExpanded ? styles.opened : ''}`}
                            onMouseDown={handleMenuIconClick}
                        >
                            <div
                                className={styles.appHeader_linkContainer}
                                onMouseDown={e => e.stopPropagation()}
                            >
                                <Link onMouseUp={appLinkOnMouseUp} className={appLinkClassName} href="/">Home</Link>
                                <Link onMouseUp={appLinkOnMouseUp} className={appLinkClassName} href="/board">Create</Link>
                                <Link onMouseUp={appLinkOnMouseUp} className={appLinkClassName} href="/discover">Discover</Link>
                                <span onMouseUp={appLinkOnMouseUp} className={appLinkClassName}>Boards</span>
                                <span onMouseUp={appLinkOnMouseUp} className={appLinkClassName} onClick={() => { setIsMenuExpanded(false); setThemesWindowState(true); }}>Themes</span>
                                <Link onMouseUp={appLinkOnMouseUp} className={appLinkClassName} href="/discover">Settings</Link>
                            </div>
                        </div>
                    </AppPortal>
                </header>

                { /**/ }
                    
                <main className={`${styles.appMain} ${ManropeFont.className}`}>
                    { children }
                </main>

                { /**/ }

                { themesWindowState && <ThemesWindow onClose={() => setThemesWindowState(false)}/> }

                <div id="app-portal" className={styles.globalPortal}></div>

                <div className={styles.globalDisplayFilter}></div>
            </body>
        </html>
    )
}
