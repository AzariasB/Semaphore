import { Game } from "../game";

function id(id: string){
    return document.getElementById(id);
}

export class UIUtils {

    private panels: HTMLElement[] = [];

    constructor(private game: Game){
    }

    private hide = (el: HTMLElement) => el.classList.add('hiding');
    private show = (el: HTMLElement) => el.classList.remove('hiding');

    private togglePannel(panel: HTMLElement){
        if(panel.classList.contains('pannel-2')){
            if(this.panels.length === 0){
                this.panels.push(panel);
            } else if(this.panels[0] === panel){
                this.panels.map(x => this.hide(x));
                this.panels = [];
                return;
            } else {
                this.panels.map(x => this.hide(x));
                this.panels = [panel];
            }
        } else if(panel.classList.contains('pannel-3')){
            if(this.panels.length === 1){
                this.panels.push(panel);
            } else if(this.panels[1] === panel){
                this.panels.pop();
                this.hide(panel);
                return;
            } else {
                this.hide(this.panels[1]);
                this.panels.pop();
                this.panels.push(panel);
            }
        }
        this.show(panel);
    }

    setup(){
        const buttons = Array.from(document.getElementsByTagName('button'));
        buttons.filter(x => x.hasAttribute('data-target')).map(x => {
            const target = x.getAttribute('data-target');
            x.addEventListener('click', () => {
                this.togglePannel(id(target));
            });
        });
    }

}