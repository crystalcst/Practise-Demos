class Bird { // bird类
    constructor(x, y, width, height, images, index = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.images = images;
        this.index = index;
    }
    draw() {
        this.index++;
        let image = new Image();
        image.src = this.images[this.index % 3];
        // image.onload = () => {
            window.ctx.drawImage(image, this.x, this.y, this.width, this.height);
        // }
    }
}

export default Bird;