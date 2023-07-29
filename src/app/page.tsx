import styles from "./page.module.scss";
import Link from 'next/link';
import { BoardRef } from '@/types';

const CARD_SESSSIONS: { title: string, boards: BoardRef[] }[] = [
    {
        title: 'Quadros recentes',
        boards: [
            {
                title: 'Test Board 001',
                slug: '227319d4-ef27-47cd-9e23-1f257193ae4c'
            }
        ]
    },
    {
        title: 'Meus quadros',
        boards: [
            {
                title: 'Test Board 001',
                slug: '227319d4-ef27-47cd-9e23-1f257193ae4c'
            }
        ]
    }
]

export default function Home() {
    return (
        <main className={styles.main}>

            { /* Emphasis card row */ }

            <div className={styles.cardRowwwEmphasis}>
                <span className={styles.emphasisTitle}>Bem vindo</span>
                <div className={styles.cardRowww}>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Quadros</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Explorar</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardBottomText}>Aprender</div>
                    </div>
                </div>
            </div>

            { /* Custom Card Rows */ }

            {
                CARD_SESSSIONS.map((sss) => (
                    <>
                        <span className={styles.cardRowwwHeadline}>
                            { sss.title }
                        </span>
                        <div className={styles.cardRowww}>
                            {
                                sss.boards.map(({ title, slug }) => (
                                    <Link key={slug} className={styles.cardContainer} role="div" href={`/board/${slug}`}>
                                        <div className={styles.card}></div>
                                        <span>{ title }</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                ))
            }
        </main>
    );
}
