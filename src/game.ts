import { GameScene } from "./scenes/gameScene";
import { GameConfig } from './config/gameConfig';
import { StateMachine } from './utils/stateMachine';
import { SoundEngine } from './utils/soundEngine';
import { UIUtils } from './utils/ui';

// main game configuration
const config: GameConfig = {
  scene: {
    'game': GameScene, 
  },
  backgroundColor: "rgba(0,0,0,0)",
  parent: 'game'
};

// game class
export class Game  {

  public target: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastUpdate = new Date();
  public sm: StateMachine;
  public se: SoundEngine;

  constructor(private config: GameConfig) {
      this.target = <HTMLCanvasElement>document.getElementById(config.parent);
      this.ctx = this.target.getContext('2d');
      this.target.style.backgroundColor = config.backgroundColor;
      const parent = document.getElementById(config.parent);
      if (!parent) throw new Error("Parent not found");

      this.sm = new StateMachine(this, config.scene);
      this.sm.changeScene('game');
      this.se = new SoundEngine();
  }

  public run() {
    const delta = new Date().getTime() - this.lastUpdate.getTime();
    this.ctx.clearRect(0, 0, this.target.width, this.target.height);
    this.sm.update(delta);
    this.sm.draw(this.ctx);
    requestAnimationFrame(this.run.bind(this));
    this.lastUpdate = new Date();
  }

  public handleKeyboardEvent(ev: KeyboardEvent) {
    this.sm.handleKeyboardEvent(ev);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  const game = new Game(config);
  game.se.load().then(success => {
    const ui = new UIUtils(game);
    ui.setup();
    //game.run();
  });
  window.addEventListener('keydown', ev => {
    game.handleKeyboardEvent(ev);
  });
};