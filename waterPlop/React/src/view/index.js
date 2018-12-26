import React, { Component } from 'react';
import Bullet from './bullet.js';
import Water from './water.js';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      waterCount: 10,
      waterArr: [],
      speed: 10,
      timer: null,
      width: 60,
      bulletLeft: '',
      bulletRight: '',
      bulletTop: '',
      bulletBottom: '',
      warterPool: '',
      bulletPool: '',
      isBoomIng: false,
    };
  }

  // 初始化
  init(){
    let data = [];
    for(let i = 0; i < 36; i++){
      let randomLevel = Math.floor(Math.random() * 5);
      let waterObj = new Water(randomLevel, i);
      data.push(waterObj.draw());
      waterObj.onclick = ()=> {
        let { waterCount } = this.state;
        if (waterCount > 0) {
          waterCount--;
          waterObj.levelUp();
          data = data.map((item, index) => {
            if(index === i){
              return waterObj.draw();
            }
            return item;
          });
          this.setState({
            waterCount: waterCount,
            warterPool: data,
          });
        } else {
          this.gameOver();
        }
      }
      waterObj.onboom = () => {
        let { warterPool } = this.state;
        let bulletLeft = new Bullet('left', i);
        let bulletRight = new Bullet('right', i);
        let bulletTop = new Bullet('top', i);
        let bulletBottom = new Bullet('bottom', i);
        let arr = [], warterPoolT = [];
        arr.push(bulletLeft.init());
        arr.push(bulletRight.init());
        arr.push(bulletTop.init());
        arr.push(bulletBottom.init());
        warterPoolT = warterPool.map((item, index) => {
          if (index === i) {
            return (<div className={'game-unit'} key={i}>
              <img className={'game-img-bullet game-img-bullet-right'} src={require(`../static/imgs/bullet.png`)} alt=""/>
            </div>);
          }
          return item;
        });
        console.log(warterPoolT);
        this.setState({
          bulletPool: JSON.parse(JSON.stringify([...warterPoolT])),
          isBoomIng: true,
        });
        console.log(this.state.warterPool);
      }
    }
    this.setState({
      warterPool: data,
      waterCount: 10,
    });
  }

  // 升级
  levelUp(num, tag) {
    let { waterArr, waterCount } = this.state;
    if (waterCount > 0) {
      if (tag) {
        waterCount-=1
      }
      waterArr.forEach((item, index) => {
        if (index === num) {
          item.level++;
          if (item.level >= 5) {
            let bulletLeft = new Bullet('left', 3);
            let bulletRight = new Bullet('right', 3);
            let bulletTop = new Bullet('top', 3);
            let bulletBottom = new Bullet('bottom', 3);
            this.setState({
              bulletLeft: bulletLeft.init(),
              bulletRight: bulletRight.init(),
              bulletTop: bulletTop.init(),
              bulletBottom: bulletBottom.init(),
            });
            setTimeout(() => {
              this.moveOn(num);
            }, 100);
          }
        }
      });
      this.setState({
        waterArr,
        waterCount,
      });
    } else {
      this.gameOver();
    }
  }

  // 移动
  moveOn(num) {
    let { timer } = this.state;
    clearInterval(timer);
    timer = setInterval(() => {
      let { waterArr, speed } = this.state;
      waterArr.forEach((item, index) => {
        if (index === num) {
          item.offset+=speed;
        }
      });
      this.setState({
        waterArr,
        timer,
      });
      // this.collision(num);
    }, 30);
    // this.collision(num);
  }

  // 碰撞检测
  collision(num) {
    let { waterArr } = this.state;
    let cur = waterArr[num];
    let waterTemp = waterArr.map((item, index) => {
      if ((item.mapPosX - cur.mapPosX === 1) && (item.mapPosY === cur.mapPosY)) {
        cur.left.isShow = false;
        console.log('left');
        console.log(index);
        this.levelUp(index);
      }
      return item;
    });
    this.setState({
      waterArr: waterTemp,
    });
    // waterArr.filter(item => {
    //   return (item.level > 0) && (cur.mapPosX === item.mapPosX || cur.mapPosY === item.mapPosY);
    // }).forEach((item, index) => {
    //   if ((item.mapPosX - cur.mapPosX === 1) && (item.mapPosY === cur.mapPosY)) {
    //     cur.left.isShow = false;
    //     console.log('left');
    //     this.levelUp(index);
    //   }
    //   // if ((item.mapPosX - cur.mapPosX === -1) && (item.mapPosY === cur.mapPosY)) {
    //   //   cur.right.isShow = false;
    //   //   console.log('right');
    //   //   this.levelUp(index);
    //   // }
    //   // if ((item.mapPosY - cur.mapPosY === 1) && (item.mapPosX === cur.mapPosX)) {
    //   //   cur.top.isShow = false;
    //   //   console.log('top');
    //   //   this.levelUp(index);
    //   // }
    //   // if ((item.mapPosY - cur.mapPosY === -1) && (item.mapPosX === cur.mapPosX)) {
    //   //   cur.bottom.isShow = false;
    //   //   console.log('bottom');
    //   //   this.levelUp(index);
    //   // }
    // });
  }

  // 游戏结束
  gameOver() {
    alert('游戏结束');
  }

  componentWillMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.info !== nextState.info){
      return true;
    }
    return true;
  }

  render() {
    const { waterCount, warterPool, bulletPool, isBoomIng } = this.state;
    console.log(warterPool);
    let ctx = <div className={'main-container'}>
      <div className={'game-info'}>
        <p className={'game-remain-num'}><span>{waterCount}</span>滴水</p>

        <div className={'game-box'}>
          <div className={'game-score'} style={{height: `${waterCount * 30}px`}}></div>
        </div>

        <div className={'game-init'} onClick={ev => {this.init()}}>重新开始</div>
      </div>
      <div className={'game-panel'}>
        {isBoomIng ? bulletPool : warterPool}
      </div>
    </div>;
    return ctx;
  }
}

export default Index;