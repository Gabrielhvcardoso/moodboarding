import { ChangeEventHandler, createContext, useCallback, useContext, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Node, Edge, Connection, ConnectionMode, addEdge, useEdgesState, useNodesState, OnNodesChange, OnEdgesChange } from "reactflow";

import QuickBar from "../quick-bar/quick-bar.component";
import PagesBar from '../pages-bar/pages-bar.component';
import styles from './page.module.scss';

import NODE_TYPES from "../nodes/node-types";
import EDGE_TYPES from "../edges/edge-types";

import { BoardContext } from '../../[[...slug]]/page';
import { BoardContextType, BoardContextPage } from '../../[[...slug]]/page';

export interface PageContextType {
    nodes: Node<any, string | undefined>[],
    setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>,
    onNodesChange: OnNodesChange,
    edges: Edge<any>[],
    setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>,
    onEdgesChange: OnEdgesChange,

    addNode: (node: Node) => void,
    addPage: () => void,
    removePage: (slug: string) => void
}


export const PageContext = createContext<PageContextType>({} as PageContextType);

interface Props {
    slug: string|null;
}

export default function Page({ slug }: Props) {
    const [mounted, setMounted] = useState(false);
    const { pages, setPages, pageIndex, setPageIndex, title: boardTitle, setTitle: setBoardTitle } = useContext<Partial<BoardContextType>>(BoardContext);
    const [title, setTitle] = useState<string>('');
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                    title: `Page ${pageIndex + 1}`,
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

            setPages([...otherPages, page].sort((a, b) => a.order > b.order ? 1 : -1));
        }
    }, [mounted, title, nodes, edges, setPages]);

    // Board Controller

    const onConnect = useCallback((connection: Connection) => {
        return setEdges(edges => addEdge(connection, edges));
    }, [setEdges]);

    const onBoardTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setBoardTitle?.(event.target.value);
    }

    const onPagesChange = (_pages: BoardContextPage[]) => {
        setPages?.(_pages);
    }

    function addPage() {
        let pageList = pages ?? [];
        let pageIndex = pageList.length;
        const page = {
            slug: crypto.randomUUID().toString(),
            title: `Page ${pageIndex + 1}`,
            nodes: [],
            edges: [],
            order: pageIndex
        };
        setPages?.([...pageList, page]);
        setPageIndex?.(pageIndex);
    }

    function removePage(slug: string) {
        if (setPages && pages?.length) {
            setPages(pages.filter(page => page.slug !== slug))
        }
    }

    function addNode(node: Node) {
        setNodes(nodes => [...nodes, node]);
    }

    return (
        <div className={styles.page_main}>
            <PageContext.Provider value={{
                nodes,
                setNodes,
                onNodesChange,
                edges,
                setEdges,
                onEdgesChange,
                addNode,
                addPage,
                removePage
            }}>
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
                    <Background gap={12} size={2} color="var(--color-tertiary)" />
                    <Controls />
                </ReactFlow>

                <PagesBar
                    value={boardTitle ?? ''}
                    onChange={onBoardTitleChange}
                    pages={pages}
                    onPagesChange={onPagesChange}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                />
                <QuickBar />
            </PageContext.Provider>
        </div>
    )
}
