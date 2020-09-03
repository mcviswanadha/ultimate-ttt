import * as React from 'react';
import { shallow } from 'enzyme';
import { Highlight, Player } from '../../../state/AppState';
import { BigBoard } from './BigBoard';
import {
  circleFinishedBoardMock,
  unfinishedBoardMock,
} from '../../../__mocks__';
import { SmallBoard } from '../SmallBoard/SmallBoard';

describe('BigBoard', function () {
  it('should render 9 small boards', () => {
    const playerMoved = jest.fn(() => {});
    const activeBoards = [{ x: 0, y: 0 }];

    const bigBoard = shallow(
      <BigBoard
        currentPlayer={Player.Cross}
        board={unfinishedBoardMock}
        activeBoards={activeBoards}
        onPlayerMoved={playerMoved}
      />,
    );

    expect(bigBoard.children().length).toBe(9);
  });

  it('should match snapshot', () => {
    const playerMoved = jest.fn(() => {});
    const activeBoards = [{ x: 0, y: 0 }];

    const bigBoard = shallow(
      <BigBoard
        currentPlayer={Player.Cross}
        board={unfinishedBoardMock}
        activeBoards={activeBoards}
        onPlayerMoved={playerMoved}
      />,
    );

    expect(bigBoard).toMatchSnapshot();
  });

  describe('highlight', () => {
    it('should pass undefined to smallBoards if higlight is not set', () => {
      const playerMoved = jest.fn(() => {});

      const bigBoard = shallow(
        <BigBoard
          currentPlayer={Player.Cross}
          board={circleFinishedBoardMock}
          activeBoards={[]}
          onPlayerMoved={playerMoved}
          highlight={undefined}
        />,
      );

      const smallBoards = bigBoard.find(SmallBoard);
      smallBoards.forEach((board) => {
        const props = board.props();
        expect(props.highlight).toBeUndefined();
      });
    });

    it('should pass the correct small board the higlight prop', () => {
      const playerMoved = jest.fn(() => {});
      const higlight: Highlight = {
        condition: true,
        position: {
          boardPosition: { x: 2, y: 1 },
          tilePosition: { x: 0, y: 0 },
        },
      };

      const bigBoard = shallow(
        <BigBoard
          currentPlayer={Player.Cross}
          board={circleFinishedBoardMock}
          activeBoards={[]}
          onPlayerMoved={playerMoved}
          highlight={higlight}
        />,
      );

      const smallBoards = bigBoard.find(SmallBoard);
      smallBoards.forEach((board) => {
        const props = board.props();
        if (props.x === 2 && props.y === 1) {
          expect(props.highlight).toEqual(higlight);
        } else {
          expect(props.highlight).toEqual({ condition: false });
        }
      });
    });
  });
});
