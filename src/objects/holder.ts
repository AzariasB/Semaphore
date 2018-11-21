import { Drawable } from "./drawable";
import { Scene } from "../config/scene";
import { drawShape } from "../utils/rendering";
import { Eye } from './eye';

/**
 * The guy holding the flags (without the flag themselves)
 * Has two eyes, one head and one body,
 * has a floating effect
 */
export class Holder extends Drawable {

    /**
     * Radius of the head
     */
    private headRadius = 20;

    constructor(scene: Scene,
                private x: number,
                private y: number,
                private height: number = 60) {
        super(scene);
        this.scene.add<Eye>(Eye, x - 9, y - height);
        this.scene.add<Eye>(Eye, x + 7, y - height);
    }

    public clear(g: CanvasRenderingContext2D){
        g.clearRect(0, 0, g.canvas.width, g.canvas.height);
    }

    /**
     * 
     * @param g target
     */
    public draw(g: CanvasRenderingContext2D){
        // head
        g.fillStyle = '#111111';
        g.beginPath();
        g.arc(this.x, this.y - this.headRadius * 3, this.headRadius, 0, Math.PI * 2, true);
        g.fill();

        //body
        drawShape(g, [[this.x, this.y - this.height + this.headRadius * 2], [this.x + 50, this.y + this.height * 2], [this.x - 50, this.y + this.height * 2]], {mode: 'fill'});

        g.strokeStyle = '#666666';
        g.lineWidth = 5;
        
        // head outline
        g.beginPath();
        g.arc(this.x, this.y - this.headRadius * 3, this.headRadius, 0, Math.PI * 2, true);
        g.stroke();

        // body outline
        drawShape(g, [[this.x, this.y - this.height + this.headRadius * 2], [this.x + 50, this.y + this.height * 2], [this.x - 50, this.y + this.height * 2]], {mode: 'stroke'});
    
    }

}