import { useContext } from 'react';
import { BoardContext } from '@/app/board/page';

import styles from './quick-bar-shapes-menu.module.scss';

const MENU_ITEMS = [
    {
        label: 'Square',
        nodeType: 'square',
        className: styles.shapesMenu_Square
    },
    {
        label: 'Circle',
        nodeType: 'circle',
        className: styles.shapesMenu_Circle
    },
]

export default function QuickBarShapesMenu() {
    const { addNode } = useContext(BoardContext);

    function addShape(nodeType: string) {
        addNode({
            id: crypto.randomUUID(),
            type: nodeType,
            position: { x: 200, y: 200 },
            data: {}
        });
    }

    return (
        <div className={styles.shapesMenu}>
            {
                MENU_ITEMS.map(item => (
                    <div
                        key={item.label}
                        title={item.label}
                        className={`${styles.baseShape} ${item.className}`}
                        onClick={() => addShape(item.nodeType)}
                    />
                ))
            }
        </div>
    )
}