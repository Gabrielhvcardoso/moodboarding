import { NodeProps } from "reactflow";
import BaseNodeMechanics from "../shared/base-node-mechanics/base-node-mechanics.component";
import styles from "./text-node.module.scss";
import { useRef } from "react";

export default function TextNode(props: NodeProps) {
    const ref = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={styles.textNode} onDoubleClick={() => ref?.current?.focus()}>
            <BaseNodeMechanics {...props} />
            <textarea ref={ref} autoFocus className={styles.textNodeTextarea} placeholder="T..." />
        </div>
    )
}
