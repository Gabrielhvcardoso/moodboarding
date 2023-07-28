import React from 'react';
import { NodeProps, Handle, Position, HandleProps } from "reactflow";
import NodeResizer from "../node-resizer/node-resizer.component";
import styles from "./base-node-mechanics.module.scss";

export default function BaseNodeMechanics(props: NodeProps) {

    const getHandleProps = (position: Position): HandleProps & { className: string } => {
        const baseClassName = styles.handle;

        switch (position) {
            case Position.Top:
                return {
                    className: `${baseClassName} ${styles.handleTop}`,
                    type: 'source',
                    id: 'top',
                    position
                };

            case Position.Right:
                return {
                    className: `${baseClassName} ${styles.handleRight}`,
                    type: 'source',
                    id: 'right',
                    position
                };

            case Position.Bottom:
                return {
                    className: `${baseClassName} ${styles.handleBottom}`,
                    type: 'source',
                    id: 'bottom',
                    position
                };

            case Position.Left:
                return {
                    className: `${baseClassName} ${styles.handleLeft}`,
                    type: 'source',
                    id: 'left',
                    position
                };
        }
    }

    return (
        <div className={styles.nodeWrapper}>
            <NodeResizer
                isVisible={props.selected}
            />

            <div className={styles.handleHoverContainer} />

            <Handle { ...getHandleProps(Position.Top) } />
            <Handle { ...getHandleProps(Position.Right) } />
            <Handle { ...getHandleProps(Position.Bottom) } />
            <Handle { ...getHandleProps(Position.Left) } />
        </div>
    )
}