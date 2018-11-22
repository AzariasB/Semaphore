import { GameScene } from "./scenes/gameScene";
import { MenuScene } from './scenes/menuScene';
import { GameModeChoiceScene } from './scenes/gameModeChoiceScene';
import { TransitionScene } from './scenes/transitionScene';
import { GameConfig, CustomMouseEvent } from './config/gameConfig';
import { StateMachine } from './utils/stateMachine';
import { SoundEngine } from './utils/soundEngine';

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  scene: {
    'menu': MenuScene, 
    'game': GameScene, 
    'gameModeChoice': GameModeChoiceScene, 
    'transition': TransitionScene
  },
  backgroundColor: "#FFFFFF",
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
      this.target = document.createElement('canvas');
      this.ctx = this.target.getContext('2d');
      this.ctx.translate(0.5, 0.5);
      this.target.width = config.width;
      this.target.height = config.height;
      this.target.style.backgroundColor = config.backgroundColor;
      const parent = document.getElementById(config.parent);
      if (!parent) throw new Error("Parent not found");
      parent.appendChild(this.target);

      this.sm = new StateMachine(this, config.scene);
      this.sm.changeScene('menu');
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

  public handleMouseEvent(ev: MouseEvent){
    const rect = this.target.getBoundingClientRect();
    const custom: CustomMouseEvent = ev;
    custom.a = ev.x - rect.left;
    custom.b = ev.y - rect.top;  
    this.sm.handleMouseEvent(ev, this.ctx);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
  game.se.load().then(success => {
    game.run();
  })
  window.addEventListener('keydown', ev => {
    game.handleKeyboardEvent(ev);
  });
  game.target.addEventListener('mousedown', m => {
    game.handleMouseEvent(m);
  });
  game.target.addEventListener('mousemove', m => {
    game.handleMouseEvent(m);
  })
};