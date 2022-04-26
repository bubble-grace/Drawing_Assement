class Star2{
    update(x,y,w,h){
        ctx.beginPath()
        ctx.moveTo(x,y)
        ctx.lineTo(x+w, y)
        ctx.lineTo(x+w/2,y+h/1.2)
        ctx.lineTo(x,y)
        ctx.fill()
        ctx.moveTo(x,y+h/2)
        ctx.lineTo(x+w/2, y-h/3)
        ctx.lineTo(x+w,y+h/2)
        ctx.lineTo(x,y+h/2)
        ctx.fill()
}
}

