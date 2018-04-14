import * as React from 'react';
import BigBoard from './board/BigBoard/BigBoard';
import GameFinishedDisplay from './GameFinishedDisplay/GameFinishedDisplay';
import GithubCorner from 'react-github-corner';

interface AppProps {
}

interface AppRootState {
}

export class App extends React.Component<AppProps, AppRootState> {

    constructor( props: any ) {
        super( props );
    }

    render() {
        return (
            <>
                <GithubCorner
                    href="https://github.com/maracuja-juice/ultimate-tic-tac-react"
                    bannerColor="#008891"
                    octoColor="#fff"
                    size={80}
                    direction="right"
                />
                <div className="center">
                    <GameFinishedDisplay />
                    <BigBoard/>
                </div>
            </>
        );
    }
}