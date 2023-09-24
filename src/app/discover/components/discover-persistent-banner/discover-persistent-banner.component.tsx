"use client";

import Image from "next/image";
import styles from "./discover-persistent-banner.module.scss";
import { Manrope } from "next/font/google";

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
                    width={1200}
                    height={675}
                />

                <div className={styles.bannerFilter}>
                    <div className={styles.bannerInfo}>
                        <h1>ANIMALS IN Nums</h1>
                        <span>Know the most diversified board of animals curiosities.</span>
                        <a href="">Acessar</a>
                    </div>
                </div>
            </div>

            <a href="" className={styles.imageCredits}>Anakin Skywalker</a>

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
