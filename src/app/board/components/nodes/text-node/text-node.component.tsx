import { useEffect, useRef } from "react";
import { NodeProps } from "reactflow";
import BaseNodeMechanics from "../shared/base-node-mechanics/base-node-mechanics.component";
import styles from "./text-node.module.scss";
import { Manrope } from "next/font/google";

const ManropeFont = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin']
});

export default function TextNode(props: NodeProps) {
    const textNodeRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(textareaFocus, [])

    function textareaFocus() {
        if (textareaRef.current != null) textareaRef.current?.focus()
    }

    function adjustTextareaHeight() {
        if (textNodeRef.current && textareaRef.current) {
            if (textareaRef.current.scrollHeight >= textareaRef.current.clientHeight) {
                textNodeRef.current.style.height = textareaRef.current.scrollHeight + 'px'
            } else {
                textareaRef.current.style.height = '30px';
            }
        }
    }

    return (
        <div
            ref={textNodeRef}
            className={styles.textNode}
            onDoubleClick={textareaFocus}
        >
            <BaseNodeMechanics {...props} />
            <textarea
                ref={textareaRef}
                className={`${styles.textNodeTextarea} ${ManropeFont.className}`}
                placeholder="Start typing..."
                onKeyDown={adjustTextareaHeight}
            />
        </div>
    )
}
