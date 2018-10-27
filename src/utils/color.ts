import * as TWEEN from '@tweenjs/tween.js';

/**
 * Simple helper class
 * to create tweening of color
 * and fast string conversion
 */
export class Color {

    constructor(public r = 255,
                public g = 255,
                public b = 255,
                public a = 1){

    }

    public tween() {
        return new TWEEN.Tween(this);
    }


    public toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}