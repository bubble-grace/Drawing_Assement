console.log("init.js is called")

canvas = document.querySelector('#myCanvas');

let ctx = canvas.getContext('2d');

let width = 800;

let height = 600;

let colour = "rgb(169,169,169)"

let rect_start_x = 200;
let rect_start_y = 50;
let rect_width = 500;
let rect_height = 400;

canvas.width = width;
canvas.height = height;
canvas.colour = colour

console.log("init.js has been called")
let myScale = 0;

function setupCanvas (canvas){
    // Get the pixel ratio back to 1
    let dpr = window.devicePixelRatio || 1;
    myScale = dpr;
    // get the size of the CSS in HTML
    let rect = canvas.getBoundingClientRect();
    console.log(rect.width);
    console.log(rect.height);
}

// This is an array which in python was a list


let colArray=[
    "rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)",
        "rgb(204,0,0)","rgb(293,123,20)","rgb(255,204,51)",
        "rgb(67,280,67)", "rgb(51,51,255)", "rgb(128,0,128)"
]




// ----------------------------------------

class Grid {
    constructor(w, h, intervalWidth, strokeColour,
                strokeWidth) {
        this.w = w;
        this.h = h;
        this.intervalWidth = intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }

    update() {
        this.draw()
    }

    draw() {
        for (let i = -this.w; i <= this.w; i +=
            this.intervalWidth) {
            drawLine(i, -this.h, i,
                this.h, this.strokeColour,
                this.strokeWidth);
        }
        for (let j = -this.h; j <= this.h; j +=
            this.intervalWidth) {
            drawLine(-this.w, j, this.w,
                j, this.strokeColour,
                this.strokeWidth);
        }
    }

}
//--------------------------------------------------------

 function drawRect(x,y,w,h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colArray[2];
    ctx.stroke();
}

function basicRect(x,y,w,h,fill){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = fill;
    ctx.fill()
}

// draw circle needed for guidelines for the rectangle
function drawCircle(x,y,r, fill){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.strokeStyle = fill;
    ctx.stroke();
}

//----------------------------------------------------------
class Line{
    constructor(x,y,w,h,colour, width=2) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
        this.width = width;


    }
    update(){
        drawLine(this.x, this.y, this.x + this.w, this.y+this.h, this.fill, this.width)
    }
}

// for rectangle guidelines
function drawLine(x,y,x1,y1, fill, width){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1)
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = fill;
    ctx.stroke();
}

//-------------------------------------------------------
class Rectangle{
    constructor(x,y,w,h,colour) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;


    }
    update(){
        basicRect(this.x, this.y, this.w, this.h, this.fill)
}
}
//------------------------------------------------
// capitalise
class ellipse{
    constructor(x,y,w, h,colour){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;

    }
    update(){
        fillEllipse(this.x, this.y, this.w, this.h, this.fill)
    }
}

function fillEllipse(x,y,w,h,fill){
    ctx.beginPath();
    ctx.ellipse(x,y,w,h, 0, 0, 2*Math.PI);
    ctx.fillStyle = fill;
    ctx.fill()
}
function basicEllipse(x,y,w,h,fill, size){
    ctx.beginPath();
    ctx.ellipse(x,y,w,h, 0, 0, 2*Math.PI);
    ctx.strokeStyle = fill;
    ctx.lineWidth = size
    ctx.stroke()
}

//----------------------------------------------------------------------

class Star{
    constructor(x,y,w, h,colour, ) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
    }
    update(){
        fillStar(this.x, this.y, this.w, this.h, this.fill)
        }
}


function fillStar(x,y,w,h,fill){
    ctx.moveTo(x+w/2,y-h/2)
    ctx.beginPath();
    for (let i=0; i<5; i++){
        ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*w/2+x+w/2, Math.sin((18+i*72)/180*Math.PI)*h/2+y+h/2)
        ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*w/6+x+w/2, Math.sin((54+i*72)/180*Math.PI)*h/6+y+h/2)
    }
    ctx.fillStyle = fill;
    ctx.fill()
}
function basicStar(x,y,w,h,fill){
    // move to the middle
    ctx.moveTo(x+w/2,y-h/2)
    ctx.beginPath();
    // to draw the lines 5 times for an adjustable pointed star for later
    for (let i=0; i<5; i++){
        ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*w/2+x+w/2, Math.sin((18+i*72)/180*Math.PI)*h/2+y+h/2)
        ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*w/6+x+w/2, Math.sin((54+i*72)/180*Math.PI)*h/6+y+h/2)
    }
    ctx.lineTo(x+w/1.015, y+h/1.54)
    ctx.strokeStyle = fill;
    ctx.stroke()
}


//-----------------------------------------------------------------




class Heart{
    constructor(x,y,w, h,colour) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
    }
    update(){
        fillHeart(this.x, this.y, this.w, this.h, this.fill)
    }
}

function fillHeart(x,y,w,h,fill){
    ctx.beginPath();
    let topCurveHeight = h * 0.3;
    ctx.moveTo(x+w/2, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x+w/2, y, x , y, x , y + topCurveHeight);

    // bottom left curve
    ctx.bezierCurveTo(
        x , y + (h + topCurveHeight) / 2, x+w/2, y + (h + topCurveHeight) / 2, x+w/2, y + h);

    // bottom right curve
    ctx.bezierCurveTo(
        x+w/2, y + (h + topCurveHeight) / 2, x + w, y + (h + topCurveHeight) / 2, x + w, y + topCurveHeight);

    // top right curve
    ctx.bezierCurveTo(
        x + w, y, x+w/2, y, x+w/2, y + topCurveHeight);

    ctx.fillStyle = fill;
    ctx.fill()
}
function basicHeart(x,y,w,h,fill){
    ctx.beginPath();
    let topCurveHeight = h * 0.3;
    ctx.moveTo(x+w/2, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x+w/2, y, x , y, x , y + topCurveHeight);

    // bottom left curve
    ctx.bezierCurveTo(
        x , y + (h + topCurveHeight) / 2, x+w/2, y + (h + topCurveHeight) / 2, x+w/2, y + h);

    // bottom right curve
    ctx.bezierCurveTo(
        x+w/2, y + (h + topCurveHeight) / 2, x + w, y + (h + topCurveHeight) / 2, x + w, y + topCurveHeight);

    // top right curve
    ctx.bezierCurveTo(
        x + w, y, x+w/2, y, x+w/2, y + topCurveHeight);

    ctx.strokeStyle = fill;
    ctx.stroke()
}

class Smiley_Face{
    constructor(x,y,w, h,colour, size =2){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
        this.size = size;

    }
    update(){
        draw_Smiley_Face(this.x, this.y, this.w, this.h, this.fill, this.size)
    }
}

function draw_Smiley_Face(x,y,w,h,fill, size){
    ctx.beginPath();
    let topCurveHeight = h * 0.3;
    basicEllipse(x+w/2,y+h/2,Math.abs(w/2),Math.abs(h/2),fill, size);
    // eyes
    drawLine(x+w/3, y +topCurveHeight,x+w/3, y + h/2, size)
    drawLine(x+2*w/3, y + topCurveHeight,x+2*w/3, y + h/2, size)
    ctx.moveTo(x+w/5, y +2*topCurveHeight);
    ctx.bezierCurveTo(x+w/5, y +2*topCurveHeight, x+w/3, y +4*topCurveHeight, x+2*w/2.5, y +2*topCurveHeight);
    ctx.strokeStyle = fill;
    ctx.lineWidth = size;
    ctx.stroke()
}