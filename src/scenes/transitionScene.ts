
import { Scene } from '../config/scene';
import * as TWEEN from '@tweenjs/tween.js';
import { Game } from '../game';
import { drawShape } from '../utils/rendering';

/**
 * Does a transition between two states
 * using a cinema-like clap
 */
export class TransitionScene extends Scene {

    private tween: TWEEN.Tween;
    private enteringScene: Scene;
    private exitingScene: Scene;
    private progressPercent = 0;
    private renderEntering = false;

    constructor(game: Game) {
        super(game, "transition");
    }

    init(from: Scene, to){
        this.renderEntering = false;
        this.progressPercent = 0;
        this.exitingScene = from;
        this.enteringScene = this.game.sm.getScene(to);
        this.tween = new TWEEN.Tween(this)
                                .to({progressPercent : 100}, 500)
                                .easing(TWEEN.Easing.Quadratic.Out)
                                .onComplete(() => this.openTransition())
                                .start();
    }

    /**
     * Second phase of the transition,
     * opens up the clap and shows the new scene
     */
    private openTransition(){
        this.renderEntering = true;
        TWEEN.remove(this.tween);
        this.tween = new TWEEN.Tween(this)
            .to({progressPercent : 0}, 500)
            .delay(100)
            .easing(TWEEN.Easing.Quadratic.In)
            .onComplete(() => this.endTransition())
            .start();
    }

    private endTransition() {
        this.game.sm.changeScene(this.enteringScene.name);
    }

    draw(g: CanvasRenderingContext2D) {
        g.save();

        if(this.renderEntering) {
            this.enteringScene.draw(g);
        } else {
            this.exitingScene.draw(g);
        }

        const prog = this.progressPercent / 100,
            h = g.canvas.height,
            w = g.canvas.width,
            invP = 1 - prog,
            leftY = h * invP,
            bottomX = w * prog,
            rightY = h * prog,
            topX = w * invP;

        drawShape(g, [[0,h], [0, leftY], [bottomX, h]], {color: 'yellow', mode: 'fill'});
        drawShape(g, [[w, 0], [topX, 0], [w, rightY]], {color: 'red', mode: 'fill'});

        g.restore();
    }   

    update(d: number){
    }
}