import { Messenger } from '../objects/messenger';
import { Scene } from '../config/scene';
import { randomLetter } from '../utils/constants';
import { Letter } from '../objects/letter';
import { Game } from '../game';
import { Timer } from '../objects/timer';
import { Sound } from '../utils/soundEngine';
import { Button } from '../objects/button';



/**
 * Simple game scene, showing the
 * flag holder
 */
export class GameScene extends Scene {

  private messenger: Messenger;
  private letter: Letter;
  private timer: Timer;
  private menuBtn: Button;

  constructor(game: Game) {
    super(game, "game");
    this.messenger = new Messenger(this, game.target.width / 2, 350);
    this.letter = new Letter(game.target.width / 2, 50);
    this.menuBtn = new Button(100, 200, "< Menu", () => game.sm.changeScene('transition', this, 'menu'), 20);
  }

  init(...params: any[]){
    const guessTime = params[0] || 10_000;
    if(guessTime != Infinity){
      this.timer = new Timer(this.game.target.width - 10, this.game.target.height,  10, this.game.target.height, guessTime);
      this.timer.onFinish(() => {
        this.timerEnd();
      });
    } else {
      this.timer = new Timer(0,0,0,0,0);// 'Empty' timers
    }
    this.switchLetter();
  }

  update(delta: number){
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
    this.messenger.draw(g);
    this.letter.draw(g);
    this.menuBtn.draw(g);
    if(this.timer) this.timer.draw(g);
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

  handleMouseEvent(ev: MouseEvent, g: CanvasRenderingContext2D){
    if(this.menuBtn.handleMouseClick(ev, g)){
      this.game.target.style.cursor = 'pointer';
    }else {
      this.game.target.style.cursor = 'default';
    }
  }
}
