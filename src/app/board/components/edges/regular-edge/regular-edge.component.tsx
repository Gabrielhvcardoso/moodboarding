import React from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

export default function RegularEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = { strokeWidth: 2 },
    data,
    markerEnd
}: EdgeProps) {
    const [edgePath] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    return (
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
        />
    );
}
