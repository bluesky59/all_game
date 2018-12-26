import React from 'react';

export default class {
    constructor(dir = 'left', speed = 1, index) {
      this.dir = dir;
      this.speed = speed;
      this.index = index;
      this.div = null;
      this.left = 30;
      this.top = 30;
      this.timer = 0;
      this.onmove = function(){};
    }

    init() {
      switch (this.dir) {
        case 'left':
          this.move();
          this.div = <img key={`${this.index}-left`} className={'game-img-bullet'} style={{left: `-${this.left}px`}} src={require(`../static/imgs/bullet.png`)} alt=""/>;
          return this.div;
        case 'right':
          this.move();
          return <img key={`${this.index}-right`} className={'game-img-bullet game-img-bullet-right'} style={{left: `${this.left}px`}} src={require(`../static/imgs/bullet.png`)} alt=""/>;
        case 'bottom':
          this.move();
          return <img key={`${this.index}-bottom`} className={'game-img-bullet game-img-bullet-bottom'} style={{top: `-${this.top}px`}} src={require(`../static/imgs/bullet.png`)} alt=""/>;
        case 'top':
          this.move();
          return <img key={`${this.index}-top`} className={'game-img-bullet game-img-bullet-top'} style={{top: `${this.top}px`}} src={require(`../static/imgs/bullet.png`)} alt=""/>;
        default: break;
      }
    }

    setPosition(left, top) {
      this.left = left;
      this.top = top;
      this.div.style.left = this.left + 'px';
      this.div.style.top = this.top + 'px';
    }

    move() {
      console.log('move');
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
          default: break;
        }
        // this.setPosition(this.left, this.top);
        // typeof this.onmove === 'function' && this.onmove();
      }, 16);
    }

    /**
     * 碰撞检测
     */
    collision( arr ) {
      // 当前子弹的中心点坐标
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
}