import React from "react";
import DiscoverSideBar from "./components/discover-side-bar/discover-side-bar.component";
import DiscoverResults from "./components/discover-results/discover-results.component";
import DiscoverPersistentBanner from "./components/discover-persistent-banner/discover-persistent-banner.component";
import styles from "./page.module.scss";

export default function DiscoverPage() {
    return (
        <main className={styles.pageContainer}>
            <DiscoverSideBar />

            <section className={styles.results}>
                <DiscoverPersistentBanner />
                <DiscoverResults />
            </section>
        </main>
    );
}