class Star1{
    update(x,y){
        ctx.moveTo(x,y)
        ctx.beginPath()
        for (let i=0; i<5; i++){
            ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*200+x, Math.sin((18+i*72)/180*Math.PI)*200+y)
            ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*80+x, Math.sin((54+i*72)/180*Math.PI)*80+y)
        }
        ctx.fill()
    }
}
