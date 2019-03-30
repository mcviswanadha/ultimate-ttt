import { Point } from '../util/Point';

export interface AppState {
    currentGame: GameInformation;
    finishedGames: FinishedGameState[];
    analysisGame: AnalysisGame;
}

export interface GameInformation {
    board: SmallBoardInformation[];
    game: GameState;
    moves: Move[];
    activeBoards: Point[];
}

export interface FinishedGameState {
    id?: string;
    date: Date;
    winner?: Player | null;
    gameState: SmallBoardInformation[];
    moves: Move[];
    saveState: string;
    errorMessage: string;
}

export interface AnalysisGame {
    id: string;
    board: SmallBoardInformation[];
    game: GameState;
    moves: Move[];
    activeBoards: Point[];
    currentMove: number;
}

export interface GameState {
    currentPlayer: Player;
    isFinished: boolean;
    winningPlayer?: Player | null;
}

export interface TileInformation {
    position: Point;
    value: TileValue;
}

export interface SmallBoardInformation extends TileInformation {
    tiles: SmallTileInformation[];
}

export interface SmallTileInformation extends TileInformation {
    boardPosition: Point;
}

export enum TileValue {
    Cross = 0,
    Circle = 1,
    Empty = 2,
    Destroyed = 3
}

export enum Player {
    Cross = 0,
    Circle = 1,
    Unknown = 2 // TODO find a better solution for null/undefined problem!!
}

export interface Move {
    boardPosition: Point;
    tilePosition: Point;
    player: Player;
    moveNumber: number;
}

export interface GenericAction {
    type: string;
    // tslint:disable-next-line: no-any
    payload?: any;
}