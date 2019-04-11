let svg=document.getElementById("container");
let rect=document.getElementsByClassName("rect")[0];
let canMove=false;
let mouseX=0,mouseY=0;
svg.addEventListener("wheel",function(e){
    let wheelData=parseInt(rect.getAttribute("x"));;
        wheelData+=e.deltaY/10;
    rect.setAttribute("x",wheelData)
})
rect.onmousedown=function(e){
    canMove=true;
}
rect.onmousemove=function(e){
    if(canMove){
       this.setAttribute("x",e.offsetX-mouseX)
       this.setAttribute("y",e.offsetY-mouseY)
    }
    mouseX=e.offsetX-parseInt(rect.getAttribute("x"));
    mouseY=e.offsetY-parseInt(rect.getAttribute("y"));
}
rect.onmouseup=function(e){
    canMove=false;
}