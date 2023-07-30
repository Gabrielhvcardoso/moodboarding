import { ChangeEventHandler, createContext, useCallback, useContext, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Node, Connection, ConnectionMode, addEdge, useEdgesState, useNodesState } from "reactflow";

import QuickBar from "../quick-bar/quick-bar.component";
import TitleBar from '../title-bar/title-bar.component';
import styles from './page.module.scss';

import NODE_TYPES from "../nodes/node-types";
import EDGE_TYPES from "../edges/edge-types";

import { BoardContext } from '../../[[...slug]]/page';
import { BoardContextType, BoardContextPage } from '../../board-context.type';
import { PageContextType } from "../../page-context.type";

export const PageContext = createContext<PageContextType>({} as PageContextType);

interface Props {
    slug: string|null;
}

export default function Page({ slug }: Props) {
    const { pages, setPages } = useContext<Partial<BoardContextType>>(BoardContext);
    const [title, setTitle] = useState<string>('');
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Handle Page Switch

    useEffect(() => {
        let page = pages?.find(page => page.slug === slug);

        setTitle(page?.title ?? '');
        setNodes(page?.nodes ?? []);
        setEdges(page?.edges ?? []);
    }, [slug]);

    // Sync page

    useEffect(() => {
        if (setPages) {
            let page = (pages ?? []).find(p => p.slug === slug);

            if (!page) {
                let pageList = pages ?? [];
                let pageIndex = pageList.length;

                page = {
                    slug: slug ?? crypto.randomUUID().toString(),
                    title: `Página ${pageIndex + 1}`,
                    nodes: [],
                    edges: [],
                    order: pageIndex
                }
            } else {
                page = {
                    ...page,
                    title,
                    nodes,
                    edges
                }
            }

            const otherPages = (pages ?? []).filter(p => p.slug !== slug);

            setPages([...otherPages, page]);
        }
    }, [title, nodes, edges, setPages]);

    // Board Controller

    const onConnect = useCallback((connection: Connection) => {
        return setEdges(edges => addEdge(connection, edges));
    }, [setEdges]);

    const onTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.target.value);
    }

    function addNode(node: Node) {
        setNodes(nodes => [...nodes, node]);
    }

    return (
        <div className={styles.page_main}>
            <PageContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, addNode }}>
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

                <TitleBar value={title} onChange={onTitleChange} />
                <QuickBar />
            </PageContext.Provider>
        </div>
    )
}
