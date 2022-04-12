class InteractiveObject{
    constructor(){
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        this.xStart = 0;
        this.yStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mClick(){
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
class InteractiveButton extends InteractiveObject {
    constructor(x, y, w, h, fill, over, selected, stroke,text, textColour) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)
        let fill = this.fill;
        if(InteractiveButton.selected ===this){
            fill = this.selected
        }else if (this.inBounds){
            fill =this.over
        }
        this.draw(this.x,this.y,this.w,this.h,fill, this.stroke,this.text,
            this.textColour)
    }
    mClick(){
        if(this.inBounds){
            InteractiveButton.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m>x && x_m < x+ w && y_m > y && y_m < y +h){
            return true;
        }
        else{
            return false;
        }
    }

    draw(x,y,w,h,c,s, txt, txtCol){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle =c;
        ctx.fill();
        ctx.stroke();

        let myFont = "bold 50 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = txtCol;
        ctx.fillText(txt, x + w/2, y + h/2)
    }
}
InteractiveButton.selected = null;


class Manager extends InteractiveObject {
    constructor() {
        super()
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
        this.button1 = false;
        this.button2 = false;
        this.inBounds = false;
    }

    mUp(e) {
        super.mUp(e);
        let name = InteractiveButton.selected.text;
        console.log(name)
        if(name === "Ellipse"){
            this.button1 = true;
            this.button2 = false;
            let temp = new ellipse(this.xStart + this.w/2,this.yStart+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), colArray[1][4]);
            this.objectSet.push(temp);
            this.update()

        }
        else if(name === "Rectangle"){
            this.button1 = false;
            this.button2 = true;
            let temp = new Rectangle(this.xStart, this.yStart, this.w, this.h, colArray[1][4]);
            this.objectSet.push(temp);
            this.update()
        }
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
        if(this.button2) {
                this.drawRect(this.xStart, this.yStart, this.w, this.h)
                this.drawLine(this.xStart, this.yStart, this.xStart + this.w, this.yStart + this.h, "rgb(0,0,0)")
                this.drawLine(this.xStart, this.yStart + this.h, this.xStart + this.w, this.yStart, "rgb(0,0,0)")
                let radius = Math.abs(this.w) / 30
                if (radius += 5 > this.h) {
                    radius = Math.abs(this.h) / 10
                }
                this.drawCircle(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(radius), "rgb(0,0,0)")
            }
        else if(this.button1) {
                this.drawRect(this.xStart, this.yStart, this.w, this.h)
                this.basicEllipse(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), "rgb(0,0,0)")
            } else {
                console.log(this.button1, this.button2)
            }

    }

}

Manager.prototype.drawRect = drawRect
Manager.prototype.drawLine = drawLine
Manager.prototype.drawCircle = drawCircle
Manager.prototype.basicEllipse = basicEllipse
