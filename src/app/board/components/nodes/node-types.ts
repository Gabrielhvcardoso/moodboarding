import TextNode from "./text-node/text-node.component";

import SquareNode from "./square-node/square-node.component";
import CircleNode from "./circle-node/circle-node.component";

const NODE_TYPES = {
    text: TextNode,
    square: SquareNode,
    circle: CircleNode,
}

export default NODE_TYPES;
