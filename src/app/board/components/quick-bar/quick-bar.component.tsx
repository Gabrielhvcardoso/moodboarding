import React, { useContext, useMemo, useState } from 'react';
import styles from "./quick-bar.module.scss";
import { Star, Type, Image as ImageIcon, Film, CodeSlash } from "react-bootstrap-icons";
import QuickBarShapesMenu from './components/quick-bar-shapes-menu/quick-bar-shapes-menu.component';

type MenuState = 'shapes' | 'image' | 'video' | 'embed';

const MenuOffset: Record<MenuState, number> = {
    'shapes': -1,
    'image': 0,
    'video': 1,
    'embed': 2,
}

export default function QuickBar() {
    const [menuState, setMenuState] = useState<MenuState|null>(null);

    const menuStyle = useMemo(() => {
        return menuState
            ? { 'transform': `translateY(${52 * MenuOffset[menuState]}px)` }
            : {};
    }, [menuState]);

    return (
        <>
            <div className={styles.quickBarWrapper}>
                { /* Quick Bar */ }

                <div className={styles.quickBarContainer}>
                    <div className={styles.quickBarButton}>
                        <Type height={24} width={24} />
                    </div>
                    <div className={styles.quickBarButton} onClick={() => setMenuState('shapes')}>
                        <Star height={24} width={24} />
                    </div>
                    <div className={styles.quickBarButton} onClick={() => setMenuState('image')}>
                        <ImageIcon height={24} width={24} />
                    </div>
                    <div className={styles.quickBarButton} onClick={() => setMenuState('video')}>
                        <Film height={24} width={24} />
                    </div>
                    <div className={styles.quickBarButton} onClick={() => setMenuState('embed')}>
                        <CodeSlash height={24} width={24} />
                    </div>
                </div>
            </div>

            { /* Quick Bar Menu */ }

            {
                menuState && (
                    <div className={styles.quickBarMenuBackdrop} onMouseDown={() => setMenuState(null)}>
                        <div className={styles.quickBarMenuArrow} style={menuStyle} />
                        <div className={styles.quickBarMenu} style={menuStyle} onMouseDown={e => e.stopPropagation()}>
                            { menuState === 'shapes' && <QuickBarShapesMenu /> }
                        </div>
                    </div>
                )
            }
        </>
    )
}