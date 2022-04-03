class InteractiveObject{
    constructor(){
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        this.xStart = 0;
        this.yStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e){
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        this.mouseIsDown = true;
        let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log (output)
    }
    mUp(e){
        this.mouseIsDown = false;
        let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log(output)
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        console.log("moving")
    }
    mLeave(e){
        console.log("Mouse has left the canvas")
    }

}


class Manager extends InteractiveObject {
    constructor() {
        super()
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
    }

    mUp(e) {
        super.mUp(e);
        let temp = new ellipse(this.xStart + this.w/2,this.yStart+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), colArray[1][4]);
        this.objectSet.push(temp);
    }

    update(){
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        for (let i = 0; i < this.objectSet.length; i++) {
            this.objectSet[i].update()
        }
        if (this.mouseIsDown) {
            console.log("mouse is down")
            this.draw();
        }
    }

    draw() {
        this.drawRect(this.xStart, this.yStart, this.w, this.h)
        this.basicEllipse(this.xStart + this.w/2,this.yStart+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), "rgb(0,0,0)")

    }
}

Manager.prototype.drawRect = drawRect
Manager.prototype.drawLine = drawLine
Manager.prototype.drawCircle = drawCircle
Manager.prototype.fillCircle = fillCircle
Manager.prototype.fillEllipse = fillEllipse
Manager.prototype.basicEllipse = basicEllipse