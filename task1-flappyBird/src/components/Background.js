class Background { // 背景类
    constructor(x, y, width, height, imgSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imgSrc = imgSrc;
    }
    draw() {
        let bgImg = new Image();
        // console.log(this.imgSrc);
        bgImg.src = this.imgSrc;
        // bgImg.onload = () => {
            window.ctx.drawImage(bgImg, this.x, this.y, this.width, this.height);
        // }
    }
}

export default Background;