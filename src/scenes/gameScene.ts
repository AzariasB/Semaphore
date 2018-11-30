import { Messenger } from '../objects/messenger';
import { Scene } from '../config/scene';
import { randomLetter } from '../utils/constants';
import { Letter } from '../objects/letter';
import { Game } from '../game';
import { Timer } from '../objects/timer';
import { Sound } from '../utils/soundEngine';
import { Score } from '../objects/score';

/**
 * Simple game scene, showing the
 * flag holder
 */
export class GameScene extends Scene {

  private currentGameMode: string = '';
  private remainings: number = 0;
  private messenger: Messenger;
  private letter: Letter;
  private timer: Timer;
  private score: Score;
  private readonly gameModeSetup = {
      'clock' : (data) => {
        const guessTime = data * 1000;
        this.remainings = 20;
        this.timer = this.add(Timer, this.game.target.width - 10, this.game.target.height,  10, this.game.target.height, guessTime);
        this.timer.onFinish(() => {
          this.letter.showLetter();
          this.remainings--;
          if(this.remainings === 0) this.endGame()
        });
      },
      'precision' : (difficulty) => {
        const guessTime = (5 - difficulty) * 2000;
        this.timer = this.add(Timer, this.game.target.width - 10, this.game.target.height, 10, this.game.target.height, guessTime);
        this.timer.onFinish(() => {
          this.switchLetter();
        });
      },
       'infinite' : (_) => {
        // nothing to do ?
       }
  };

  constructor(game: Game) {
    super(game);
    this.messenger = this.add(Messenger, game.target.width / 2, 350);
    this.letter =  this.add(Letter, game.target.width / 2, 50);
    this.score = this.add(Score, 5, this.game.target.height - 5);
  }

  init(...params: any[]){
    const data = params[0];
    const mode = params[1];
    this.gameModeSetup[mode](data);
    this.currentGameMode = mode;
    this.switchLetter();
  }

  endGame(){
    //Some animation and stuff ...
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
