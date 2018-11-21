import {  Scene } from '../config/scene';
import { Button } from '../objects/button';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';
import { DIFFICULTY } from '../utils/constants';

export class GameModeChoiceScene extends Scene {

    constructor(game: Game){
        super(game, 'gameModeChoice');
        this.add(Button, game.target.width / 2, 100, "Infini", () => this.goWithTime(Infinity)),
        this.add(Button, game.target.width / 2, 200, "Facile", () => this.goWithTime(DIFFICULTY.EASY)),
        this.add(Button, game.target.width / 2, 300, "Moyen", () => this.goWithTime(DIFFICULTY.MEDIUM)),
        this.add(Button, game.target.width / 2, 400, "Difficile", () => this.goWithTime(DIFFICULTY.HARD)),
        this.add(Button, game.target.width / 2, 500, "< Menu",() => {
            game.sm.changeScene('transition', this, 'menu');
        });
    }

    private goWithTime(time: number){
        this.game.sm.changeScene('transition', this, 'game', time);
    }

    public draw(g: CanvasRenderingContext2D) {
        super.draw(g);
    }

}