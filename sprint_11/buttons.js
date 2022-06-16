/**
 * Interactive Object
 * @param {number} xStart where the x starts
 * @param {number} yStart where the y starts
 * @param {number} xMouse where the mouse ends in x
 * @param {number} yMouse where the mouse ends in y
 */

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
    }
    mClick(){
    }

    mDown(e){
        // to find the start of the rectangle going down
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
    }
    mUp(e){
        // when the mouse goes up
    }

    mMove(e){
        // when the mose moves and where it is moving
        // changing the x and y mouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(){
        // to know were the mouse is
        console.log("Mouse has left the canvas");
    }

}

//------------------------------------------------------------------
/**
* Interactive button (clickable)
 * includes all functions from interactive object
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} textColour button text colour
*/
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
        this.name = InteractiveButton;
    }
    update(){
        // find the boundary
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse);
        let fill = this.fill;
        if(this.name.selected ===this){
            // fill the button that is selected
            fill = this.selected;
        }else if (this.inBounds){
            // fill with the hover function
            fill =this.over;
        }
        this.draw(this.x,this.y,this.w,this.h,fill, this.stroke,this.text,
            this.textColour);
    }
    mClick(){
        if(this.inBounds){
            this.name.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        // find if within parameters
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
        // settings for the font
        let myFont = "bold 50 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        // where text is positioned
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = txtCol;
        ctx.fillText(txt, x + w/2, y + h/2);
    }
}
InteractiveButton.selected = "";

/**
 * Size button for the lines(clickable)
 * includes all functions from interactive button
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} textColour button text colour
 * @param {number} size width of the line (pixels)
 * @return {string} getBoundary and returns true or false

 */

class SizeButton extends InteractiveButton{
    // new buttons for width of lines and smiley faces
    constructor(x, y, w, h, fill, over, selected, stroke,text, textColour, size) {
        super(x, y, w, h, fill, over, selected, stroke,text, textColour);
        this.name = SizeButton;
        this.size = size;
    }
}
SizeButton.selected = "";

/**
 * Star button for number of points (clickable)
 * includes all functions from interactive button
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} textColour button text colour
 * @param {number} point the amount of star points
 * @return {string} getBoundary and returns true or false

 */
class StarButton extends InteractiveButton{
    // new buttons for the amount of points on a star
    constructor(x, y, w, h, fill, over, selected, stroke,text, textColour, point) {
        super(x, y, w, h, fill, over, selected, stroke,text, textColour);
        this.name = StarButton;
        this.point = point;
    }
}
SizeButton.selected = "";

/**
 * Colour Swatch (clickable)
 * includes all functions from interactive object
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @return {string} getBoundary and returns true or false

 */

class Swatch extends InteractiveObject {
    // new buttons for the colours
    constructor(x, y, w, h, fill, over, selected, stroke) {
        // no text just colours
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
        // find the boundary
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse);
        let stroke = this.stroke;
        if(Swatch.selected === this){
            // change the outside colour of the boxes
            stroke = this.selected;
            // set the fill colour
            Swatch.colour = this.fill;
        }else if (this.inBounds){
            // for a hover
            stroke =this.over;
        }
        this.draw(this.x,this.y,this.w,this.h,this.fill, stroke,
            this.textColour);
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
Swatch.colour = colArray[0];

/**
 * Manager
 * includes all functions from interactive object
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} selected button has been clicked colour
 * @return {string} getBoundary and returns true or false
 */

class Manager extends InteractiveObject {
    // this is where everything is called
    constructor() {
        super();
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
            this.readytodraw = true;
        }
    }


