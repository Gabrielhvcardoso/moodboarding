import { NodeProps, Handle, Position } from "reactflow";
import NodeResizer from "../shared/node-resizer/node-resizer.component";
import styles from "./square-node.module.scss";

export default function SquareNode({
    selected
}: NodeProps) {
    return (
        <div className={styles.squareNode}>
            <NodeResizer
                minHeight={100}
                minWidth={100}
                isVisible={selected}
            />

            <Handle className={styles.handleTop} type="source" id="top" position={Position.Top} />
            <Handle className={styles.handleRight} type="source" id="right" position={Position.Right} />
            <Handle className={styles.handleBottom} type="source" id="bottom" position={Position.Bottom} />
            <Handle className={styles.handleLeft} type="source" id="left" position={Position.Left} />
        </div>
    )
}
