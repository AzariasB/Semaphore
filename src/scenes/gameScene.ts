import { Messenger } from '../objects/messenger';
import { Scene } from '../config/scene';
import { randomLetter } from '../utils/constants';
import { Letter } from '../objects/letter';
import { Game } from '../game';
import { Timer } from '../objects/timer';

/**
 * Simple game scene, showing the
 * flag holder
 */
export class GameScene extends Scene {

  private messenger: Messenger;
  private letter: Letter;
  private timer: Timer;

  constructor(game: Game) {
    super(game, "game");
    this.messenger = new Messenger(this, 250, 350);
    this.letter = new Letter(game.target.width / 2, 50);
    this.timer = new Timer(game.target.width - 10, game.target.height,  10, game.target.height, 5_000);
    this.timer.onFinish(() => {
      console.log('finished !');
    });
    this.switchLetter();
  }

  update(delta: number){
  }

  /**
   * Draws the messenger
   * the letter to guess
   * and the timer
   * 
   * @param g target
   */
  draw(g: CanvasRenderingContext2D) {
    this.messenger.draw(g);
    this.letter.draw(g);
    this.timer.draw(g);
  }

  /**
   * Change of letter to guess, when the user
   * guessed the correct letter
   */
  private switchLetter(){
    this.timer.start();
    let currentLetter = randomLetter();
    while(this.letter.is(currentLetter)) currentLetter = randomLetter();
    this.messenger.displayLetter(this.letter.currentLetter = currentLetter);
  }

  /**
   * Whenever the user enters a letter, to check
   * if the entered letter is the correct one
   */
  private checkAnswer(answer: string){
    if(this.letter.is(answer)) {
      this.letter.correct();
      this.switchLetter();
    } else {
      this.letter.wrong();
    }
  }

  handleKeyboardEvent(ev: KeyboardEvent){
    if( /^[a-z]$/.test(ev.key)){
      this.checkAnswer(ev.key);
    }
  }

  handleMouseEvent(ev: MouseEvent, g: CanvasRenderingContext2D){}
}
