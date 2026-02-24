export interface Article {
    id: string;
    headline: string;
    body: string;
    author: string;
    publishDate: string;
    published: boolean;
}

export type AsideMode = 'closed' | 'edit' | 'view' | 'create' | null;