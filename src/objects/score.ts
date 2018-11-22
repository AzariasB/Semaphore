import { Drawable } from './drawable';
import { Scene } from '../config/scene';
import { DropLetter } from './dropletter';

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

    public increment(){
        this._score++;
        this.scene.add(DropLetter, '+1', this.x + 30 , this.y - 10, false);
    }


    draw(g: CanvasRenderingContext2D) {
        g.fillText('' + this._score, this.x, this.y);
    }

}