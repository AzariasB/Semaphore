
function id(id: string){
    return document.getElementById(id);
}

export class UIUtils {

    private panels: HTMLElement[] = [];

    constructor(){
    }

    setup(){
        const buttons = Array.from(document.getElementsByTagName('button'));
        buttons.filter(x => x.hasAttribute('data-target')).map(x => {
            const target = x.getAttribute('data-target');
            x.addEventListener('click', () => {
                const panel = id(target);
                if(panel.classList.contains('pannel-2')){
                    if(this.panels.length === 0){
                        this.panels.push(panel);
                        panel.classList.remove('hiding');
                    } else if(this.panels[0] === panel){
                        this.panels.map(x => x.classList.add('hiding'));
                        this.panels = [];
                    } else {
                        this.panels.map(x => x.classList.add('hiding'));
                        panel.classList.remove('hiding');
                        this.panels = [panel];
                    }
                } else if(panel.classList.contains('pannel-3')){
                    if(this.panels.length === 1){
                        this.panels.push(panel);
                        panel.classList.remove('hiding');
                    } else if(this.panels[1] === panel){
                        this.panels.pop();
                        panel.classList.add('hiding');
                    } else {
                        this.panels[1].classList.add('hiding');
                        this.panels.pop();
                        panel.classList.remove('hiding');
                        this.panels.push(panel);
                    }
                }
            });
        });
    }

}