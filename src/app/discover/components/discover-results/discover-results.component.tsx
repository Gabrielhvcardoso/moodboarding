import Image from "next/image";
import styles from "./discover-results.module.scss";
import AppAvatar from "@/app/components/app-avatar/app-avatar.component";
import Link from "next/link";

export default function DiscoverResults() {
    return (
        <aside className={styles.container}>
            {

                [1, 2, 3, 4, 5, 6].map(id => (
                    <div key={id} className={styles.card}>
                        <div className={styles.cardImageContainer}>
                            <Image
                                src="/image02.png"
                                alt="Imagem de exemplo"
                                fill
                            />
                        </div>

                        <div className={styles.cardDetails}>
                            <AppAvatar src={null} href="#" />
                            <span className={styles.cardInfo}>
                                <span className={styles.cardTitle}>Quadro 24501</span>
                                <br />
                                <Link href="#" className={styles.cardAuthor}>Jorjam Blanc</Link>
                            </span>
                        </div>
                    </div>
                ))
            }
        </aside>
    );
}
