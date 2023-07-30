import { ChangeEventHandler, useContext, useState } from "react";
import { Manrope } from "next/font/google";
import { ChevronRight, Plus, X } from "react-bootstrap-icons";
import styles from "./pages-bar.module.scss";
import { PageContext } from "../page/page.component";
import { BoardContextPage } from "../../[[...slug]]/page";
import AppAlert from "@/app/components/app-alert/app-alert.component";

const ManropeFont = Manrope({
    subsets: ['latin'],
    weight: '700'
})

interface Props {
    value: string|null;
    onChange: ChangeEventHandler<HTMLInputElement>;
    pages?: BoardContextPage[];
    onPagesChange?: (_pages: BoardContextPage[]) => void;
    pageIndex?: number,
    setPageIndex?: (pageIndex: number) => void;
}

export default function PagesBar({ value, onChange, pages, onPagesChange, pageIndex, setPageIndex }: Props) {
    const [opened, setOpened] = useState(true);
    const [askDeletePageSlug, askDelete] = useState<string>(); // page slug

    const { addPage, removePage } = useContext(PageContext);

    const toggleOpen = () => setOpened(!opened);

    const handlePageTitleChange = (index: number, title: string) => {
        if (pages !== undefined) {
            const pagesCopy = [...pages];
            pagesCopy[index].title = title;
            onPagesChange?.(pagesCopy);
        }
    }

    return (
        <>
            <div className={`${styles.pagesBarWrapper} ${opened ? styles.opened : undefined}`}>
                <div className={styles.pagesBar}>
                    <input
                        value={value ?? ''}
                        onChange={onChange}
                        placeholder="Untitled Board"
                        className={`${styles.pagesBarInput} ${ManropeFont.className}`}
                    />

                    <div className={styles.pagesBarPageListHeader}>
                        <small>Pages</small>
                        <Plus onClick={addPage} />
                    </div>

                    <div className={styles.pagesBarPageList}>
                        {
                            pages?.map((page, index) => (
                                <div
                                    key={page.slug}
                                    className={`${styles.pagesBarPageItem} ${pageIndex === index ? styles.active : null}`}
                                    onClick={() => setPageIndex?.(index)}
                                    onDoubleClick={e => e.currentTarget.querySelector('input')?.focus()}
                                >
                                    <input
                                        value={page.title}
                                        onChange={e => handlePageTitleChange(index, e.target.value)}
                                        className={ManropeFont.className}
                                    />

                                    <div
                                        className={styles.pagesBarPageItemDelete}
                                        onClick={() => askDelete(page.slug)}
                                    >
                                        <X />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div
                    className={styles.floatingButton}
                    onClick={toggleOpen}
                >
                    <ChevronRight />
                </div>
            </div>

            {
                askDeletePageSlug && (
                    <AppAlert
                        title="Excluir página"
                        description="Essa ação é irreversível e excluirá todos os nós desta página."
                        onClose={() => askDelete(undefined)}
                        buttons={[{
                            text: "Cancelar",
                            onClick: "exit"
                        }, {
                            text: "Excluir",
                            state: "danger",
                            onClick: () => removePage(askDeletePageSlug)
                        }]}
                    />
                )
            }
        </>
    )
}