import { CustomMouseEvent } from "./gameConfig";
import { Game } from "../game";
import { Drawable } from "../objects/drawable";
import { Button } from "../objects/button";
import { GameScene } from "../scenes/gameScene";


export abstract class Scene {

    private _objects: Map<string, Drawable> = new Map();

    public get buttons(): Button[] {
        return <Button[]>Array.from(this._objects).map(x => x[1]).filter(x => x instanceof Button);
    }

    constructor(protected game: Game,public readonly name: string) {
    }

    public remove(drawable: Drawable){
        delete this._objects[drawable.UUID];
    }

    public add<T extends Drawable>(type: {new(...parmas: any[]): T}, ...params: any[]){
        const obj = new type(this, ...params);
        this._objects.set(obj.UUID, obj);
        return obj;
    }

    /**
     * 
     * @param params data passed to the scene when it is initialized for the first time
     */
    public init(...params: object[]){
        
    }

    /**
     * 
     * @param delta time since last update
     */
    public update(delta: number) {
    }

    /**
     * 
     * @param params when entering the state
     */
    public enter(...params: object[]) {
        
    }

    /**
     * 
     * @param g the canvas context where to draw the game
     */
    public draw(g: CanvasRenderingContext2D){
        Array.from(this._objects).reverse().map(x => x[1].draw(g));
    }

    /**
     * 
     * @param ev the keyboard event to handle
     */
    public handleKeyboardEvent(ev: KeyboardEvent) {

    }

    /**
     * 
     * @param ev The mouse event to handle
     * @param g the canvas where the mouse event happened
     */
    public handleMouseEvent(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        if(this.buttons.some(m => m.handleMouseClick(ev, g))){
            this.game.target.style.cursor = 'pointer';
        } else {
            this.game.target.style.cursor = 'default';
        }
    }

}