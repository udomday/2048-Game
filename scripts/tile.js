const tileColor = {
    2: `#eee4da`,
    4: `#ede0c8`,
    8: `#f2b179`,
    16: `#f59563`,
    32: `#f67c5f`,
    64: `#f65e3b`,
    128: `#edcf72`,
    256: `#edcc61`,
    512: `#edc850`,
    1024: `#edc53f`,
    2048: `#edc22e`
}

export class Tile {
    constructor(gridElement){
        this.tileElemnt = document.createElement('div');
        this.tileElemnt.classList.add('tile');
        this.setValue(Math.random() < 0.75 ? 2 : 4);
        gridElement.append(this.tileElemnt);
    }

    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileElemnt.style.setProperty('--x', x);
        this.tileElemnt.style.setProperty('--y', y);
    }

    setValue(value){
        this.value = value
        this.tileElemnt.textContent = value;
        const bgLightness = 100 - Math.log2(value) * 9;
        this.tileElemnt.style.setProperty('--bg-lightness', `${tileColor[value]}`);
        this.tileElemnt.style.setProperty('--text-lightness', `${bgLightness < 50 ? 90 : 10}%`)

    }

    removeFromDOM(){
        this.tileElemnt.remove();
    }

    waitForTransitionEnd(){
        return new Promise(resolve => {
            this.tileElemnt.addEventListener('transitionend', resolve, {once: true})
        });
    }

    waitForAnimationEnd(){
        return new Promise(resolve => {
            this.tileElemnt.addEventListener('animationend', resolve, {once: true})
        });
    }
}