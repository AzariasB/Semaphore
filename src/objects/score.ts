import { Drawable } from './drawable';
import { Scene } from '../config/scene';

export class Score extends Drawable {

    private _score: number = 0;

    constructor(
        scene: Scene,
        private x: number,
        private y: number
    ){
        super(scene);
    }

    public get score(){
        return this._score;
    }



    draw(g: CanvasRenderingContext2D) {
        g.fillText('' + this._score, this.x, this.y);
    }

}