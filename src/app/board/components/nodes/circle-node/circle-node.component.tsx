import { NodeProps } from "reactflow";
import BaseNodeMechanics from "../shared/base-node-mechanics/base-node-mechanics.component";
import styles from "./circle-node.module.scss";

export default function CircleNode(props: NodeProps) {

    return (
        <div className={styles.circleNode}>
            <BaseNodeMechanics {...props} />
        </div>
    )
}
