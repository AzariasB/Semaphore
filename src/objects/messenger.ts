import { Flag } from "./flag";
import { Holder } from "./holder";
import { Drawable } from "./drawable";
import { getLetterRotations } from "../utils/angles";
import { Scene } from "../config/scene";
import * as TWEEN from '@tweenjs/tween.js';

/**
 * Main actor of the game, is the one with a holder
 * and two flags
 */
export class Messenger extends Drawable {
    private flag1: Flag;
    private flag2: Flag;
    private circleRadius = 50;
    private yTween: TWEEN.Tween;
    private yTranslate = 0;
    private holder: Holder;


    constructor(scene: Scene, 
        private x: number, 
        private y: number) {
        super(scene);
        this.holder = new Holder(scene, x, y);
        this.flag1 = new Flag(scene, x, y, null);
        this.flag2 = new Flag(scene, x, y, null);
        this.flag1.display = this.flag2.display = false;
        
        this.yTween = new TWEEN.Tween(this)
                            .to({yTranslate: 5}, 1000)
                            .yoyo(true)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .repeat(Infinity)
                            .start();
    }

    /**
     * Draws all the elements
     * 
     * @param g target
     */
    public draw(g: CanvasRenderingContext2D) {
        g.save();
        g.shadowColor = 'gray';
        g.shadowBlur = 20;
        g.translate(0, this.yTranslate);
        this.holder.draw(g);
        this.flag1.draw(g);
        this.flag2.draw(g);
        g.restore();
    }

    /**
     * Shows a letter using two flags
     * 
     * @param letter the letter to send
     */
    public displayLetter(letter: string){
        this.flag1.display = this.flag2.display = false;
        if (letter.length > 1) return;
        const [a1, a2] = getLetterRotations(letter);
        if(a1 !== undefined){
          this.flag1.display = true;
          this.flag1.rotation = a1;
          this.flag1.x = this.x - this.circleRadius * Math.cos(a1);
          this.flag1.y = this.y - this.circleRadius * Math.sin(a1);
        }
        if (a2 !== undefined){
          this.flag2.rotation = a2;
          this.flag2.x = this.x - this.circleRadius * Math.cos(a2);
          this.flag2.y = this.y - this.circleRadius * Math.sin(a2);
          this.flag2.display = true;
        }
    }
}