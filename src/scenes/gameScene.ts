import { Messenger } from '../objects/messenger';
import { Scene } from '../config/scene';
import { randomLetter } from '../utils/constants';
import { Letter } from '../objects/letter';
import { Game } from '../game';
import { Timer } from '../objects/timer';
import { Sound } from '../utils/soundEngine';
import { Button } from '../objects/button';
import { Score } from '../objects/score';



/**
 * Simple game scene, showing the
 * flag holder
 */
export class GameScene extends Scene {

  private messenger: Messenger;
  private letter: Letter;
  private timer: Timer;
  private score: Score;

  constructor(game: Game) {
    super(game);
    this.messenger = this.add(Messenger, game.target.width / 2, 350);
    this.letter =  this.add(Letter, game.target.width / 2, 50);
    this.add(Button, 40, 40, "< Menu", () => game.sm.changeScene('transition', this, 'menu'), 20);

  }

  init(...params: any[]){
    this.score = this.add(Score, 5, this.game.target.height - 5);
    const guessTime = params[0] || 10_000;
    if(guessTime != Infinity){
      this.timer = this.add(Timer, this.game.target.width - 10, this.game.target.height,  10, this.game.target.height, guessTime);
      this.timer.onFinish(() => {
        this.timerEnd();
      });
    } else {
      this.timer =  this.add(Timer, 0,0,0,0,0);// 'Empty' timer
    }
    this.switchLetter();
  }

  timerEnd(){
    this.letter.showLetter();
  }

  /**
   * Draws the messenger
   * the letter to guess
   * and the timer
   * 
   * @param g target
   */
  draw(g: CanvasRenderingContext2D) {
    super.draw(g);
  }

  /**
   * Change of letter to guess, when the user
   * guessed the correct letter
   */
  private switchLetter(){
    this.timer.start();
    this.letter.hideLetter();
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
      if(!this.letter.isLetterVisible) this.score.increment();
      this.letter.correct();
      this.switchLetter();
      this.game.se.play(Sound.Correct);
    } else {
      this.game.se.play(Sound.Wrong);
      this.letter.wrong();
    }
  }

  handleKeyboardEvent(ev: KeyboardEvent){
    if( /^[a-z]$/.test(ev.key)){
      this.checkAnswer(ev.key);
    }
  }
}
