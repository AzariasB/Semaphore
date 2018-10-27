import { IDrawable } from './idrawable';
import * as TWEEN from '@tweenjs/tween.js';

/**
 * A single eye of the 'messenger', can blink
 * at random times
 */
export class Eye implements IDrawable {

    private radiusBlink: TWEEN.Tween;
    private canBlink = true;

    constructor(private x: number, private y: number, private radius: number = 3) {
        this.renewBlink();
    }

    /**
     * Creates a new blinking effect
     */
    private renewBlink(){
        var old = this.radiusBlink;
        this.radiusBlink = new TWEEN.Tween(this)
            .to({radius: 0}, 200)
            .repeat(1)
            .easing(TWEEN.Easing.Bounce.InOut)
            .yoyo(true)
            .onComplete(_ => this.renewBlink());
        if (old) TWEEN.remove(old);
        this.canBlink = true;
    }

    /**
     * Does blink (only works when) the eye
     * is not already blinking
     */
    blink() {
        if (this.canBlink){
            this.canBlink = false;
            this.radiusBlink.start();
        }
    }

    /**
     * Draws the eye
     */
    draw(g: CanvasRenderingContext2D){
        g.save();
        g.shadowBlur = 0;
        g.fillStyle = 'white';
        g.beginPath();
        g.moveTo(this.x, this.y);
        g.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        g.fill();
        
        g.restore();
    }
}