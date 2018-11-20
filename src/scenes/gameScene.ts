import { Messenger } from '../objects/messenger';
import { Scene } from '../config/scene';
import { randomLetter } from '../utils/constants';
import { Letter } from '../objects/letter';
import { Game } from '../game';
import { Timer } from '../objects/timer';
import { Sound } from '../utils/soundEngine';


enum GameState{
  Normal,
  Wrong
}

/**
 * Simple game scene, showing the
 * flag holder
 */
export class GameScene extends Scene {

  private messenger: Messenger;
  private letter: Letter;
  private timer: Timer;
  private state: GameState = GameState.Normal;

  constructor(game: Game) {
    super(game, "game");
    this.messenger = new Messenger(this, game.target.width / 2, 350);
    this.letter = new Letter(game.target.width / 2, 50);
    this.timer = new Timer(game.target.width - 10, game.target.height,  10, game.target.height, 5_000);
    this.timer.onFinish(() => {
      this.timerEnd();
    });
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
    this.timer.draw(g);
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

  handleMouseEvent(ev: MouseEvent, g: CanvasRenderingContext2D){}
}
