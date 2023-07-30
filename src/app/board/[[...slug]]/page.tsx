"use client"

import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import { BoardContextType } from '../board-context.type';

import styles from "./page.module.scss";
import "reactflow/dist/style.css";
import Page from "../components/page/page.component";

export const BoardContext = createContext<Partial<BoardContextType>>({} as BoardContextType);

interface Props {
    params: {
        slug?: string;
    }
}

export default function Board(props: Props) {
    const router = useRouter();

    const { slug } = props.params;

    const [title, setTitle] = useState<undefined|null|string>();
    const [pages, setPages] = useState<undefined|BoardContextType['pages']>();
    const [pageIndex, setPageIndex] = useState<number>(0);

    // start up

    useEffect(() => {
        setTitle(undefined);
        setPages(undefined);

        if (slug) {
            const localStateRaw = localStorage.getItem(slug);
            const localState = JSON.parse(localStateRaw ?? '{}') as Partial<BoardContextType>;
            setTitle(localState?.title ?? null);
            setPages(localState?.pages ?? []);
            setPageIndex(0);
        } else {
            router.push(`/board/${crypto.randomUUID()}`);
        }
    }, [slug, router]);

    // board sync

    useEffect(() => {
        if (slug && pages !== null) {
            console.log('major sync')
            localStorage.setItem(slug, JSON.stringify({ slug, title, pages }));
        }
    }, [slug, title, pages]);

    // page props

    const pageSlug = useMemo(() => pages?.[pageIndex]?.slug ?? null, [pages, pageIndex]);

    return (
        <BoardContext.Provider value={{ slug, title, pages, setPages }}>
            {
                pages == null ? (
                    <div className={styles.board_loading}>
                        loading
                    </div>
                ) : (
                    <Page slug={pageSlug} />
                )
            }
        </BoardContext.Provider>
    );
}
