import { Scene } from "./scene";
import { Game } from "../game";
import { Color } from "../utils/color";

/**
 * Simple type to store all the available
 * states of the game
 */
export type SceneNames = {
    [key: string]: {new(game: Game): Scene}
}


export enum VerticalAlign{
    top,
    center,
    bottom
}

export enum HorizontalAlign{
    left,
    center,
    right
}


/**
 *  Game configuration, used to initialize the
 * game itself
 */
export interface GameConfig {
    /**
     * Width of the canvas
     */
    width? : number;

    /**
     * Height of the canvas
     */
    height?: number;

    /**
     * Array of Scenes provider
     * A scene must take the game as parameter
     * in the constructor
     */
    scene?: SceneNames,

    /**
     * background color of the scene
     */
    backgroundColor: string,

    /**
     * Id of the parent element in the DOM of the canvas
     */
    parent: string
}

/**
 * Use when drawing a shape
 */
export interface ShapeConfig {
    /**
     * Drawing mode, stroke does only the outline
     * fill fills completly the shape
     */
    mode : 'stroke' | 'fill',

    /**
     * Color of the fill/stroke
     */
    color?: string,

    /**
     * LineWidth, only used when 'stroke' mode is used
     * sets the thickness of the stroke to draw
     */
    lineWidth?: number
}


/**
 * A point is symply an array with two elements
 */
export type Point = [number, number];