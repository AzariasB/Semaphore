import {  Scene } from '../config/scene';
import { Button } from '../objects/button';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';
import { DIFFICULTY } from '../utils/constants';

export class GameModeChoiceScene extends Scene {

    private drawables: Button[] = [];

    constructor(game: Game){
        super(game, 'gameModeChoice');
        this.drawables.push(new Button(game.target.width / 2, 100, "Infini", () => this.goWithTime(Infinity)),
            new Button(game.target.width / 2, 200, "Facile", () => this.goWithTime(DIFFICULTY.EASY)),
            new Button(game.target.width / 2, 300, "Moyen", () => this.goWithTime(DIFFICULTY.MEDIUM)),
            new Button(game.target.width / 2, 400, "Difficile", () => this.goWithTime(DIFFICULTY.HARD)),
            new Button(game.target.width / 2, 500, "< Menu",() => {
                game.sm.changeScene('transition', this, 'menu');
            })
        );
    }

    private goWithTime(time: number){
        this.game.sm.changeScene('transition', this, 'game', time);
    }

    public draw(g: CanvasRenderingContext2D) {
        this.drawables.map(d => d.draw(g));
    }

    handleMouseEvent(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        if(this.drawables.some(m => m.handleMouseClick(ev, g))){
            this.game.target.style.cursor = 'pointer';
        } else {
            this.game.target.style.cursor = 'default';
        }
    }

}