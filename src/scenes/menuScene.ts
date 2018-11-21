import { Button } from '../objects/button';
import { Scene } from '../config/scene';
import { CustomMouseEvent } from '../config/gameConfig';
import { Game } from '../game';

/**
 * Main menu scene
 */
export class MenuScene extends Scene {

    constructor(game: Game) {
        super(game, "menu");
        const playButton = this.add(Button, game.target.width / 2, 100, "Jouer", () => {
            game.sm.changeScene('transition', this, 'gameModeChoice');
        });
        this.add(Button, game.target.width / 2, 200, "Entraînement");
        this.add(Button, game.target.width / 2, 300, "Aide");
        this.add(Button, game.target.width / 2, 400, "A propos");
    }

    update(delta: number){  
    }

    /**
     * Draws all the button
     */
    draw(g: CanvasRenderingContext2D) {
        super.draw(g);
    }

    handleKeyboardEvent(ev: KeyboardEvent) {
        
    }
}