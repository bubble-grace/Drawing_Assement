console.log("init.js is called")

canvas = document.querySelector('#myCanvas');

let ctx = canvas.getContext('2d');

let width = 800;

let height = 375;


// dimensions of my drawing area
let rect_start_x = 350;
let rect_start_y = 50;
let rect_width = 400;
let rect_height = 275;

// the canvas area (grid area)
canvas.width = width;
canvas.height = height;


// This is an array for the colours used


let colArray=[
    "rgba(255,255,255)", "rgba(153,153,153)", "rgba(0,0,0)",
        "rgba(204,0,0)","rgba(293,123,20)","rgba(255,204,51)",
        "rgba(67,280,67)", "rgba(51,51,255)", "rgba(128,0,128)",
    "rgba(255,255,255, 0.5)", "rgba(153,153,153, 0.5)", "rgba(0,0,0, 0.5)",
    "rgba(204,0,0, 0.5)","rgba(293,123,20, 0.5)","rgba(255,204,51, 0.5)",
    "rgba(67,280,67, 0.5)", "rgba(51,51,255, 0.5)", "rgba(128,0,128, 0.5)",
    "rgba(255,255,255, 0.3)", "rgba(153,153,153, 0.3)", "rgba(0,0,0, 0.3)",
    "rgba(204,0,0, 0.3)","rgba(293,123,20, 0.3)","rgba(255,204,51, 0.3)",
    "rgba(67,280,67, 0.3)", "rgba(51,51,255, 0.3)", "rgba(128,0,128, 0.3)"

]



//--------------------------------------------------------
/**
 * Function Draw a Rectangle
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 */
 function drawRect(x,y,w,h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = 1;
    // this is the black colour from my list
    ctx.strokeStyle = colArray[2];
    ctx.stroke();
}

/**
 * Function Draw a Rectangle with a fill function
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
function basicRect(x,y,w,h,fill){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    // fill with a variable/chosen colour
    ctx.fillStyle = fill;
    ctx.fill()
}
/**
 * Function Draw a Rectangle with a fill function and an outline
 * this is used for the background of the drawing area
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */

function backRect(x,y,w,h,fill){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    // fill with a variable/chosen colour
    ctx.fillStyle = fill;
    ctx.fill()
    ctx.lineWidth = 1;
    // this is the black colour from my list
    ctx.strokeStyle = colArray[2];
    ctx.stroke();
}

/**
 * Function Draw Circle
 * @param {number} x x
 * @param {number} y y
 * @param {number} r radius (width/2)
 * @param {string} fill fill colour
 */

// draw circle needed for guidelines for the rectangle
function drawCircle(x,y,r, fill){
    ctx.beginPath();
    ctx.lineWidth = 1;
    // need start and end angles to be in radians
    ctx.arc(x,y,r,0,2*Math.PI);
    // colour of outline
    ctx.strokeStyle = fill;
    ctx.stroke();
}

//----------------------------------------------------------
/**
 * Class Line
 * @param {number} x x
 * @param {number} y y
 * @param {number} x1 end x point (x + or - width)
 * @param {number} y1 end x point (y + or - height)
 * @param {string} fill fill colour
 * @param {number} width thickness of the line
 */
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

/**
 * Function Draw a Line
 * @param {number} x x
 * @param {number} y y
 * @param {number} x1 end x point (x + or - width)
 * @param {number} y1 end x point (y + or - height)
 * @param {string} fill fill colour
 * @param {number} width thickness of the line
 */

// for rectangle guidelines and line function
function drawLine(x,y,x1,y1, fill, width){
    ctx.beginPath();
    // the start of line in x,y form
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1)
    // set the width of the line
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    // what colour the line is
    ctx.strokeStyle = fill;
    ctx.stroke();
}

//-------------------------------------------------------
/**
 * Class Rectangle
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */

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
/**
 * Class Ellipse
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
class Ellipse{
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
/**
 * Function Draw an Ellipse
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
function fillEllipse(x,y,w,h,fill){
    ctx.beginPath();
    // starts from the middle make sure the x,y are in the middle
    ctx.ellipse(x,y,w,h, 0, 0, 2*Math.PI);
    // set a colour to fill the shape
    ctx.fillStyle = fill;
    ctx.fill()
}
/**
 * Function Draw a basic Ellipse
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} size thickness of the outline
 */
