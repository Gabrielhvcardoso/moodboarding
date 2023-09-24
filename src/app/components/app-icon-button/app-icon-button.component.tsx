import { MouseEventHandler, useMemo } from "react";
import styles from "./app-icon-button.module.scss";

interface Props {
    title?: string;
    className?: string;
    state?: 'default' | 'accent' | 'warning' | 'danger';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

export default function AppIconButton({ title, className, state, onClick, children }: Props) {
    const stateClassName = useMemo(() => {
        switch (state) {
            case "accent":
                return styles.accent;
            case "warning":
                return styles.warning;
            case "danger":
                return styles.danger;
            default:
                return styles.default;
        }
    }, [state]);

    return (
        <button
            title={title}
            onClick={onClick}
            className={`${styles.appIconButton} ${className} ${stateClassName}`}
        >
            { children }
        </button>
    )
}