    mUp(e) {
        super.mUp(e);
        let name = InteractiveButton.selected.text;
        console.log(name);
        if (this.readytodraw) {
            if (name === "Ellipse") {
                // Ellipse
                let temp = new Ellipse(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), Swatch.colour);
                this.objectSet.push(temp);

            } else if (name === "Rectangle") {
                // Rectangle
                let temp = new Rectangle(this.xStart, this.yStart, this.w, this.h, Swatch.colour);
                this.objectSet.push(temp);

            } else if (name === "Star") {
                // Star
                let temp = new Star(this.xStart, this.yStart, this.w, this.h, Swatch.colour, StarButton.selected.point);
                this.objectSet.push(temp);

            } else if (name === "Heart") {
                // Heart
                let temp = new Heart(this.xStart, this.yStart, this.w, this.h, Swatch.colour);
                this.objectSet.push(temp);
            }
            else if (name === "Line") {
                // Line
                let temp = new Line(this.xStart, this.yStart, this.w, this.h, Swatch.colour, SizeButton.selected.size);
                this.objectSet.push(temp);
            }

            else if (name === "Smiley Face") {
                // Smiley Face
                let temp = new Smiley_Face(this.xStart, this.yStart, this.w, this.h, Swatch.colour, SizeButton.selected.size);
                this.objectSet.push(temp);
            }
        }
            this.readytodraw = false;
        }

    update(){
        ctx.save();
        // drawing space
        backRect(rect_start_x,rect_start_y, rect_width, rect_height,"rgb(230,230,230)");
        ctx.clip();
        // finding width and height
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        // check the boundary again
        this.inBounds = this.getBoundary(this.xMouse,this.yMouse,rect_start_x,rect_start_y, rect_width, rect_height)
        console.log(this.inBounds);
        // print the shapes
        for (let i = 0; i < this.objectSet.length; i++ && this.inBounds) {
            this.objectSet[i].update();
        }
        if (this.readytodraw) {
            console.log("mouse is down");
            this.draw();
        }
        // this is to clip
        ctx.restore();
        name = InteractiveButton.selected.text;
        if (name === "Undo") {
            // undo by removing last thing in the list
            this.objectSet.pop();
            InteractiveButton.selected = "";
        }
        else if (name == "Clear"){
            // clear by making the list be nothing
            this.objectSet = [];
        }
        else{}

    }
    getBoundary(mouseX,mouseY,x, y,w,h){
        // find if mouse is in boundary
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
                // outline box
                this.drawRect(this.xStart, this.yStart, this.w, this.h);
                // outline guidelines
                this.drawLine(this.xStart, this.yStart, this.xStart + this.w, this.yStart + this.h, "rgb(0,0,0)", 2);
                this.drawLine(this.xStart, this.yStart + this.h, this.xStart + this.w, this.yStart, "rgb(0,0,0)", 2);
                let radius = Math.abs(this.w) / 30;
                if (radius += 5 > this.h) {
                    radius = Math.abs(this.h) / 10;
                }
                this.drawCircle(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(radius), "rgb(0,0,0)");


        }
        // circle
        else if (name === "Ellipse") {
                // outline box
                this.drawRect(this.xStart, this.yStart, this.w, this.h);
                this.basicEllipse(this.xStart + this.w / 2, this.yStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), "rgb(0,0,0)", 2);



        }
        // star
        else if (name === "Star") {
            // outline box
            this.drawRect(this.xStart, this.yStart, this.w, this.h);
            this.basicStar(this.xStart , this.yStart , this.w, this.h,"rgb(0,0,0)", StarButton.selected.point);


        }
        // heart
        else if (name === "Heart") {
            // outline box
            this.drawRect(this.xStart, this.yStart, this.w, this.h);
            this.basicHeart(this.xStart , this.yStart , this.w, this.h,"rgb(0,0,0)");

        }
        // line
        else if (name === "Line") {
            this.drawLine(this.xStart, this.yStart, this.xStart+this.w, this.yStart+this.h, "rgb(0,0,0)", 2 );
        }
        // smiley face
        else if (name === "Smiley Face") {
            // outline box
            this.drawRect(this.xStart, this.yStart, this.w, this.h)
            this.draw_Smiley_Face(this.xStart , this.yStart, Math.abs(this.w ), Math.abs(this.h), "rgb(0,0,0)",2);



        }
        else {
                console.log();
            }

    }

}
// to get everything from the init file
Manager.prototype.drawRect = drawRect;
Manager.prototype.drawLine = drawLine;
Manager.prototype.drawCircle = drawCircle;
Manager.prototype.basicEllipse = basicEllipse;
Manager.prototype.basicStar = basicStar;
Manager.prototype.basicHeart = basicHeart;
Manager.prototype.draw_Smiley_Face = draw_Smiley_Face;

