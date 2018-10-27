

const P = Math.PI;

//Order of the semaphore alphabet, funny isn't it ?
const ORDER = "abcdefghiklmnopqrstuy##jvwxz";
// The 7 possible position of a flag
const steps = [-P/4, 0, P/4, P/2, 3*P/4, P, 5*P/4];


/**
 * Return an array (2 elements max) of the angles of the flag
 * needed to show the letter in semaphore
 * 
 * @param letter letter to get the angles from
 */
export function getLetterRotations(letter: string): number[] {
    if (letter.length > 1) return [];
    const idx = ORDER.indexOf(letter);
    if (idx < steps.length) return [steps[idx]];
    let start = steps.length * 2  - 1;
    let dim = steps.length - 1;
    let cycle = 1;
    while(true){
        if (idx < start){
            return [steps[idx - dim], steps[cycle - 1]];
        }
        cycle++;
        start += (steps.length - cycle);
        dim += (steps.length - cycle);
    }
}