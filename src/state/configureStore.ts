import { applyMiddleware, combineReducers, createStore } from 'redux';
import boardReducer from './currentGame/board/boardReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import gameReducer from './currentGame/game/gameReducer';
import moveReducer from './currentGame/moves/moveReducer';
import activeBoardsReducer from './currentGame/activeBoards/activeBoardsReducer';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import playerMovedSaga from './currentGame/moves/moveValidationSaga';
import boardCalculationSaga from './currentGame/board/boardCalculationSaga';
import activeBoardsCalculationSaga from './currentGame/activeBoards/activeBoardsCalculationSaga';
import checkGameFinishedSaga from './currentGame/game/checkGameFinishedSaga';
import saveFinishedGameSaga from './finishedGames/saveFinishedGameSaga';
import finishedGameReducer from './finishedGames/finishedGameReducer';
import { AppState, GameInformation } from './AppState';
import analysisGameReducer from './analysisGame/analysisGameReducer';
import loadFinishedGameSaga from './analysisGame/analysisGameSaga';
import howToPlayReducer from './howToPlay/howToPlayReducer';
import howToPlaySaga from './howToPlay/howToPlaySaga';
import onlineSaga from './currentGame/online/onlineSaga';
import onlineReducer from './currentGame/online/onlineReducer';

const currentGameReducer = combineReducers<GameInformation>({
  game: gameReducer,
  board: boardReducer,
  moves: moveReducer,
  activeBoards: activeBoardsReducer,
  online: onlineReducer,
});
export const rootReducer = combineReducers<AppState>({
  currentGame: currentGameReducer,
  finishedGames: finishedGameReducer,
  analysisGame: analysisGameReducer,
  howToPlay: howToPlayReducer,
});

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleWaresToApply = [sagaMiddleware];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middleWaresToApply.push(logger);
  }
  const middleware = applyMiddleware(...middleWaresToApply);

  const persistConfig = {
    key: 'finishedGames',
    whitelist: ['finishedGames'],
    storage: localStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composeWithDevTools(middleware));

  sagaMiddleware.run(rootSaga);

  return store;
}

function* rootSaga() {
  yield all([
    fork(playerMovedSaga),
    fork(boardCalculationSaga),
    fork(activeBoardsCalculationSaga),
    fork(checkGameFinishedSaga),
    fork(onlineSaga),
    fork(loadFinishedGameSaga),
    fork(saveFinishedGameSaga),
    fork(howToPlaySaga),
  ]);
}
