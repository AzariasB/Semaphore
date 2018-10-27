import { IDrawable } from "./idrawable";
import { CustomMouseEvent } from "../config/gameConfig";
import * as TWEEN from '@tweenjs/tween.js';
import { drawShape } from "../utils/rendering";

/**
 * Button is a simple class, contains a text
 * and calls a list of functions 
 * Also has a hover animation
 */
export class Button implements IDrawable {
    
    /**
     * Height of the button, is always
     * the same, no matter the button
     */
    public static readonly HEIGHT = 70;

    /**
     * width of the button, is calculated
     * when drawn for the first time, based
     * on the text's length
     */
    private width: number = null;

    /**
     * All the methods to call when
     * the butotn is clicked
     */
    private listeners = [];

    /**
     * May be 'none', 'hover' or 'clicked'
     */
    private state: string = 'none';

    /**
     * Tween used for the animation
     * when the button is hovered
     */
    private hoverTween: TWEEN.Tween = null;
    
    /**
     * between 0 and 1 for the hover animation
     */
    private hoverPercent = 0;

    /**
     * shortcut for the height
     */
    private readonly height = Button.HEIGHT;

    constructor(private x: number,
                private y: number,
                private text: string){
        
    }

    /**
     * Adds a listener for when the 
     * button is clicked
     */
    public onClick(cb: () => void){
        this.listeners.push(cb);
    }

    /**
     * resets the 'hover' tween
     */
    private clearTween(){
        if (this.hoverTween === null) return;
        this.hoverTween.stop();
        this.hoverTween = null;
    }

    /**
     * draws the 'hover' effect when this 
     * button is hovered
     * 
     * @param g the target where to draw the hover effect
     */
    private drawHoverEffect(g: CanvasRenderingContext2D) {
        const leftY = this.width *  this.hoverPercent / 100,
                bottomX = this.width * this.hoverPercent / 100;

        g.save();
        g.beginPath();
        g.rect(this.x, this.y, this.width, Button.HEIGHT);
        g.clip();

        drawShape(g, [[this.x, this.y + Button.HEIGHT], [this.x, this.y + Button.HEIGHT - leftY], [this.x + bottomX, this.y + Button.HEIGHT]], {mode: 'fill', color: 'red'});

        g.restore();
    }

    /**
     * Draws the button and the hover effect
     */
    draw(g: CanvasRenderingContext2D) {
        g.save();
        g.translate(-this.width / 2, - this.height / 2);
        g.font = `${this.height - 20}pt Connection`;
        if (this.width === null) this.width = g.measureText(this.text).width + 20;

        g.fillStyle = 'yellow';
        g.fillRect(this.x, this.y, this.width, this.height);
        this.drawHoverEffect(g);

        g.fillStyle = 'black';
        g.fillText(this.text, this.x + 10, this.y + this.height - 10);
        g.restore();
    }

    /**
     * Whether this button contains the given position
     */
    private contains(x: number, y: number){
        return x > this.x - 10 - this.width / 2 && y > this.y - 10 - this.height / 2  && x < this.x + this.width / 2 && y < this.y + this.height / 2 + 10;
    }

    /**
     * Inherited function
     * if the event is a click and the mouse is inside
     * the button, triggers all the listeners
     * 
     * @param ev 
     * @param g 
     */
    handleMouseClick(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        if(this.contains(ev.a, ev.b)) {
            if(ev.type === 'mousedown'){
                this.listeners.map(l => l());
            } else if(ev.type === 'mousemove' && this.state === 'none'){
                this.state = 'hover';
                this.clearTween();
                this.hoverTween = new TWEEN.Tween(this)
                                        .to({hoverPercent: 100 + (this.height / this.width) * 100}, this.width)
                                        .easing(TWEEN.Easing.Quadratic.Out)
                                        .start();
            }
        } else if(this.state === 'hover'){
            this.state = 'none';
            this.clearTween();
            this.hoverTween = new TWEEN.Tween(this)
                                    .to({hoverPercent: 0}, this.width / 1.2)
                                    .easing(TWEEN.Easing.Quadratic.In)
                                    .start();
        }
    }
}