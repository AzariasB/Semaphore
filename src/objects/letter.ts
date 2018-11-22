import { Drawable } from './drawable';
import { Color } from '../utils/color';
import * as TWEEN from '@tweenjs/tween.js';
import { Ripple } from './ripple'; 
import { DropLetter } from './dropletter';
import { Scene } from '../config/scene';

/**
 * Question mark displayed to ask the user
 * to press the key he thinks could be the one
 * shown
 */
export class Letter extends Drawable {

    private xTween: TWEEN.Tween = null;
    private xTranslate = 0;
    public currentLetter = '?';
    private letterVisible = false;
    private currentColor = new Color(0, 0, 0);

    public get isLetterVisible(){
        return this.letterVisible;
    }

    constructor(
        scene: Scene,
        private x: number,
        private y: number){
        super(scene);
    }

    /**
     * If the given letter is the one to be guessed
     */
    public is(letter: string){
        return this.currentLetter === letter;
    }

    public showLetter(){
        this.letterVisible = true;
        this.scene.add(Ripple, this.x, this.y, 5, new Color(255, 0, 0));
    }

    public hideLetter(){
        this.letterVisible = false;
    }

    public tooLate(){
        this.scene.add(Ripple, this.x, this.y, 5, new Color(255, 0, 0));
        this.wrong();
    }

    /**
     * When the user guessed the correct letter
     * Shows the letter and adds some effects
     */
    public correct(){
        this.scene.add(Ripple, this.x, this.y);

        for(let i = 0; i < 10; ++i){
            this.scene.add(DropLetter, this.currentLetter, this.x, this.y);
        }
    }

    /**
     * When the user guessed a wrong letter
     * Turns the question mark red, and adds a shake effect
     */
    public wrong(){
        if(this.xTween !== null) return;
        this.tween(this.currentColor)
            .to({r: 255, g: 0, b: 0}, 250)
            .yoyo(true)
            .repeat(3)
            .start();
        this.xTween = this.tween()
                        .to({xTranslate: 10 * Math.PI}, 1000)
                        .onComplete(() => this.reset())
                        .start();
    }

    /**
     * Inherited function
     * 
     * @param g 
     */
    draw(g: CanvasRenderingContext2D) {
        g.font = "40pt Connection";
        g.fillStyle = this.currentColor.toString();
        g.fillText(this.letterVisible ? this.currentLetter : '?', this.x + Math.sin(this.xTranslate) * 5 - 10, this.y + 10);
    }

    /**
     * Resets all the effects and such
     */
    private reset(){
        this.xTranslate = 0;
        this.scene.removeTween(this.xTween);
        this.xTween = null;
    }

}