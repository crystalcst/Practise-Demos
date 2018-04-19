class UpPipe { // 上管道类
    constructor(x, y, width, height, imgSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imgSrc = imgSrc;
    }
    draw() {
        let image = new Image();
        image.src = this.imgSrc;
        // image.onload = () => {
            window.ctx.drawImage(image, 150, 500, 150, 800, this.x, this.y, this.width, this.height);
        // }
    }
}

export default UpPipe;