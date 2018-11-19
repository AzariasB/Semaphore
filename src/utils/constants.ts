// Rendering constants

//Max distance where a letter drop can go
export const LETTER_MAX_DIST = 150;


// All possible letters to be guessed
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// A random letter that the user will have to guess
export function randomLetter(){
    return ALPHABET[random(0, ALPHABET.length-1)];
}

export function random(min: number, max: number){
    return Math.floor(Math.random() * (max-min+1)) + min;
}