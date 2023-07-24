"use client"

import { createContext, useCallback } from "react";
import { BoardContextType } from './board-context.type';

import QuickBar from "./components/quick-bar/quick-bar.component";

import ReactFlow, {
    Background,
    Controls,
    Node,
    Connection,
    ConnectionMode,
    addEdge,
    useEdgesState,
    useNodesState 
} from "reactflow";

import styles from "./page.module.scss";
import "reactflow/dist/style.css";

import NODE_TYPES from "./components/nodes/node-types";
import EDGE_TYPES from "./components/edges/edge-types";

export const BoardContext = createContext<BoardContextType>({} as BoardContextType);

export default function Board() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((connection: Connection) => {
        return setEdges(edges => addEdge(connection, edges));
    }, []);

    function addNode(node: Node) {
        setNodes(nodes => [...nodes, node]);
    }

    return (
        <BoardContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, addNode }}>
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
                    <Background gap={12} size={2} color="#ddd" />
                    <Controls />
                </ReactFlow>

                <QuickBar />
            </div>
        </BoardContext.Provider>
    );
}
