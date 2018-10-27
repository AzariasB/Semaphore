import { CustomMouseEvent } from "./gameConfig";
import { Game } from "../game";


export abstract class Scene {

    constructor(protected game: Game,public readonly name: string) {
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
    public abstract draw(g: CanvasRenderingContext2D);

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

    }

}