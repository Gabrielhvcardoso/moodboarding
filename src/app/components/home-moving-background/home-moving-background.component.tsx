import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { motion } from "framer-motion"
import styles from "./home-moving-background.module.scss";

interface Shape {
    id: string;
    width: Number;
    height: Number;
    SvgElement: () => JSX.Element;
    fillColor: string;
    start: { x: number, y: number },
    final: { x: number, y: number }
}

const NUMBER_OF_SHAPES = 10;
const TRANSITION_DURATION = 60;

const SVG_VARIATIONS = [
    () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8,-51.6C47.4,-50.5,55.5,-39.8,56.6,-28.4C57.8,-17.1,52.1,-5.2,49.9,6.9C47.7,19,49.1,31.4,45,42.6C40.9,53.8,31.3,63.8,20.3,65.3C9.3,66.7,-3,59.6,-13.1,52.9C-23.1,46.1,-30.8,39.8,-37.4,32.3C-44.1,24.9,-49.6,16.4,-57.8,4.2C-66,-8.1,-76.8,-24.1,-74.4,-35.9C-72,-47.8,-56.4,-55.6,-41.8,-54.9C-27.2,-54.2,-13.6,-45,-0.2,-44.6C13.1,-44.2,26.2,-52.7,36.8,-51.6Z" transform="translate(100 100)" />
        </svg>
    ),
    () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.9,-30.1C23.2,-25.7,30.6,-23.8,38.1,-19.2C45.7,-14.6,53.4,-7.3,47.3,-3.5C41.2,0.2,21.1,0.4,16.5,10.1C11.9,19.7,22.6,38.8,22.5,48.6C22.3,58.5,11.1,59.1,3.2,53.6C-4.7,48,-9.4,36.2,-21.3,33.1C-33.1,30,-52.2,35.6,-53.5,31.5C-54.9,27.4,-38.5,13.7,-34.7,2.2C-30.8,-9.3,-39.6,-18.6,-44.1,-32.7C-48.6,-46.9,-48.8,-65.9,-40.7,-69.3C-32.7,-72.7,-16.3,-60.5,-5.5,-51C5.3,-41.4,10.6,-34.5,16.9,-30.1Z" transform="translate(100 100)" />
        </svg>
    ),
    () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1,-21.2C27.8,-19.9,40.1,-18.5,46.1,-12.1C52.1,-5.7,51.9,5.5,46,12.3C40.2,19.1,28.8,21.5,20.2,28.8C11.6,36.2,5.8,48.5,-5.1,55.4C-15.9,62.4,-31.9,64.1,-46.5,58.8C-61.2,53.4,-74.5,41,-68.1,29.5C-61.7,18,-35.5,7.5,-28.5,-7.7C-21.4,-23,-33.6,-42.9,-32,-46.6C-30.5,-50.2,-15.2,-37.5,-5,-30.6C5.2,-23.6,10.3,-22.5,19.1,-21.2Z" transform="translate(100 100)" />
        </svg>
    ),
    () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1,-24.9C22.9,-15.2,34.8,-15.2,41.5,-9.9C48.1,-4.5,49.7,6,50.5,20.4C51.4,34.8,51.6,53,43,54.2C34.5,55.4,17.2,39.6,5.9,31.5C-5.4,23.3,-10.7,22.7,-18.9,21.4C-27.1,20.1,-38,18,-44.6,11.3C-51.1,4.6,-53.2,-6.7,-47.2,-12.3C-41.2,-17.9,-27.1,-17.9,-17.8,-27.1C-8.6,-36.2,-4.3,-54.7,-0.3,-54.3C3.7,-53.8,7.4,-34.5,15.1,-24.9Z" transform="translate(100 100)" />
        </svg>
    ),
    () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.2,-49.7C50.4,-45.8,59,-33.9,59.1,-21.9C59.2,-10,50.9,1.9,47.1,15.9C43.4,29.9,44.3,46.1,37.2,55.4C30.1,64.8,15.1,67.4,-1,68.7C-17,70,-34,70.1,-42.3,61.2C-50.5,52.2,-49.9,34.1,-54.7,18.1C-59.6,2.1,-69.7,-11.9,-71,-27.8C-72.4,-43.6,-64.9,-61.3,-51.6,-64.5C-38.2,-67.8,-19.1,-56.6,-2.6,-53.1C14,-49.5,27.9,-53.6,39.2,-49.7Z" transform="translate(100 100)" />
        </svg>
    )
];

