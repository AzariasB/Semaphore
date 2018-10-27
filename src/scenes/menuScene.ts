import { Button } from '../objects/button';
import { Scene } from '../config/scene';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';

/**
 * Main menu scene
 */
export class MenuScene extends Scene {

    /**
     * All the buttons to draw
     */
    private drawables: Button[] = [];

    constructor(game: Game) {
        super(game, "menu");
        const playButton = new Button(game.target.width / 2, 100, "Jouer");
        playButton.onClick(() => {
            game.sm.changeScene('transition', this, 'game');
        });
        const trainButton = new Button(game.target.width / 2, 200, "Entraînement");
        const helpButton = new Button(game.target.width / 2, 300, "Aide");
        const aboutButton = new Button(game.target.width / 2, 400, "A propos");
        this.drawables.push(playButton, helpButton, trainButton, aboutButton);
    }

    update(delta: number){  
    }

    /**
     * Draws all the button
     */
    draw(g: CanvasRenderingContext2D) {
        this.drawables.map(d => d.draw(g));
    }

    handleKeyboardEvent(ev: KeyboardEvent) {
        
    }

    handleMouseEvent(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        this.drawables.map(m => m.handleMouseClick(ev, g));
    }
}