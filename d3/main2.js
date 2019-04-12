//取消右键点击菜单
document.oncontextmenu=function(){
    return false;
}
//初始化数据
let nodes=[];

//创建画布
let width = 600,height = 400;
let r=16;
d3.select("body").insert("svg","#buttons").attr({
    width:width,
    height:height,
}).style({
    background:"black"
})


//更新数据的函数
function computeNode(){
    let len=nodes.length;
    let step=width/len;
    for(let i=0;i<len;i++){
        let colStep=height/nodes[i].length;
        for(let j=0;j<nodes[i].length;j++){
            nodes[i][j].cx=(i+1)*step-step/2;
            nodes[i][j].cy=(j+1)*colStep-colStep/2;
        }
    }
    console.log(nodes)
}
//画图函数
function draw(){
    let svg=d3.select("svg");
    let data=nodes.flat();
    //清除画布
    svg.selectAll("circle").remove();
    //绑定数据
    let node=svg.selectAll("circle").data(data);
    node.enter().append("circle")
    .attr("cx",function(d){
        return d.cx;
    })
    .attr("cy",function(d){
        return d.cy;
    })
    .attr("r",r)
    .style("fill","pink")
    .on("click",function(){
        alert("hahahahahahahah")
    })
};
//添加列的按钮
d3.select("body>button").on("click",function(){
    //添加一个数据
    let node=[{cx:"",cy:""}];
    nodes.push(node);
    //更新每个节点当前数据
    computeNode();
    //清除按钮
    d3.select("#buttons").selectAll("button").remove();
    //添加一个按钮
    let buttons=d3.select("#buttons").selectAll("button").data(nodes);
    buttons.enter()
        .append("button")
        .html(function(d,i){
            return `按钮${i+1}`;
        })
        .on("click",function(d,i){
            d.push({cx:"",cy:""})
            computeNode();
            draw()
    })
    //画图
    draw();
})