const COLORS_VARIATIONS = [
    "var(--color-highlight)",
    "var(--color-main)",
    "var(--color-tertiary)",
    "var(--color-warning)",
    "var(--color-danger)",
];

function getSvgForm(index: number): () => JSX.Element {
    const limit = SVG_VARIATIONS.length;
    return SVG_VARIATIONS[index] || getSvgForm(index - limit);
}

function getColor(index: number): string {
    const limit = COLORS_VARIATIONS.length;
    return COLORS_VARIATIONS[index] || getColor(index - limit);
}

function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + max;
}

export default function HomeMovingBackground() {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [shapes, setShapes] = useState<Shape[]>([]);

    const resetShapes = useCallback(() => {
        setShapes([]);
        const shapesCount = Array.from({ length: NUMBER_OF_SHAPES }, (x, i) => i);

        return shapesCount.map((index) => {
            const height = getRandomNumber(100, 800);
            const width = getRandomNumber(100, 800);
            const hdir = Math.random() > 0.5 ? 'left' : 'right';
            const vdir = Math.random() > 0.5 ? 'top' : 'down';

            const overflow = {
                from: Math.random() > 0.5 ? 'x' : 'y',
                to: Math.random() > 0.5 ? 'x' : 'y',
            }

            const fromX = hdir === 'left' ? (overflow.from === 'x' ? -width : getRandomNumber(-width, windowWidth/2-width))
                                          : (overflow.from === 'x' ? windowWidth : getRandomNumber(windowWidth/2, windowWidth));

            const fromY = vdir === 'top' ? (overflow.from === 'y' ? -height : getRandomNumber(-height, windowHeight/2-height))
                                         : (overflow.from === 'y' ? windowHeight : getRandomNumber(windowHeight/2, windowHeight));

            const toX = hdir === 'left' ? (overflow.to === 'x' ? windowWidth : getRandomNumber(windowWidth/2, windowWidth))
                                        : (overflow.to === 'x' ? -width : getRandomNumber(-width, windowWidth/2-width));

            const toY = vdir === 'top' ? (overflow.to === 'y' ? windowHeight : getRandomNumber(windowHeight/2, windowHeight))
                                       : (overflow.to === 'y' ? -height : getRandomNumber(-height, windowHeight/2-height));

            setShapes((shapes) => [...shapes, {
                id: hdir + vdir + index,
                width,
                height,
                SvgElement: getSvgForm(index),
                fillColor: getColor(index),
                start: { x: fromX, y: fromY },
                final: { x: toX, y: toY }
            }]);
        });
    }, [windowHeight, windowWidth]);

    useEffect(() => {
        resetShapes();
        const interval = setInterval(resetShapes, TRANSITION_DURATION * 1000);
        return () => clearInterval(interval);
    }, [resetShapes]);

    return (
        <div className={styles.mainBackground}>
            {
                shapes.map((config) => (
                    <motion.div
                        key={config.id}
                        className={styles.svgController}
                        style={{
                            fill: config.fillColor,
                            height: `${config.height}px`,
                            width: `${config.width}px`,
                            mixBlendMode: 'multiply'
                        }}

                        initial={{ ...config.start }}
                        animate={{ ...config.final }}
                        transition={{ duration: TRANSITION_DURATION }}
                    >
                        <config.SvgElement />
                    </motion.div>
                ))
            }
        </div>
    );
}
