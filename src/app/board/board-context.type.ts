import {
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange
} from "reactflow";

export interface BoardContextType {
    nodes: Node<any, string | undefined>[],
    setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>,
    onNodesChange: OnNodesChange,
    edges: Edge<any>[],
    setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>,
    onEdgesChange: OnEdgesChange,

    addNode: (node: Node) => void,
}
