"use client"

import { createContext, useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Node, Connection, ConnectionMode, addEdge, useEdgesState, useNodesState } from "reactflow";
import QuickBar from "../components/quick-bar/quick-bar.component";
import { BoardContextType } from '../board-context.type';

import styles from "./page.module.scss";
import "reactflow/dist/style.css";

import NODE_TYPES from "../components/nodes/node-types";
import EDGE_TYPES from "../components/edges/edge-types";

export const BoardContext = createContext<BoardContextType>({} as BoardContextType);

interface Props {
    params: {
        slug: string;
    }
}

export default function Board(props: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // start up

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [props.params.slug]);

    const onConnect = useCallback((connection: Connection) => {
        return setEdges(edges => addEdge(connection, edges));
    }, [setEdges]);

    function addNode(node: Node) {
        setNodes(nodes => [...nodes, node]);
    }

    return (
        <BoardContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, addNode }}>
            {
                isLoading ? (
                    <div className={styles.board_loading}>

                    </div>
                ) : (
                    <div className={styles.board_main}>
                        <ReactFlow

                            /* Nodes */

                            nodeTypes={NODE_TYPES}
                            nodes={nodes}
                            onNodesChange={onNodesChange}

                            /* Edges */

                            edgeTypes={EDGE_TYPES}
                            edges={edges}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            connectionMode={ConnectionMode.Loose}
                            defaultEdgeOptions={{ type: 'regular' }}
                        >
                            <Background gap={12} size={2} color="var(--color-stroke)" />
                            <Controls />
                        </ReactFlow>

                        <QuickBar />
                    </div>
                )
            }
        </BoardContext.Provider>
    );
}
