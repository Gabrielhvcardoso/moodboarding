import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Manrope } from 'next/font/google';
import { List, PaletteFill } from 'react-bootstrap-icons';
import Link from 'next/link';
import AppAvatar from '../app-avatar/app-avatar.component';
import AppIconButton from '../app-icon-button/app-icon-button.component';
import AppLogo from '../app-logo/app-logo.component';
import AppPortal from '../app-portal/app-portal.component';
import ThemesWindow from '../themes-window/themes-window.component';
import styles from './app-header.module.scss';

const ManropeFont = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin']
});

export default function AppHeader() {
    const [themesWindowState, setThemesWindowState] = useState(false);

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

    return (
        <header className={styles.appHeader}>

            { /**/ }

            <AppLogo />

            { /**/ }

            {/* Menu Itens */}

            <div className={styles.appHeader_linkContainer}>
                {
                    isMenuExpandable ? (
                        <AppIconButton title="Open menu" onClick={handleMenuIconClick} className={styles.appHeader_ExpandMenu}>
                            <List fontSize={24} className={styles.appHeader_MenuIcon} />
                        </AppIconButton>
                    ) : (
                        <>
                            <Link className={appLinkClassName} href="/board">Create</Link>
                            <Link className={appLinkClassName} href="/discover">Discover</Link>
                            <span className={appLinkClassName}>Boards</span>
                            <PaletteFill className={styles.appHeader_link} onClick={() => setThemesWindowState(true)} />
                        </>
                    )
                }

                <AppAvatar src={null} href="/profile" />
            </div>

            {/* Overlay Menu */}

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

            {/* Theme Window */}

            { themesWindowState && <ThemesWindow onClose={() => setThemesWindowState(false)}/> }
        </header>
    );
}