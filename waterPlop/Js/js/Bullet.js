export default class {

    constructor(dir = 'left', speed = 1) {
        this.dir = dir;
        this.div = null;
        this.left = 0;
        this.top = 0;
        this.width = 100;
        this.height = 100;
        this.speed = speed;
        this.timer = 0;
        this.onmove = function(){};
    }

    draw(wrap) {
        this.div = document.createElement('div');
        this.div.classList.add('bullet');
        this.div.classList.add(this.dir);
        wrap.appendChild(this.div);
        this.move();
    }

    setPosition(left, top) {
        this.left = left;
        this.top = top;
        this.div.style.left = this.left + 'px';
        this.div.style.top = this.top + 'px';
    }

    move() {
        this.timer = setInterval(() => {
            switch(this.dir) {
                case 'left':
                    this.left-=this.speed;
                    break;
                case 'right':
                    this.left+=this.speed;
                    break;
                case 'top':
                    this.top-=this.speed;
                    break;
                case 'bottom':
                    this.top+=this.speed;
                    break;
            }
            this.setPosition(this.left, this.top);
            typeof this.onmove === 'function' && this.onmove();
        }, 16);
    }

    collision( arr ) {
        let p1 = {
            x: this.left + this.width / 2,
            y: this.top + this.height / 2
        }
        for (let i=0; i<arr.length; i++) {
            let p2 = {
                x: arr[i].left + arr[i].width / 2,
                y: arr[i].top + arr[i].height / 2
            }
            if ( p1.x > p2.x - 10 && p1.x < p2.x + 10 && p1.y > p2.y - 10 && p1.y < p2.y + 10 ) {
                return arr[i];
            }
        }
    }

    destory() {
        clearInterval(this.timer);
        this.div.remove();
    }
}