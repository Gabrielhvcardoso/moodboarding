"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Profile_PublicProfilePage from "./components/public-profile-page/public-profile-page.component";
import Profile_BoardPreferences from "./components/board-preferences/board-preferences.component";
import Profile_Privacy from "./components/privacy/privacy.component";

const TABS = [
    {
        title: "Public profile",
        TabContent: Profile_PublicProfilePage
    },
    {
        title: "Board preferences",
        TabContent: Profile_BoardPreferences
    },
    {
        title: "Privacidade",
        TabContent: Profile_Privacy
    }
]

export default function Profile () {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className={styles.container}>
            <aside>
                {
                    TABS.map(({ title }, index) => (
                        <div
                            key={title}
                            className={currentTab === index ? styles.asideTitleActive : ''}
                            onClick={() => setCurrentTab(index)}
                        >{ title }</div>
                    ))
                }
            </aside>

                {
                    TABS.map(({ TabContent, title }, index) => (
                        <section key={title} style={{ 'display': index === currentTab ? 'flex' : 'none' }}>
                            <TabContent />
                        </section>
                    ))
                }
        </div>
    )
}
