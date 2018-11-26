import { Game } from "../game";
import { Drawable } from "../objects/drawable";
import * as TWEEN from '@tweenjs/tween.js';

export abstract class Scene {

    private _objects: Map<string, Drawable> = new Map();
    protected tGroup: TWEEN.Group  = new TWEEN.Group();

    constructor(protected game: Game) {
    }

    public tween(obj: any = this): TWEEN.Tween {
        return new TWEEN.Tween(obj, this.tGroup);
    }

    public removeTween(tween: TWEEN.Tween){
        this.tGroup.remove(tween);
    }

    public remove(drawable: Drawable){
        this._objects.delete(drawable.UUID);
    }


    public add<T extends Drawable>(type: {new(...params: any[]): T}, ...params: any[]){
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
        this.tGroup.update();
    }

    /**
     * 
     * @param g the canvas context where to draw the game
     */
    public draw(g: CanvasRenderingContext2D){
        this._objects.forEach(v => v.draw(g));
    }

    /**
     * 
     * @param ev the keyboard event to handle
     */
    public handleKeyboardEvent(ev: KeyboardEvent) {

    }

}