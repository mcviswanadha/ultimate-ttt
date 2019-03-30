import { AnalysisGame, GenericAction, Player } from '../AppState';
import { MOVE_FORWARD_IN_HISTORY, SET_ANALYSIS_GAME } from './analysisGameActions';
import produce from 'immer';
import { arePointsEqual, playerToTileValue } from '../../util';
import { getWinResult } from '../../util/CheckBoard';
import { getNewActiveBoards } from '../../util/ActiveBoards';

const initialState: AnalysisGame = {
    id: '',
    board: [],
    activeBoards: [],
    game: {
        isFinished: true,
        winningPlayer: null,
        currentPlayer: Player.Cross
    },
    moves: [],
    currentMove: 1
};

export const analysisGameReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        case SET_ANALYSIS_GAME: {
            return action.payload;
        }
        case MOVE_FORWARD_IN_HISTORY: {
            const newState = produce( state, draftState => {
                const movesToMoveForward = action.payload;
                draftState.currentMove += movesToMoveForward;

                const moveIndex = state.moves.findIndex( m => m.moveNumber === draftState.currentMove );
                const lastPlayer = state.moves[moveIndex].player;
                if (lastPlayer === Player.Circle) {
                    state.game.currentPlayer = Player.Cross;
                } else {
                    state.game.currentPlayer = Player.Circle;
                }

                const movesToApply = state.moves.slice( state.currentMove, moveIndex + 1 );
                movesToApply.forEach( m => {
                    const boardToChange = draftState.board.find( b => arePointsEqual( b.position, m.boardPosition ) );
                    const tileToChange = boardToChange!.tiles.find( t => arePointsEqual( t.position, m.tilePosition ) );
                    tileToChange!.value = playerToTileValue( m.player );

                    const winResult = getWinResult( boardToChange!.tiles );
                    if (winResult.isFinished) {
                        boardToChange!.value = playerToTileValue( winResult.winningPlayer, true );
                    }
                } );

                const lastMove = movesToApply[movesToApply.length - 1].tilePosition;
                draftState.activeBoards = getNewActiveBoards( lastMove, draftState.board );
            } );
            return newState;
        }
        default: {
            return state;
        }
    }
};