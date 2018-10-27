
// All possible letters to be guessed
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// A random letter that the user will have to guess
export function randomLetter(){
    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}