'use client';

import styles from "./page.module.scss";
import Link from 'next/link';
import { BoardRef } from '@/types';
import { useEffect, useState } from "react";
import { isUuid } from "@/utils/web";

export default function Home() {
    const [recents, setRecents] = useState<BoardRef[]>([]);

    useEffect(() => {
        const localBoards: BoardRef[] = [];
        for (var slug in localStorage) {
            if (isUuid(slug)) {
                localBoards.push({
                    slug,
                    title: JSON.parse(localStorage.getItem(slug) ?? '{}')?.title
                });
            }
        }
        setRecents(localBoards);
    }, [])

    return (
        <main className={styles.main}>

            { /* Emphasis card row */ }

            <div className={styles.cardRowwwEmphasis}>
                <span className={styles.emphasisTitle}>Welcome!</span>
                <div className={styles.cardRowww}>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Boards</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Explore</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Learn</div>
                    </div>
                </div>
            </div>

            { /* Custom Card Rows */ }

            {
                !!recents.length && (
                    <>
                        <span className={styles.cardRowwwHeadline}>Recent Boards</span>
                        <div className={styles.cardRowww}>
                            {
                                recents.map(({ title, slug }) => (
                                    <Link key={slug} className={styles.cardContainer} role="div" href={`/board/${slug}`}>
                                        <div className={styles.card}></div>
                                        <span>{ title ?? 'Untitled Board' }</span>
                                        <small>{ slug }</small>
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                )
            }

            {
                !!recents.length && (
                    <>
                        <span className={styles.cardRowwwHeadline}>Recent Boards</span>
                        <div className={styles.cardRowww}>
                            {
                                recents.map(({ title, slug }) => (
                                    <Link key={slug} className={styles.cardContainer} role="div" href={`/board/${slug}`}>
                                        <div className={styles.card}></div>
                                        <span>{ title ?? 'Untitled Board' }</span>
                                        <small>{ slug }</small>
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                )
            }

            {
                !!recents.length && (
                    <>
                        <span className={styles.cardRowwwHeadline}>Recent Boards</span>
                        <div className={styles.cardRowww}>
                            {
                                recents.map(({ title, slug }) => (
                                    <Link key={slug} className={styles.cardContainer} role="div" href={`/board/${slug}`}>
                                        <div className={styles.card}></div>
                                        <span>{ title ?? 'Untitled Board' }</span>
                                        <small>{ slug }</small>
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </main>
    );
}
