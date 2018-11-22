import { Drawable } from "./drawable";
import { CustomMouseEvent } from "../config/gameConfig";
import * as TWEEN from '@tweenjs/tween.js';
import { drawShape } from "../utils/rendering";
import { Scene } from "../config/scene";

/**
 * Button is a simple class, contains a text
 * and calls a list of functions 
 * Also has a hover animation
 */
export class Button extends Drawable {
    
    /**
     * Height of the button, is always
     * the same, no matter the button
     */
    public static readonly MAX_HEIGHT = 70;

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
    private readonly height = Button.MAX_HEIGHT;

    constructor(scene: Scene,
                private x: number,
                private y: number,
                private text: string,
                callback? : () => void,
                private fontSize: number = 50){
        super(scene);
        if(callback)this.listeners.push(callback);
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
        g.rect(this.x, this.y, this.width, this.fontSize * 1.3);
        g.clip();

        drawShape(g, [[this.x, this.y + this.height], [this.x, this.y + this.height - leftY], [this.x + bottomX, this.y + this.height]], {mode: 'fill', color: 'red'});

        g.restore();
    }

    /**
     * Draws the button and the hover effect
     */
    draw(g: CanvasRenderingContext2D) {
        g.save();
        g.translate(-this.width / 2, - this.height / 2);
        g.font = `${this.height - (this.height - this.fontSize)}pt Connection`;
        if (this.width === null) this.width = g.measureText(this.text).width + 20;

        g.fillStyle = 'yellow';
        g.fillRect(this.x, this.y, this.width, this.fontSize * 1.3);
        this.drawHoverEffect(g);

        g.fillStyle = 'black';
        g.fillText(this.text, this.x + 10, this.y + this.height - (this.height - this.fontSize));
        g.restore();
    }

    /**
     * Whether this button contains the given position
     */
    private contains(x: number, y: number){
        return x > this.x - this.width / 2 && 
                x < this.x + this.width / 2 && 
                y > this.y - this.height / 2  && 
                y < this.y - this.height / 2 + this.fontSize * 1.3;
    }

    /**
     * Inherited function
     * if the event is a click and the mouse is inside
     * the button, triggers all the listeners
     * 
     * @param ev 
     * @param g 
     */
    handleMouseClick(ev: CustomMouseEvent, g: CanvasRenderingContext2D): boolean{
        if(this.contains(ev.a, ev.b)) {
            if(ev.type === 'mousedown'){
                this.listeners.map(l => l());
            } else if(ev.type === 'mousemove' && this.state === 'none'){
                this.state = 'hover';
                this.clearTween();
                this.hoverTween = this.tween()
                                        .to({hoverPercent: 100 + (this.height / this.width) * 100}, this.width)
                                        .easing(TWEEN.Easing.Quadratic.Out)
                                        .start();
            }
            return true;
        } else if(this.state === 'hover'){
            this.state = 'none';
            this.clearTween();
            this.hoverTween = this.tween()
                                    .to({hoverPercent: 0}, this.width / 1.2)
                                    .easing(TWEEN.Easing.Quadratic.In)
                                    .start();
        }
    }
}