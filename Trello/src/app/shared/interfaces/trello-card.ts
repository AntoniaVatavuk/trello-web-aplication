import { TrelloList } from "./trello-list";

export interface TrelloCard {
    cardId: number;
    list: TrelloList;
    cardName: string;
    description: string;
    position: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
