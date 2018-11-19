import { IDrawable } from './idrawable';
import { Color } from '../utils/color';
import * as TWEEN from '@tweenjs/tween.js';
import { Ripple } from './ripple'; 
import { DropLetter } from './dropletter';

/**
 * Question mark displayed to ask the user
 * to press the key he thinks could be the one
 * shown
 */
export class Letter implements IDrawable {

    private xTween: TWEEN.Tween = null;
    private xTranslate = 0;
    public currentLetter = '?';
    private currentColor = new Color(0, 0, 0);
    private effects: IDrawable[];

    constructor(private x: number, private y: number){
        this.effects = [];
    }

    /**
     * If the given letter is the one to be guessed
     */
    public is(letter: string){
        return this.currentLetter === letter;
    }

    public showLetter(){
    }

    public hideLetter(){
    }

    public tooLate(){
        let rip = new Ripple(this.x, this.y, 5, new Color(255, 0, 0));
        rip.onFinish(() => this.effects = this.effects.filter(x => x !== rip));
        this.effects.push(rip);
        this.wrong();
    }

    /**
     * When the user guessed the correct letter
     * Shows the letter and adds some effects
     */
    public correct(){
        let rip = new Ripple(this.x, this.y);
        rip.onFinish(() => this.effects = this.effects.filter(x => x !== rip));
        this.effects.push(rip);

        for(let i = 0; i < 10; ++i){
            let ltr = new DropLetter(this.currentLetter, this.x, this.y);
            ltr.onFinish(() => this.effects.filter(x => x !== ltr));
            this.effects.push(ltr);
        }
    }

    /**
     * When the user guessed a wrong letter
     * Turns the question mark red, and adds a shake effect
     */
    public wrong(){
        if(this.xTween !== null) return;
        this.currentColor.tween().to({r: 255, g: 0, b: 0}, 250).yoyo(true).repeat(3).start();
        this.xTween = new TWEEN.Tween(this)
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
        g.fillText('?', this.x + Math.sin(this.xTranslate) * 5 - 10, this.y + 10);

        this.effects.map(x => x.draw(g));
    }

    /**
     * Resets all the effects and such
     */
    private reset(){
        this.xTranslate = 0;
        this.xTween = null;
    }

}