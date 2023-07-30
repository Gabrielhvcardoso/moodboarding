import { ChangeEventHandler } from "react";
import styles from "./title-bar.module.scss";
import { Manrope } from "next/font/google";

const ManropeFont = Manrope({
    subsets: ['latin'],
    weight: '700'
})

interface Props {
    value: string|null;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TitleBar({ value, onChange }: Props) {
    return (
        <div className={styles.titleBar}>
            <input
                value={value ?? ''}
                onChange={onChange}
                placeholder="Untitled Board"
                className={`${styles.titleBarInput} ${ManropeFont.className}`}
            />
        </div>
    )
}