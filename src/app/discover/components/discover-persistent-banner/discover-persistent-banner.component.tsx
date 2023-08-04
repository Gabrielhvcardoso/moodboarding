"use client";

import Image from "next/image";
import styles from "./discover-persistent-banner.module.scss";
import { Manrope } from "next/font/google";

const ManropeFont = Manrope({
    subsets: ["latin"],
    weight: "200"
})

const bannerImage = {
    location: "/image01.jpg"
}

const marqueeItems = [
    ""
]

export default function DiscoverPersistentBanner() {
    return (
        <>
            <div className={styles.banner}>
                <Image
                    alt="A"
                    className={styles.bannerImage}
                    src={bannerImage.location}
                    width={2400}
                    height={1350}
                />

                {/* Clone to control container height */}
                <div className={styles.bannerInfo}>
                    <h1>Petra</h1>
                    <span>What is known</span>
                    
                </div>

                <div className={styles.bannerFilter}>
                    <div className={styles.bannerInfo}>
                        <h1 className={ManropeFont.className}>Petra</h1>
                        <span>What is known</span>
                    </div>
                </div>
            </div>

            <section className={styles.marqueeSection}>
                <div className={styles.marqueDiv}>
                    <div className={styles.marquee}>
                        Gospodin.board &bull; portraits.board &bull; concept.board &bull; filigreeboard &bull; board20 &bull; museum.board &bull; VVV.board &bull; board_photographer &bull; charcoalboard &bull; MUSMboard20 &bull; calligraphy.board &bull; dan.board &bull; silhouette_board &bull; MUSMboard_20 &bull; china.board &bull; 20.board.poster &bull; board_music &bull; board.film &bull; potter_board &bull; frauboard
                    </div>
                </div>
            </section>
        </>
    );
}
