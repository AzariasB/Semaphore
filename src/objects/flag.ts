
import { Drawable } from './drawable';
import { Scene } from '../config/scene';
import { drawShape } from '../utils/rendering';
import * as TWEEN from '@tweenjs/tween.js';

/**
 * A single flag, can have 7 differents positions
 */
export class Flag extends Drawable {

    /**
     * Wether the flag should be drawn
     */
    public display: boolean = true;

    /**
     * y used for the floating effect
     */
    private yTranslate = 0;


    constructor(scene: Scene, 
                public x: number,
                public y: number,
                public rotation: number,
                private length:number = 150,
                private flagSide: number = 50){
            super(scene);
            this.tween()
                    .to({yTranslate: 5}, 1000)
                    .yoyo(true)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .repeat(Infinity)
                    .start();
    }


    /**
     * Draws the flag with the floating effect
     * 
     * @param g target
     */
    draw(g: CanvasRenderingContext2D) {
        if (!this.display) return;
        g.save();
        g.translate(0, this.yTranslate);

        const rot = this.rotation;

        const [tX, tY] = [this.x - Math.cos(rot) * this.length, this.y - Math.sin(rot) * this.length ];
        const [bX, bY] = [this.x - Math.cos(rot) * (this.length - this.flagSide), this.y - Math.sin(rot) * (this.length - this.flagSide)];
        const angle = rot - (Math.PI / 2);

        let uX, uY, lX, lY;
        //When on the left side
        if (rot < (Math.PI / 2) || rot > (3 * Math.PI) / 2 ) {
            [uX, uY] = [tX - Math.cos(angle) * this.flagSide, tY - Math.sin(angle) * this.flagSide];
            [lX, lY] = [bX - Math.cos(angle) * this.flagSide, bY - Math.sin(angle) * this.flagSide];
        } else {// when on the right side
            [uX, uY] = [tX + Math.cos(angle) * this.flagSide, tY + Math.sin(angle) * this.flagSide];
            [lX, lY] = [bX + Math.cos(angle) * this.flagSide, bY + Math.sin(angle) * this.flagSide];
        }
        
        // flag holder
        drawShape(g, [[this.x, this.y],[tX, tY]], {mode: 'stroke', lineWidth: 8, color: '#4C1917'})
        drawShape(g, [[this.x, this.y],[tX, tY]], {mode: 'stroke', lineWidth: 2, color: '#A33530'});
        drawShape(g, [[tX, tY], [uX, uY], [lX, lY], [bX, bY]], {mode:'fill', color: 'white'});

        g.shadowBlur = 0;
        // first triangle
        drawShape(g, [[tX, tY], [uX, uY], [bX, bY]], {mode: 'fill', color: '#FFEA00'});

        // second triangle
        drawShape(g, [[bX, bY], [lX, lY], [uX, uY]], {mode: 'fill', color: '#FF0000'});

        // 'hands'
        g.fillStyle = '#222222';
        g.beginPath();
        g.arc(this.x - Math.cos(rot) * 20, this.y - Math.sin(rot) * 20, 10, 0, Math.PI * 2);
        g.fill();

        g.restore();
    }
}