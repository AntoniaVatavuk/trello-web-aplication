import { TrelloBoard } from "./trello-board";

export interface TrelloList {
    listId: number,
	board: TrelloBoard,
	listName: string,
	position: number,
	createdAt: Date,
	updatedAt: Date
}