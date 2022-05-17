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
        ctx.fillStyle = c;
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
InteractiveButton.selected = "";

class Swatch extends InteractiveObject {
    constructor(x, y, w, h, fill, over, selected, stroke) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.inBounds = false;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)
        let stroke = this.stroke;
        if(Swatch.selected === this){
            stroke = this.selected
            Swatch.colour = this.fill
        }else if (this.inBounds){
            stroke =this.over
        }
        this.draw(this.x,this.y,this.w,this.h,this.fill, stroke,
            this.textColour)
    }
    mClick(){
        if(this.inBounds){
           Swatch.selected = this;
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


    draw(x,y,w,h,c,s){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.stroke();
    }
}
Swatch.selected = "";
Swatch.colour = colArray[0]

class Manager extends InteractiveObject {
    constructor() {
        super()
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
        this.inBounds = false;
        this.readytodraw = false;
    }
    mDown(e) {
        super.mDown(e);
        // is the mouse inside the drawing rectangle
        // set ready to draw as true
        if(this.inBounds){
            this.readytodraw = true
        }
    }


    mUp(e) {
        super.mUp(e);
        let name = InteractiveButton.selected.text;
        console.log(name)
        if (this.readytodraw) {
            if (name === "Ellipse") {
                let temp = new ellipse(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), Swatch.colour);
                this.objectSet.push(temp);

            } else if (name === "Rectangle") {
                let temp = new Rectangle(this.xStart, this.yStart, this.w, this.h, Swatch.colour);
                this.objectSet.push(temp);

            } else if (name === "Star") {
                let temp = new Star(this.xStart, this.yStart, this.w, this.h, Swatch.colour);
                this.objectSet.push(temp);

            } else if (name === "Heart") {
                let temp = new Heart(this.xStart, this.yStart, this.w, this.h, Swatch.colour);
                this.objectSet.push(temp);
            }

            this.readytodraw = false;
        }
    }

    update(){
        ctx.save()
        basicRect(rect_start_x,rect_start_y, rect_width, rect_height,"rgb(200,200,200)")
        ctx.clip()
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        this.inBounds = this.getBoundary(this.xMouse,this.yMouse,rect_start_x,rect_start_y, rect_width, rect_height)
        console.log(this.inBounds)
        for (let i = 0; i < this.objectSet.length; i++ && this.inBounds) {
            this.objectSet[i].update()
        }
        if (this.readytodraw) {
            console.log("mouse is down")
            this.draw();
        }
        ctx.restore()

    }
    getBoundary(mouseX,mouseY,x, y,w,h){
        if( (mouseX > x) && (mouseX < x+w) && (mouseY > y) && (mouseY < y+h)) {
            return true;
        }
        else{
            return false;
        }
    }
    draw() {
        let name = InteractiveButton.selected.text;
        // rectangle
        if(name === "Rectangle") {
                this.drawRect(this.xStart, this.yStart, this.w, this.h)
                this.drawLine(this.xStart, this.yStart, this.xStart + this.w, this.yStart + this.h, "rgb(0,0,0)")
                this.drawLine(this.xStart, this.yStart + this.h, this.xStart + this.w, this.yStart, "rgb(0,0,0)")
                let radius = Math.abs(this.w) / 30
                if (radius += 5 > this.h) {
                    radius = Math.abs(this.h) / 10
                }
                this.drawCircle(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(radius), "rgb(0,0,0)");


        }
        // circle
        else if (name === "Ellipse") {
                this.drawRect(this.xStart, this.yStart, this.w, this.h)
                this.basicEllipse(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), "rgb(0,0,0)");



        }
        else if (name === "Star") {
            this.drawRect(this.xStart, this.yStart, this.w, this.h)
            this.basicStar(this.xStart , this.yStart , this.w, this.h,"rgb(0,0,0)");


        }
        else if (name === "Heart") {
            this.drawRect(this.xStart, this.yStart, this.w, this.h)
            this.basicHeart(this.xStart , this.yStart , this.w, this.h,"rgb(0,0,0)");

        }
        else {
                console.log()
            }

    }

}
Manager.prototype.drawRect = drawRect
Manager.prototype.drawLine = drawLine
Manager.prototype.drawCircle = drawCircle
Manager.prototype.basicEllipse = basicEllipse
Manager.prototype.basicStar = basicStar
Manager.prototype.basicHeart = basicHeart

