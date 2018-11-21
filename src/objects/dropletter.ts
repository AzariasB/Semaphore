import { Drawable } from './drawable';
import { Color } from '../utils/color';
import { random, LETTER_MAX_DIST } from '../utils/constants';
import * as TWEEN from '@tweenjs/tween.js';
import { Scene } from '../config/scene';

/**
 * simple effect of a letters dropping
 * (when the correct letter is found)
 */
export class DropLetter extends Drawable {

    private yTween: TWEEN.Tween;
    private xTween: TWEEN.Tween;
    private color: Color;
    private callbacks = [];

    constructor(
        scene: Scene,
        private letter: string,
        private x: number,
        private y: number){
        super(scene);
        this.yTween = new TWEEN.Tween(this)
                            .to({y: y + random(-LETTER_MAX_DIST, LETTER_MAX_DIST)}, 1001)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onComplete(() => this.callbacks.map(c => c()))
                            .start();
        this.xTween = new TWEEN.Tween(this)
                            .to({x: x + random(-LETTER_MAX_DIST, LETTER_MAX_DIST)}, 1001)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .start();
        this.color = new Color(0, 0 ,0, 1);
        this.color.tween()
                .to({a: 0}, 1000)
                .easing(TWEEN.Easing.Quintic.In)
                .start();
    }

    /**
     * 
     * @param callback a method to call when the effect is finished
     */
    public onFinish(callback){
        this.callbacks.push(callback);
    }

    /**
     * Draws the letter
     */
    public draw(g: CanvasRenderingContext2D) {
        g.fillStyle = this.color.toString();
        g.font = '20pt';
        g.fillText(this.letter, this.x - 10, this.y);
    }
    
}