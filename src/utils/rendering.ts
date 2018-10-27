
import { Point, ShapeConfig } from '../config/gameConfig';

/**
 * Draws a shape with the given point
 * and the given configuration
 * 
 * @param g target
 * @param ps points of the shape
 * @param conf configuration of the drawking
 */
export function drawShape(g: CanvasRenderingContext2D, ps: Point[], conf: ShapeConfig){
    if (ps.length <= 1) return;
    
    if(conf.color){
        if(conf.mode === 'fill'){
            g.fillStyle = conf.color;
        } else if (conf.mode === 'stroke'){
            g.strokeStyle = conf.color;
            if (conf.lineWidth) g.lineWidth = conf.lineWidth;
        }
    }
    g.beginPath();
    let [fx, fy] = ps[0];
    g.moveTo(fx, fy);
    for(let i = 1; i < ps.length; ++i){
        const [x, y] = ps[i];
        g.lineTo(x, y);
    }

    if(conf.mode === 'fill')
        g.fill();
    else if(conf.mode === 'stroke'){
        g.closePath();
        g.stroke();
    }
        
}