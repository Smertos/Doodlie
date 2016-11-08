import { Tag } from './tag';

export interface Card {
    _id: string;
    summary: string;
    description: string;
    until: Date;
    tags: Tag[];
}