function basicEllipse(x,y,w,h,fill, size){
    ctx.beginPath();
    // starts from the middle make sure the x,y are in the middle
    ctx.ellipse(x,y,w,h, 0, 0, 2*Math.PI);
    // set an outline colour
    ctx.strokeStyle = fill;
    // set a width for the outline
    ctx.lineWidth = size
    ctx.stroke()
}

//----------------------------------------------------------------------
/**
 * Class Star
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} point number of points in the star
 */
class Star{
    // if a point is not selected default to 5
    constructor(x,y,w, h,colour, point = 5) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
        this.point = point;
    }
    update(){
        // call the star to be filled in
        fillStar(this.x, this.y, this.w, this.h, this.fill, this.point)
        }
}

/**
 * Function Draw a filled Star
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} point number of points in the star
 */
function fillStar(x,y,w,h,fill, point = 5){
    // move to the middle
    ctx.moveTo(x+w/2,y-h/2)
    ctx.beginPath();
    point = 2*point
    // to draw the lines the chosen amount of times for an adjustable pointed star
    for (let i=0; i<point; i+=2){
        ctx.lineTo(Math.cos((i*(360/point))/180*Math.PI)*w/2+x+w/2, Math.sin((i*(360/point))/180*Math.PI)*w/2+y+h/2)
        ctx.lineTo(Math.cos(((i+1)*(360/point))/180*Math.PI)*w/6+x+w/2, Math.sin(((i+1)*(360/point))/180*Math.PI)*w/6+y+h/2)
    }
    // setting what the colour is
    ctx.fillStyle = fill;
    // filling in the shape
    ctx.fill()
}

/**
 * Function Draw an outline (basic) Star
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} point number of points in the star
 */
function basicStar(x,y,w,h,fill, point = 5){
    // move to the middle
    ctx.moveTo(x+w/2,y-h/2)
    ctx.beginPath();
    point = 2*point
    // to draw the lines the chosen amount of times for an adjustable pointed star
    for (let i=0; i<point; i+=2){
        ctx.lineTo(Math.cos((i*(360/point))/180*Math.PI)*w/2+x+w/2, Math.sin((i*(360/point))/180*Math.PI)*w/2+y+h/2)
        ctx.lineTo(Math.cos(((i+1)*(360/point))/180*Math.PI)*w/6+x+w/2, Math.sin(((i+1)*(360/point))/180*Math.PI)*w/6+y+h/2)
    }
    ctx.lineTo(x+w, y+h/2)
    // set what the line colour is
    ctx.strokeStyle = fill;
    // draw the lines
    ctx.stroke()

}


//-----------------------------------------------------------------

/**
 * Class Heart
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */

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

/**
 * Function Draw filled Heart
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */

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

/**
 * Function Draw outline (basic) Heart
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill outline colour
 */
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

/**
 * Class Smiley Face
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} size thickness of line
 */
class Smiley_Face{
    // the size is set if the width of the line is not already selected
    constructor(x,y,w, h,colour, size =2){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.fill = colour;
        this.size = size;

    }
    update(){
        // this is to fill in the smiley face
        draw_Smiley_Face(this.x, this.y, this.w, this.h, this.fill, this.size)
    }
}

/**
 * Function Draw filled Smiley Face
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {number} size thickness of line
 */

function draw_Smiley_Face(x,y,w,h,fill, size){
    ctx.beginPath();
    // This is the distance between the top and the eyes
    let topCurveHeight = h * 0.3;
    // Circle and Oval for the outside
    basicEllipse(x+w/2,y+h/2,Math.abs(w/2),Math.abs(h/2), fill, size);
    // eyes
    drawLine(x+w/3, y +topCurveHeight,x+w/3, y + h/2, fill, size)
    drawLine(x+2*w/3, y + topCurveHeight,x+2*w/3, y + h/2, fill, size)
    ctx.moveTo(x+w/5, y +2*topCurveHeight);
    // mouth
    ctx.bezierCurveTo(x+w/5, y +2*topCurveHeight, x+w/3, y +4*topCurveHeight, x+2*w/2.5, y +2*topCurveHeight);
   // colour
    ctx.strokeStyle = fill;
    // width of the lines
    ctx.lineWidth = size;
    ctx.stroke()
}