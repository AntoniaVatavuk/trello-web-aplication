import { TrelloUser } from './trello-user';

export interface TrelloBoard {
    boardId: number,
    user: TrelloUser,
    boardName: String
    createdAt: Date
}
