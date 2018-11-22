import { Scene } from "../config/scene";
import { Game } from "../game";
import { CustomMouseEvent } from "../config/gameConfig";

/**
 * Simple state machine to change from scenes
 * in the game
 */
export class StateMachine {

    private _scenes: {[key: string] : {new(game: Game): Scene}};
    private _currentScene: Scene;

    /**
     * Current scene object
     */
    public get currentScene() {
        return this._currentScene;
    }

    constructor(private game: Game, scenes: {new(game: Game): Scene}[]) {
        this._scenes = {};
        scenes.forEach((constr, i) => {
            let  s = new constr(game);
            this._scenes[s.name] = constr;
            if (i === 0) this._currentScene = s;
        });
        this.currentScene.init();
    }

    /**
     * Gets the scene from its name
     * 
     * @param sceneName name of the scene to find
     */
    public getScene(sceneName: string){
        return new this._scenes[sceneName](this.game) || null;
    }

    /**
     * Sets the scene to the one with the given name
     * and inits it
     */
    public changeScene(sceneName: string, ...params: any[]){
        if (!this._scenes[sceneName]) return;

        this._currentScene = new this._scenes[sceneName](this.game);
        this._currentScene.init(...params);
    }

    public setCurrentScene(nwScene: Scene, ...params: any[]){
        nwScene.init(...params);
        this._currentScene = nwScene;
    }

    /**
     * Draws the current scene
     * 
     * @param g target
     */
    public draw(g: CanvasRenderingContext2D){
        this._currentScene.draw(g);
    }

    /**
     * Updates the current scene
     */
    public update(delta: number){
        this._currentScene.update(delta);
    }

    public handleKeyboardEvent(ev: KeyboardEvent){
        this._currentScene.handleKeyboardEvent(ev);
    }

    public handleMouseEvent(ev: CustomMouseEvent, g: CanvasRenderingContext2D){
        this._currentScene.handleMouseEvent(ev, g);
    }

}