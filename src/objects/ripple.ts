import { Drawable } from "./drawable";
import * as TWEEN from '@tweenjs/tween.js';
import { Color } from "../utils/color";
import { Scene } from "../config/scene";

/**
 * Simple ripple effect when the
 * user found the correct letter
 */
export class Ripple extends Drawable {
    private color: Color;
    private sWidth = 20;


    constructor(
        scene: Scene,
        private x: number,
        private y: number,
        private radius: number = 5,
        color: Color = new Color(0, 255, 0)) {
        super(scene);
        new TWEEN.Tween(this)
                        .to({radius: 100, sWidth: 0}, 1000)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start()
                        .onComplete(() => this.kill());
        this.color = color;
        this.color.tween().to({a: 0}, 1000).easing(TWEEN.Easing.Exponential.In).start();
    }

    public draw(g: CanvasRenderingContext2D) {
        g.lineWidth = this.sWidth;
        g.strokeStyle = this.color.toString();
        g.beginPath();
        g.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        g.stroke();

        g.lineWidth = this.sWidth / 2;
        g.beginPath();
        g.arc(this.x, this.y, this.radius / 2, 0, 2 * Math.PI);
        g.stroke();
    }



}