
function clear(end_x,end_y,w,h,x_max,y_max, x_min, y_min){
    if (end_x < x_max){
        ctx.beginPath()
        ctx.clearRect(end_x,end_y,Math.abs(x_max-end_x),Math.abs(h));
        console.log(end_x,end_y,x_max-end_x,h)
    }
    if (end_x > x_min){
        ctx.beginPath()
        ctx.clearRect(end_x, end_y,x_min-end_x, end_y-y_min);
        console.log(end_x, end_y,x_min-end_x, end_y-y_min)
    }
    if (end_y < y_max){
        ctx.beginPath()
        ctx.clearRect(end_x, end_y,Math.abs(w), Math.abs(y_max-end_y));
        console.log(end_x, end_y+h,Math.abs(w), Math.abs(y_max-end_y))
    }
    if (end_y > y_min){
        ctx.beginPath()
        ctx.clearRect(end_x, end_y,Math.abs(-w),Math.abs(end_y));
        console.log(end_x, end_y,Math.abs(-w),Math.abs(end_y-y_min))
    }
    else{
        console.log("not out of bounds")
    }