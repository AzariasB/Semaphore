import { Drawable } from './drawable';
import * as TWEEN from '@tweenjs/tween.js';
import { Scene } from '../config/scene';

/**
 * A single eye of the 'messenger', can blink
 * at random times
 */
export class Eye extends Drawable {

    private radiusBlink: TWEEN.Tween;
    private canBlink = true;

    constructor(
        scene: Scene,
        private x: number,
        private y: number,
        private radius: number = 3) {
        super(scene);
        this.renewBlink();
    }

    /**
     * Creates a new blinking effect
     */
    private renewBlink(){
        let old = this.radiusBlink;
        this.radiusBlink = this.tween()
            .to({radius: 0}, 200)
            .repeat(1)
            .easing(TWEEN.Easing.Bounce.InOut)
            .yoyo(true)
            .onComplete(_ => this.renewBlink());
        if (old) this.scene.removeTween(old);
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