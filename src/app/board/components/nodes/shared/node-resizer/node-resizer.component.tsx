import { NodeResizer as DefaultNodeResizer, NodeResizerProps } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import styles from "./node-resizer.module.scss";

export default function NodseResizer(props: NodeResizerProps) {
    return (
        <DefaultNodeResizer
            {...props}
            handleClassName={styles.nodeResizerHandle}
        />
    )
}
