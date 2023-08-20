'use client'

import './globals.scss'
import './typography.scss'

import type { Metadata } from 'next'
import { useEffect, useState } from 'react'
import { Manrope } from 'next/font/google'
import { THEMES } from '@/config/themes.config'
import AppHeader from './components/app-header/app-header.component'
import AppLogo from './components/app-logo/app-logo.component';
import styles from './layout.module.scss'

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

    // App Theme Management
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
                <AppHeader />

                <main className={`${styles.appMain} ${ManropeFont.className}`}>
                    { children }
                </main>

                <div id="app-portal" className={styles.globalPortal}></div>
                <div className={styles.globalDisplayFilter}></div>
            </body>
        </html>
    )
}
