export default class {

    constructor( level ) {
        this.level = level;
        this.div = null;
        this.img = null;
        this.left = 0;
        this.top = 0;
        this.width = 100;
        this.height = 100;
        this.onclick = function() {};
        this.onboom = function() {};
        
    }

    draw( wrap ) {
        this.div = document.createElement('div');
        this.div.classList.add('water-polo');
        this.img = document.createElement('img');
        this.img.src = 'img/'+ this.level +'.png';
        this.div.appendChild(this.img);
        this.div.onclick = () => {
            typeof this.onclick === 'function' && this.onclick();
        };
        this.img.addEventListener('animationend', ()=> {
            this.img.classList.remove('level-up');
        });
        wrap.appendChild( this.div );
        this.left = this.div.offsetLeft;
        this.top = this.div.offsetTop;
    }

    levelUp() {
        this.level++;
        if (this.level > 4) {
            this.level = 0;
            typeof this.onboom === 'function' && this.onboom();
        }
        this.img.classList.add('level-up');
        this.img.src = 'img/'+ this.level +'.png';
    }
}