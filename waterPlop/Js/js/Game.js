import WaterPolo from './WaterPolo.js';
import Bullet from './Bullet.js';

export default {
    water: 10,
    wrap: null,
    txt: null,
    waterPolos: [],
    bullets: [],

    start() {
        if (this.wrap === null) throw new Error('请设置游戏的容器');
        this.txt.innerHTML = this.water;
        for (let i=0; i<36; i++) {
            let waterPolo = new WaterPolo( Math.floor(Math.random() * 5) );
            this.waterPolos.push(waterPolo);
            waterPolo.draw( this.wrap );
            waterPolo.onclick = ()=> {
                if (this.water > 0) {
                    this.water--;
                    waterPolo.levelUp();
                    this.txt.innerHTML = this.water;
                } else {
                  alert('game over!!!');
                }
            }
            waterPolo.onboom = () => {

                // ←
                let bulletLeft = new Bullet('left', 3);
                this.bullets.push(bulletLeft);
                bulletLeft.draw( this.wrap );
                bulletLeft.setPosition( waterPolo.left - 50 , waterPolo.top );
                bulletLeft.onmove = ()=> {
                    this.bulletMove(waterPolo, bulletLeft);
                }

                // →
                let bulletRight = new Bullet('right', 3);
                this.bullets.push(bulletRight);
                bulletRight.draw( this.wrap );
                bulletRight.setPosition( waterPolo.left + 50 , waterPolo.top );
                bulletRight.onmove = ()=> {
                    this.bulletMove(waterPolo, bulletRight);
                }

                // ↑
                let bulletTop = new Bullet('top', 3);
                this.bullets.push(bulletTop);
                bulletTop.draw( this.wrap );
                bulletTop.setPosition( waterPolo.left , waterPolo.top - 50 );
                bulletTop.onmove = ()=> {
                    this.bulletMove(waterPolo, bulletTop);
                }

                // ↓
                let bulletBottom = new Bullet('bottom', 3);
                this.bullets.push(bulletBottom);
                bulletBottom.draw( this.wrap );
                bulletBottom.setPosition( waterPolo.left, waterPolo.top + 50 );
                bulletBottom.onmove = ()=> {
                    this.bulletMove(waterPolo, bulletBottom);
                }
            }
        }
    },

    bulletMove(waterPolo, bullet) {
        let waterPolos = this.waterPolos.filter( wp => {
            return wp != waterPolo && wp.level > 0;
        } );
        let wp = bullet.collision( waterPolos );
        if (wp) {
            bullet.destory();
            wp.levelUp();
            this.bullets = this.bullets.filter( bu => bu != bullet );
        }

        if (bullet.left < -bullet.width || bullet.left > this.wrap.offsetWidth || bullet.top < -bullet.height || bullet.top > this.wrap.offsetHeight) {
            bullet.destory();
            this.bullets = this.bullets.filter( bu => bu != bullet );
        }

        if (this.bullets.length == 0) {
            let wps = this.waterPolos.filter(wp => wp.level !== 0);
            if (this.water === 0) {
                alert('game over!!!')
                return;
            }
            if (wps.length === 0 && this.water > 0) {
                alert('你真棒，下一关get!!!')
                return;
            }
        }
    }
};

