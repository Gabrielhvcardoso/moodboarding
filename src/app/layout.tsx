'use client'

import './globals.scss'
import { usePathname } from 'next/navigation'
import { Manrope } from 'next/font/google'
import Link from 'next/link'
import AppLogo from './components/app-logo/app-logo.component';
import styles from './layout.module.scss'
import type { Metadata } from 'next'
import { PaletteFill } from 'react-bootstrap-icons'
import { useEffect, useMemo, useState } from 'react'
import ThemesWindow from './components/themes-window/themes-window.component'
import { THEMES } from '@/config/themes.config'

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
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
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
                <header className={`${styles.appHeader} ${pathname === '/' ? styles.appHeaderInverseColors : null}`}>

                    { /**/ }

                    <AppLogo />

                    { /**/ }

                    <div className={styles.appHeader_linkContainer}>
                        <Link className={`${ManropeFont.className} ${styles.appHeader_link}`} href="/board">Create</Link>
                        <span className={`${ManropeFont.className} ${styles.appHeader_link}`}>Explore</span>
                        <span className={`${ManropeFont.className} ${styles.appHeader_link}`}>Boards</span>
                        <PaletteFill className={styles.appHeader_link} onClick={() => setThemesWindowState(true)} />
                    </div>
                </header>

                { /**/ }
                    
                <main className={`${styles.appMain} ${ManropeFont.className}`}>
                    {
                        pathname === '/' && (
                            <div className={styles.homePageWaves}>
                                <div className={styles.waveSvgContainer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="var(--color-highlight)" fill-opacity="1" d="M0,256L6.2,234.7C12.3,213,25,171,37,144C49.2,117,62,107,74,128C86.2,149,98,203,111,213.3C123.1,224,135,192,148,192C160,192,172,224,185,224C196.9,224,209,192,222,176C233.8,160,246,160,258,170.7C270.8,181,283,203,295,186.7C307.7,171,320,117,332,96C344.6,75,357,85,369,128C381.5,171,394,245,406,245.3C418.5,245,431,171,443,160C455.4,149,468,203,480,192C492.3,181,505,107,517,69.3C529.2,32,542,32,554,53.3C566.2,75,578,117,591,112C603.1,107,615,53,628,74.7C640,96,652,192,665,234.7C676.9,277,689,267,702,245.3C713.8,224,726,192,738,176C750.8,160,763,160,775,154.7C787.7,149,800,139,812,160C824.6,181,837,235,849,261.3C861.5,288,874,288,886,272C898.5,256,911,224,923,213.3C935.4,203,948,213,960,213.3C972.3,213,985,203,997,208C1009.2,213,1022,235,1034,224C1046.2,213,1058,171,1071,154.7C1083.1,139,1095,149,1108,128C1120,107,1132,53,1145,64C1156.9,75,1169,149,1182,170.7C1193.8,192,1206,160,1218,122.7C1230.8,85,1243,43,1255,58.7C1267.7,75,1280,149,1292,154.7C1304.6,160,1317,96,1329,80C1341.5,64,1354,96,1366,122.7C1378.5,149,1391,171,1403,197.3C1415.4,224,1428,256,1434,272L1440,288L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="var(--color-highlight)" fill-opacity="1" d="M0,256L6.2,234.7C12.3,213,25,171,37,144C49.2,117,62,107,74,128C86.2,149,98,203,111,213.3C123.1,224,135,192,148,192C160,192,172,224,185,224C196.9,224,209,192,222,176C233.8,160,246,160,258,170.7C270.8,181,283,203,295,186.7C307.7,171,320,117,332,96C344.6,75,357,85,369,128C381.5,171,394,245,406,245.3C418.5,245,431,171,443,160C455.4,149,468,203,480,192C492.3,181,505,107,517,69.3C529.2,32,542,32,554,53.3C566.2,75,578,117,591,112C603.1,107,615,53,628,74.7C640,96,652,192,665,234.7C676.9,277,689,267,702,245.3C713.8,224,726,192,738,176C750.8,160,763,160,775,154.7C787.7,149,800,139,812,160C824.6,181,837,235,849,261.3C861.5,288,874,288,886,272C898.5,256,911,224,923,213.3C935.4,203,948,213,960,213.3C972.3,213,985,203,997,208C1009.2,213,1022,235,1034,224C1046.2,213,1058,171,1071,154.7C1083.1,139,1095,149,1108,128C1120,107,1132,53,1145,64C1156.9,75,1169,149,1182,170.7C1193.8,192,1206,160,1218,122.7C1230.8,85,1243,43,1255,58.7C1267.7,75,1280,149,1292,154.7C1304.6,160,1317,96,1329,80C1341.5,64,1354,96,1366,122.7C1378.5,149,1391,171,1403,197.3C1415.4,224,1428,256,1434,272L1440,288L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    }
                    {children}
                </main>

                { /**/ }

                { themesWindowState && <ThemesWindow onClose={() => setThemesWindowState(false)}/> }

                <div id="app-portal" className={styles.globalPortal}></div>

                <div className={styles.globalDisplayFilter}></div>
            </body>
        </html>
    )
}
