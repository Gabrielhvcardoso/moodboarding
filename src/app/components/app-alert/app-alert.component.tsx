'use client';

import { MouseEventHandler } from "react";
import styles from "./app-alert.module.scss";
import AppPortal from "../app-portal/app-portal.component";
import { Manrope } from "next/font/google";

const ManropeFont = Manrope({
    subsets: ["latin"],
    weight: ["400", "700", "800"]
})

interface AppAlertButton {
    text: string;
    state?: 'default' | 'accent' | 'warning' | 'danger';
    onClick: "exit" | MouseEventHandler<HTMLButtonElement>;
}

interface Props {
    title: string;
    description: string;
    buttons: AppAlertButton[];

    onClose: () => void
}

export default function AppAlert(props: Props) {
    const { title, description, buttons } = props;

    function getButtonClassName(state: AppAlertButton["state"]): string {
        switch (state) {
            case "accent":
                return styles.buttonAccent;
            case "warning":
                return styles.buttonWarning;
            case "danger":
                return styles.buttonDanger;
            default:
                return styles.buttonDefault;
        }
    }

    function exitAlert() {
        props.onClose();
    }

    return (
        <AppPortal>
            <div
                className={styles.appAlertBackdrop}
                onMouseDown={exitAlert}
            >
                <div
                    className={`${styles.appAlertContainer} ${ManropeFont.className}`}
                    onMouseDown={e => e.stopPropagation()}
                >
                    <strong>{ title }</strong>
                    <span>{ description }</span>
                    <footer>
                        {
                            buttons.map(({ text, state, onClick }) => (
                                <button
                                    key={text}
                                    onClick={
                                        typeof onClick === 'function'
                                            ? (e => { onClick(e); exitAlert(); })
                                            : exitAlert
                                        }
                                    className={getButtonClassName(state)}
                                >{ text }</button>
                            ))
                        }
                    </footer>
                </div>
            </div>
        </AppPortal>
    );
}
