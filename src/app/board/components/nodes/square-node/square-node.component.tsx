import { NodeProps } from "reactflow";
import BaseNodeMechanics from "../shared/base-node-mechanics/base-node-mechanics.component";
import styles from "./square-node.module.scss";

export default function SquareNode(props: NodeProps) {
    return (
        <div className={styles.squareNode}>
            <BaseNodeMechanics {...props} />
        </div>
    )
}
