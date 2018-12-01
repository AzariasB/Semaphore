import { Scene } from '../config/scene';
import { Game } from '../game';


function id(target: string){
    return document.getElementById(target);
}

export class MenuScene extends Scene {

    private panels: HTMLElement[] = [];
    private btns: HTMLButtonElement[] = [];
    private readonly gameModes = {
        'clock' : 'data-time',
        'precision': 'data-difficulty',
        'infinity' : 'data-infinity'
    };

    constructor(game: Game){
        super(game);
        this.setup();
    }

    private hide = (el: HTMLElement) => el.classList.add('hiding');
    private show = (el: HTMLElement) => el.classList.remove('hiding');
    private select = (el: HTMLElement) => el.classList.add('selected');
    private deselect = (el: HTMLElement) => el.classList.remove('selected');

    private togglePannel(panel: HTMLElement, btn: HTMLButtonElement){
        if(panel.classList.contains('pannel-2')){
            if(this.panels.length === 0){
                this.panels.push(panel);
                this.btns.push(btn);
            } else if(this.panels[0] === panel){
                this.panels.map(x => this.hide(x));
                this.btns.map(x => this.deselect(x));
                this.btns = [];
                this.panels = [];
                return;
            } else {
                this.panels.map(x => this.hide(x));
                this.btns.map(x => this.deselect(x));
                this.btns = [btn];
                this.panels = [panel];
            }
        } else if(panel.classList.contains('pannel-3')){
            if(this.panels.length === 1){
                this.btns.push(btn);
                this.panels.push(panel);
            } else if(this.panels[1] === panel){
                this.panels.pop();
                this.btns.pop();
                this.deselect(btn);
                this.hide(panel);
                return;
            } else {
                this.hide(this.panels[1]);
                this.deselect(this.btns[1]);
                this.btns.pop();
                this.panels.pop();
                this.panels.push(panel);
                this.btns.push(btn);
            }
        }
        this.select(btn);
        this.show(panel);
    }

    /**
     * Closes all the menu panels
     */
    private cleanup(){
        this.panels.map(x => this.hide(x));
        this.panels = [];
        this.btns.map(x => this.deselect(x));
        this.btns = [];
        this.hide(id('menu'));
        this.show(id('game-menu'));
    }

    setup(){        
        const buttons = Array.from(document.getElementsByTagName('button'));
        buttons.filter(x => x.hasAttribute('data-target')).map(x => {
            const target = x.getAttribute('data-target');
            x.addEventListener('click', () => {
                this.togglePannel(id(target), x);
            });
        });
        Object.keys(this.gameModes).map(k => {
            const dataName = this.gameModes[k];
            buttons.filter(x => x.hasAttribute(dataName)).map(x => {
                const data = +x.getAttribute(dataName);
                x.addEventListener('click', () => {
                    this.cleanup();
                    this.game.sm.changeScene('game', data, k);
                });
            });
        });
    }
}