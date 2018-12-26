import React from 'react';
import Bullet from "./bullet";

export default class {
  constructor(level, index) {
    this.level = level;
    this.index = index;
    this.div = null;
    this.left = 0;
    this.top = 0;
    this.onclick = function() {};
    this.onboom = function() {};
  }

  draw() {
    // this.div = (<div className={'game-unit'} key={this.index} onClick={ev => {this.onclick();}}>
    //   {this.level > 4 ? this.boom() : (<img className={'game-img'} src={require(`../static/imgs/${this.level}.png`)} alt=""/>)}
    // </div>);
    this.div = (<div className={'game-unit'} key={this.index} onClick={ev => {this.onclick();}}>
      <img className={'game-img'} src={require(`../static/imgs/${this.level}.png`)} alt=""/>
    </div>);
    return this.div;
  }

  levelUp() {
    this.level++;
    if (this.level > 4) {
      this.level = 0;
      typeof this.onboom === 'function' && this.onboom();
    }
  }

  boom() {
    let bulletLeft = new Bullet('left', 3, this.index);
    let bulletRight = new Bullet('right', 3, this.index);
    let bulletTop = new Bullet('top', 3, this.index);
    let bulletBottom = new Bullet('bottom', 3, this.index);
    let arr = [];
    arr.push(bulletLeft.init());
    arr.push(bulletRight.init());
    arr.push(bulletTop.init());
    arr.push(bulletBottom.init());
    return arr;
  }
}