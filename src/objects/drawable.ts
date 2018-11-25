import { createUUID } from '../utils/constants';
import { Scene } from '../config/scene';

/**
 * Interface for all the drawable
 * elements of the game,
 * also has an optionnal 'update' method
 * if some additionnal updates must be made
 */
export abstract class Drawable {

    private _uuid = createUUID();

    public get UUID() {
        return this._uuid;
    }

    constructor(protected scene: Scene) {
    }

    public update(delta: number){

    }

    protected tween(obj: any = this){
        return this.scene.tween(obj);
    }

    public kill() {
        this.scene.remove(this);
        this.scene = null;
    }

    abstract draw(g: CanvasRenderingContext2D);


}