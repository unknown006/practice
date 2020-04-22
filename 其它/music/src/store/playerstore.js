import { observable, computed, action, autorun } from 'mobx';
import { playMode } from '@assets/utils/config.js';
import { shuffle } from '@assets/utils/util.js';

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    });
}

class PlayerStore {
    @observable singer = {}

    @action setSinger(singer) {
        this.singer = singer;
    }

    @observable playing = false

    @action setPlayingState(flag) {
        this.playing = flag;
    }

    @observable fullScreen = false;

    @action setFullScreen(flag) {
        this.fullScreen = flag;
    }

    @observable _playlist = []

    @computed get playlist() {
        return this._playlist.slice();
    }

    @action setPlayList(list) {
        this._playlist = list;
    }

    @observable _sequenceList = []

    @computed get sequenceList() {
        return this._sequenceList.slice();
    }

    @action setSequenceList(list) {
        this._sequenceList = list;
    }

    @observable mode = playMode.sequence

    @action setPlayMode(mode) {
        this.mode = mode;
    }

    @observable currentIndex = -1

    @action setCurrentIndex(index) {
        this.currentIndex = index;
    }

    @computed get currentSong() {
        return this.playlist[this.currentIndex] || {};
    }

    // 选择播放歌曲
    @action selectPlay({list, index}) {
        this.setSequenceList(list);
        if (this.mode === playMode.random) {
            const randomList = shuffle(list);
            this.setPlayList(randomList);
            index = findIndex(randomList, list[index]);
        } else {
            this.setPlayList(list);
        }
        this.setCurrentIndex(index);
        this.setFullScreen(true);
        this.setPlayingState(true);
    }
    // 随机播放歌曲
    @action randomPlay({list}) {
        this.setPlayMode(playMode.random);
        this.setSequenceList(list);
        const randomList = shuffle(list);
        this.setPlayList(randomList);
        this.setCurrentIndex(0);
        this.setFullScreen(true);
        this.setPlayingState(true);
    }
}

const playerStore = new PlayerStore();

autorun(() => {
    console.log('playerStore: ', playerStore);
});

export default playerStore;
