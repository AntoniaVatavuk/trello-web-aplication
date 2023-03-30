import { TrelloUser } from './trello-user';

export interface TrelloBoard {
    boardId: number,
    user: TrelloUser,
    boardName: string
    createdAt: Date
}
