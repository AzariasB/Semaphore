import {  Scene } from '../config/scene';
import { Button } from '../objects/button';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';

export class GameModeChoiceScene extends Scene {

    private drawables: Button[] = [];

    constructor(game: Game){
        super(game, 'gameModeChoice');
        const playButton = new Button(game.target.width / 2, 100, "Infini");
        playButton.onClick(() => {
            game.sm.changeScene('transition', this, 'game');
        });
        const trainButton = new Button(game.target.width / 2, 200, "Facile");
        const helpButton = new Button(game.target.width / 2, 300, "Moyen");
        const aboutButton = new Button(game.target.width / 2, 400, "Difficile");
        const backButton = new Button(game.target.width / 2, 500, "Menu");
        backButton.onClick(() => {
            game.sm.changeScene('transition', this, 'menu');
        });
        this.drawables.push(playButton, helpButton, trainButton, aboutButton, backButton);
    }

    public draw(g: CanvasRenderingContext2D) {
        this.drawables.map(d => d.draw(g));
    }

    handleMouseEvent(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        this.drawables.map(m => m.handleMouseClick(ev, g));
    }

}