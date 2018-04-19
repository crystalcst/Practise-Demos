import Bird from './Bird';
import Background from './Background';
import UpPipe from './UpPipe';
import DownPipe from './DownPipe';
import imgBird0 from '../images/0.gif';
import imgBird1 from '../images/1.gif';
import imgBird2 from '../images/2.gif';
import imgBg from '../images/bg.png';
import imgGround  from '../images/ground.png';
import imgPipe from '../images/pipe.png';


class FlappyBird {
    constructor(bird = null, ground = null, upPipe = null, downPipe = null, objects = [], gravity = 2, ver1 = 10, ver2 = 0, pipeHeight = 200, velocity = 10, timer = null, score = 0, isScore = false) {
        this.objects = objects;
        this.bird = bird; // 鸟
        this.ground = ground; // 地面
        this.upPipe = upPipe; // 上管道
        this.downPipe = downPipe; // 下管道
        this.gravity = gravity; // 重力
        this.ver1 = ver1; // 速度1
        this.ver2 = ver2; // 速度2
        this.pipeHeight = pipeHeight; // 管道高度
        this.velocity = velocity; // 移动速度
        this.timer = timer; // 定时器
        this.score = score; // 分数
        this.isScore = isScore; // 是否计分
    }

    createMap() { // 绘制地图，包括背景、地面、鸟、上下障碍物 
        window.ctx.clearRect(0, 0, 360, 640);
        for (let item of this.objects) {
            item.draw();
        }

        this.canMove();
    }
    init() {
        let birds = [imgBird0, imgBird1, imgBird2],
            objects = [];

        let back = new Background(0, 0, 400, 600, imgBg),
            upPipe = new UpPipe(0, 0, 100, 200, imgPipe),
            downPipe = new DownPipe(0, 350, 100, 200, imgPipe),
            ground = new Background(0, 550, 400, 200, imgGround),
            bird = new Bird(80, 250, 40, 40, birds);

        this.bird = bird;
        this.ground = ground;
        this.upPipe = upPipe;
        this.downPipe = downPipe;

        objects.push(back);
        objects.push(upPipe);
        objects.push(downPipe);
        objects.push(ground);
        objects.push(bird);

        this.objects = objects;

        this.createMap();
        document.onkeyup = function (e) {
            let evt = e || window.event;
            let currKey = evt.keyCode || evt.which || evt.charCode;
            // console.log(currKey);
            if (currKey == 32) {  // 空格键
                bird.y -= 80;
            }
        };
        this.bird = bird;
        this.timer = setInterval(this.createMap.bind(this), 80);
    }

    canMove() {
        // 碰撞检测
        if (this.bird.y + this.bird.height > this.ground.y || // 检测地面
            ((this.bird.x + this.bird.width > this.upPipe.x) && (this.bird.y > this.upPipe.y) && (this.bird.x + this.bird.width < this.upPipe.x + this.upPipe.width) && (this.bird.y < this.upPipe.y + this.upPipe.height)) ||
            ((this.bird.x + this.bird.width > this.upPipe.x) && (this.bird.y > this.upPipe.y) && (this.bird.x + this.bird.width < this.upPipe.x + this.upPipe.width) && (this.bird.y < this.upPipe.y + this.upPipe.height)) || // 检测上面的Pipe
            ((this.bird.x > this.downPipe.x) && (this.bird.y > this.downPipe.y) && (this.bird.x < this.downPipe.x + this.downPipe.width) && (this.bird.y < this.downPipe.y + this.downPipe.height)) ||
            ((this.bird.x > this.downPipe.x) && (this.bird.y + this.bird.height > this.downPipe.y) && (this.bird.x < this.downPipe.x + this.downPipe.width) && (this.bird.y + this.bird.height < this.downPipe.y + this.downPipe.height)) // 检测下面Pipe
        ) {
            clearInterval(this.timer);
            window.ctx.fillStyle = "rgb(255, 255, 255)";
            window.ctx.font = "30px Accent";
            window.ctx.fillText(`You got ${this.score}!`, 110, 100);
            return;
        }

        // 模拟重力改变鸟的位置
        this.ver2 = this.ver1 + this.gravity;
        this.bird.y += (this.ver1 + this.ver2) * 0.5;
        // console.log(this.bird.y);

        // 管道移动的条件：到达最左边，挪到最右边，并随机生成高度
        if (this.upPipe.x + this.upPipe.width > 0) {
            this.upPipe.x -= this.velocity;
            this.downPipe.x -= this.velocity;
        } else { // 已经到最左边
            this.upPipe.x = this.downPipe.x = 400;
            this.upPipe.height = 100 + Math.random() * 200;
            this.downPipe.y = this.upPipe.height + this.pipeHeight;
            this.downPipe.height = 600 - this.downPipe.y;
            this.isScore = true;
        }

        // 绘制得分
        window.ctx.fillStyle = "rgb(255,255,255)";
        window.ctx.font = "30px Accent";

        if (this.score > 0) {
            this.score % 10 !== 0 ? window.ctx.fillText(this.score, 180, 100) : window.ctx.fillText("Great!" + this.score, 120, 100);
        }

        // 判断计分
        if (this.isScore && this.bird.x > this.upPipe.x + this.upPipe.width) {
            this.score++;
            this.isScore = false;
            if (this.score > 0 && this.score % 10 === 0) {
                this.velocity++;
            }
        }

    }
}

export default FlappyBird;