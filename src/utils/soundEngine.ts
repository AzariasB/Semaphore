
export enum Sound{
    Correct = 'correct',
    Wrong = 'wrong'
}

type SoundRegistry = {
    [TKEY in Sound] : {
        path: string,
        audio? : HTMLAudioElement
    }
}

export class SoundEngine {
       
    private sounds: SoundRegistry = {
        [Sound.Correct] : {path:'/assets/sounds/correct.ogg'},
        [Sound.Wrong] : {path:'/assets/sounds/wrong.mp3'}
    };

    public play(s: Sound) {
        if( !this.sounds[s]) return;
        const audio = this.sounds[s].audio;
        if(!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    public async load() : Promise<boolean> {
        let promises = [];
        Object.keys(this.sounds).map(k => {
            const p = this.sounds[k];
            p.audio = new Audio(p.path);
            const prom = new Promise((res) => {
                p.audio.addEventListener('loadeddata', () => {
                    res(true);
                });
            });
            promises.push(prom);
        });
        return (await Promise.all<boolean>(promises)).every(x => x);
    }
}