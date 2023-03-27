import { TrelloList } from "./trello-list";

export interface TrelloCard {
    cardId: number;
    list: TrelloList;
    name: string;
    description: string;
    position: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
