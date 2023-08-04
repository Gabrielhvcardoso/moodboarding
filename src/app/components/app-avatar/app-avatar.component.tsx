import Image from "next/image";
import styles from "./app-avatar.module.scss";
import { MouseEventHandler, useCallback, useMemo } from "react";
import Link from "next/link";

interface PropsClickable {
    src: null|string,
    onClick?: MouseEventHandler<HTMLDivElement>,
}

interface PropsLink {
    src: null|string,
    href: string
}

type Props = PropsClickable | PropsLink;

export default function AppAvatar(props: Props) {
    const isClickable = useMemo(() => ('onClick' in props && props.onClick), [props]);

    const AvatarContent = useCallback(() => props.src
        ? <Image src={props.src} height={32} width={32} alt="Your profile image" />
        : (
            <div className={styles.noAvatar}>
                <div /><div /><div />
            </div>
        ), [props.src]);

    // Avatar as a Link

    if ('href' in props) {
        return (
            <Link className={`${styles.container} ${isClickable ? styles.isClickable : ''}`} href={props.href}>
                <AvatarContent />
            </Link>
        )
    }

    // Default Avatar

    return (
        <div className={`${styles.container} ${isClickable ? styles.isClickable : ''}`} onClick={props.onClick}>
            <AvatarContent />
        </div>
    )
}
