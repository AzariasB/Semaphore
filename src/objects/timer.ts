import { Drawable } from './drawable';
import { Color } from '../utils/color';
import * as TWEEN from '@tweenjs/tween.js';
import { Scene } from '../config/scene';

/**
 * Timer/ Cooldwon effect
 * starts green and ends up red
 * Show the time remaining before the end of the guess
 * A trigger is called when the bottom of the timer is reached
 */
export class Timer extends Drawable {

    private color: Color;
    private height: number;
    private heightTween: TWEEN.Tween = null;
    private clrTween: TWEEN.Tween = null;
    private callbacks = [];

    constructor(scene: Scene,
                private x: number, 
                private y: number,
                private width: number,
                private readonly startHeight: number,
                private readonly totalTime: number) {
        super(scene);
        this.color = new Color(0, 255, 0);
        this.height = startHeight;
    }

    public onFinish(callback){
        this.callbacks.push(callback);
    }

    /**
     * Starts the timer
     */
    public start(){
        if (this.heightTween !== null) {
            this.heightTween.stop();
            this.heightTween = null;
        }

        if (this.clrTween !== null) {
            this.clrTween.stop();
            this.clrTween = null;
        }

        this.height = this.startHeight;
        this.color = new Color(0, 255, 0);

        this.heightTween = new TWEEN.Tween(this)
                                .to({height: 0}, this.totalTime)
                                .onComplete(() => this.callbacks.map(c => c()))
                                .start();
        this.clrTween = this.color.tween()
            .to({r: 255, g: 0}, this.totalTime)
            .start();
    }

    /**
     * Draws the rectangle corresponding to the time remaining
     */
    public draw(g: CanvasRenderingContext2D) {
        g.fillStyle = this.color.toString();
        g.fillRect(this.x, this.y, this.width, -this.height);
    }

}