import { IDrawable } from "./idrawable";
import * as TWEEN from '@tweenjs/tween.js';
import { Color } from "../utils/color";

/**
 * Simple ripple effect when the
 * user found the correct letter
 */
export class Ripple implements IDrawable {
    
    private radTween: TWEEN.Tween;
    private color: Color;
    private sWidth = 20;


    constructor(private x: number, private y: number, private radius: number = 5, color: Color = new Color(0, 255, 0)) {
        this.radTween = new TWEEN.Tween(this)
                                .to({radius: 100, sWidth: 0}, 1000)
                                .easing(TWEEN.Easing.Quadratic.Out)
                                .start();
        this.color = color;
        this.color.tween().to({a: 0}, 1000).easing(TWEEN.Easing.Exponential.In).start();
    }
    
    public onFinish(callback){
        this.radTween.onComplete(callback);
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