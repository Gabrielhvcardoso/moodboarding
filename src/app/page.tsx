import styles from "./page.module.scss";
import Link from 'next/link';
import { CardSesssion } from "@/types/api/home/card-sesssion.type";

const CARD_SESSSIONS: CardSesssion[] = [
    {
        sessionTitle: 'Quadros recentes',
        sessionCards: ['Título 1', 'Título 2', 'Título 3']
    },
    {
        sessionTitle: 'Meus quadros',
        sessionCards: ['Título 1', 'Título 2']
    },
    {
        sessionTitle: 'Recomendados',
        sessionCards: ['Título 1', 'Título 2', 'Título 3']
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
                            { sss.sessionTitle }
                        </span>
                        <div className={styles.cardRowww}>
                            {
                                sss.sessionCards.map((cardTitle) => (
                                    <Link key={cardTitle} className={styles.cardContainer} role="div" href={`/board/${crypto.randomUUID()}`}>
                                        <div className={styles.card}></div>
                                        <span>{ cardTitle }</span>
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
