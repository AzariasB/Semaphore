import {  Scene } from '../config/scene';
import { Button } from '../objects/button';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';
import { DIFFICULTY } from '../utils/constants';

export class GameModeChoiceScene extends Scene {

    constructor(game: Game){
        super(game);
        let top = 150;
        this.add(Button, game.target.width / 3, top, "Infini", () => this.goWithTime(Infinity)),
        this.add(Button, game.target.width / 3, top += 100, "Chrono", () => this.goWithTime(1));
        this.add(Button, game.target.width / 3, top += 100, "Limite", () => this.goWithTime(1));

        top = 150;
        this.add(Button, 2 * game.target.width / 3, top, "Facile", () => this.goWithTime(DIFFICULTY.EASY)),
        this.add(Button, 2 * game.target.width / 3, top += 100, "Moyen", () => this.goWithTime(DIFFICULTY.MEDIUM)),
        this.add(Button, 2 * game.target.width / 3, top += 100, "Difficile", () => this.goWithTime(DIFFICULTY.HARD)),
        this.add(Button, game.target.width / 2, 550, "< Menu",() => {
            game.sm.changeScene('transition', this, 'menu');
        });
    }

    private goWithTime(time: number){
        this.game.sm.changeScene('transition', this, 'game', time);
    }

    public draw(g: CanvasRenderingContext2D) {
        super.draw(g);
        g.font = "40pt Connection";
        g.fillText("Mode", this.game.target.width / 4, 50);
        g.fillText("Options", 2 * this.game.target.width /3, 50);

        g.lineWidth = 3;
        g.moveTo(50, 500);
        g.lineTo(this.game.target.width - 50, 500);
        g.stroke();

        g.moveTo(this.game.target.width / 2, 10);
        g.lineTo(this.game.target.width / 2, 490);
        g.stroke();
    }

}