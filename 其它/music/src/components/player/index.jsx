import React from 'react';
import './style.scss';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import Scroll from '@components/scroll';

@inject('playerStore')
@observer
class Player extends React.Component {
    constructor() {
        super();
        this.back = this.back.bind(this);
    }

    get playlist() {
        return this.props.playerStore.playlist;
    }

    get fullScreen() {
        return this.props.playerStore.fullScreen;
    }

    get currentSong() {
        return this.props.playerStore.currentSong;
    }

    get playing() {
        return this.props.playerStore.playing;
    }

    get cdCls() {
        return this.playing ? 'play' : 'play pause';
    }

    back() {
        this.props.playerStore.setFullScreen(false);
    }

    open() {
        this.props.playerStore.setFullScreen(true);
    }

    middleTouchStart() {

    }

    middleTouchMove() {

    }

    middleTouchEnd() {

    }

    render() {
        return (
            <div className={classnames('player', { hide: !this.playlist.length })}>
                <div className={classnames('normal-player', { hide: !this.fullScreen })}>
                    <div className="background">
                        <img width="100%" src={this.currentSong.image} />
                    </div>
                    <div className="top">
                        <div className="back" onClick={this.back}>
                            <i className="icon-back"></i>
                        </div>
                        <h1 className="title">{this.currentSong.name}</h1>
                        <h2 className="subtitle">{this.currentSong.singer}</h2>
                    </div>
                    <div className="middle"
                        onTouchStart={this.middleTouchStart}
                        onTouchMove={this.middleTouchMove}
                        onTouchEnd={this.middleTouchEnd}
                    >
                    <div className="middle-l" ref="middleL">
                        <div className="cd-wrapper" ref="cdWrapper">
                            <div className={classnames('cd', this.cdCls)}>
                                <img className="image" src={this.currentSong.image} />
                            </div>
                        </div>
                        <div className="playing-lyric-wrapper">
                            {/* <div className="playing-lyric">{playingLyric}</div> */}
                        </div>
                    </div>
                    {/* <Scroll className="middle-r" ref="lyricList" data="currentLyric && currentLyric.lines">
                        <div className="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine"
                                    className={classnames('text', {'current': currentLineNum ===index})}
                                    v-for="(line,index) in currentLyric.lines">{line.txt}</p>
                            </div>
                        </div>
                    </Scroll> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
