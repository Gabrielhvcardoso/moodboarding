import { PageContextType } from "./page-context.type";

export interface BoardContextPage extends Partial<Pick<PageContextType, 'nodes'|'edges'>> {
    slug: string,
    title: string,
    order: number,
}

export interface BoardContextType {
    slug: string,
    title: string|null,
    pages: BoardContextPage[],
    setPages: (page: BoardContextPage[]) => void
}
