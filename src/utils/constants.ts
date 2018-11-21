/*
----------------------
Game design contsants
----------------------
*/
export const DIFFICULTY = {
    EASY: 20_000, // 20 seconds to guess a letter
    MEDIUM: 10_000, // 10 seconds to guess a letter
    HARD: 5_000// 5 seconds to guess a letter
}

/*
----------------------
 Rendering constants
 ----------------------
*/
export const LETTER_MAX_DIST = 150; //Max distance where a letter drop can go


// All possible letters to be guessed
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// A random letter that the user will have to guess
export function randomLetter(){
    return ALPHABET[random(0, ALPHABET.length-1)];
}

export function random(min: number, max: number){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

export function createUUID(): string {
    // your favourite UUID generation function could go here
    // ex: http://stackoverflow.com/a/8809472/188246
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      /* tslint:disable:no-bitwise */
      const r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      /* tslint:enable:no-bitwise */
    });
}