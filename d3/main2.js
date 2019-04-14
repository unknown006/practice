//取消右键点击菜单
document.oncontextmenu=function(){
    return false;
}
//初始化数据
let nodes=[];
let lines=[];
let flatedNodes=[];
//拖拽中线的数据
let draggingLineData=[{
    x1:"",
    y1:"",
    x2:"",
    y2:"",
    source:"",
    target:""
}]
let draggingLine=draggingLineData[0];
//创建画布
let width = 600,height = 400;
let r=16;
d3.select("body").insert("svg","#buttons").attr({
    width:width,
    height:height,
}).style({
    background:"black"
})
//定义拖拽
let circleDrag = d3.behavior.drag();
circleDrag.on("dragstart",function(d,i){
    draggingLine.x1=d.cx;
    draggingLine.y1=d.cy;
    draggingLine.source=i;
}).on("drag",function(d,i){
    let e=d3.event;
    draggingLine.x2=e.x;
    draggingLine.y2=e.y;
    drawDraggingLine();
}).on("dragend",function(d,i){
    let e=d3.event;
    let circle=e.sourceEvent.target;
    let targetName=circle.nodeName.toLowerCase().trim();
    //检测拖放目标
    for(let j=0;j<flatedNodes.length;j++){
        let isSame=Number(d3.select(circle).attr("cx"))==flatedNodes[j].cx && Number(d3.select(circle).attr("cy"))==flatedNodes[j].cy;
        if(targetName=="circle" && isSame){
            draggingLine.target=j;
        }
    }
    if(targetName=="circle" && draggingLine.source!=draggingLine.target){
        draggingLine.x2=Number(d3.select(circle).attr("cx"));
        draggingLine.y2=Number(d3.select(circle).attr("cy"));
        //检测是否已存在
        if(lines.length>0){
            let canAdd=!lines.some(function(elem,i,arr){
                let isRepeatX1=draggingLine.x1==arr[i].x1;
                let isRepeatX2=draggingLine.x2==arr[i].x2;
                let isRepeatY1=draggingLine.y1==arr[i].y1;
                let isRepeatY2=draggingLine.y2==arr[i].y2;
                let isRepeatX1Rev=draggingLine.x1==arr[i].x2;
                let isRepeatX2Rev=draggingLine.x2==arr[i].x1;
                let isRepeatY1Rev=draggingLine.y1==arr[i].y2;
                let isRepeatY2Rev=draggingLine.y2==arr[i].y1;
                return  (isRepeatX1 && isRepeatX2 && isRepeatY1 && isRepeatY2) || (isRepeatX1Rev && isRepeatX2Rev && isRepeatY1Rev && isRepeatY2Rev);
            })
            if(canAdd){
                lines.push(Object.assign({},draggingLine));
            }
        }else{
            lines.push(Object.assign({},draggingLine));
        }
        removeDraggingLine();
        drawLines();
    }else{
        removeDraggingLine();
        drawLines();
    }
})

//更新节点数据的函数
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
//更新flatedNodes的函数
function getFlatedNodes(){
    let data=[];
    for(let i=0;i<nodes.length;i++){
        data=data.concat(nodes[i])
    }
    return data;
}
//添加节点后更新线的源和目标
function updateLineRelation(type,node,index){
    if(type.toLowerCase()=="add"){
        let index=flatedNodes.indexOf(node);
        if(index!=-1){
            for(let i=index+1;i<flatedNodes.length;i++){
                lines.forEach(function(elem,j,arr){
                    if(arr[j].x1==flatedNodes[i].cx && arr[j].y1==flatedNodes[i].cy){
                        arr[j].source=i;
                    }else if(arr[j].x2==flatedNodes[i].cx && arr[j].y2==flatedNodes[i].cy){
                        arr[j].target=i;
                    }
                })
            }
            //更新线数据
            updateLine();
        }else{
            alert("出错了！")
        }
    }else if(type.toLowerCase()=="delete"){
        //
        //等于当前下标大于直接移除数据
        for(let i=0;i<lines.length;i++){
            if(lines[i].source==index || lines[i].target==index){
                lines.splice(i,1);
                i--;
            }else if(lines[i].source>index || lines[i].target>index){
                if(lines[i].source>index){
                    lines[i].source=lines[i].source-1;
                }
                if(lines[i].target>index){
                    lines[i].target=lines[i].target-1;
                }
            }
        }
        console.log(lines)
        //更新线数据
        updateLine();
    }
}
//更新线的坐标
function updateLine(){
    lines.forEach(function(elem,i,arr){
        data1=arr[i].source;
        data2=arr[i].target;
        arr[i].x1=flatedNodes[data1].cx;
        arr[i].y1=flatedNodes[data1].cy;
        arr[i].x2=flatedNodes[data2].cx;
        arr[i].y2=flatedNodes[data2].cy;
    })
}

//节点画图函数
function drawNodes(){
    let svg=d3.select("svg");
    //let data=nodes.flat();
    //清除画布的节点
    svg.selectAll("circle").remove();
    //绑定数据
    let node=svg.selectAll("circle").data(flatedNodes);
    node.enter().append("circle")
    .attr("cx",function(d){
        return d.cx;
    })
    .attr("cy",function(d){
        return d.cy;
    })
    .attr("r",r)
    .style("fill","gold")
    .on("dblclick",function(d,i){
        //双循环遍历并更新节点
        for(let i=0;i<nodes.length;i++){
            nodes[i].forEach(function(elem,j,arr){
                if(arr[j]==d){
                    nodes[i].splice(j,1);
                    if(nodes[i].length==0){
                        nodes.splice(i,1);
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
                                let node={cx:"",cy:""};
                                d.push(node)
                                //更新每个节点当前数据
                                computeNode();
                                //更新FlatedNodes
                                flatedNodes=getFlatedNodes();
                                //更新线数据
                                updateLineRelation("add",node);
                                //画节点
                                drawNodes();
                                //画线
                                drawLines();
                        })
                    }
                }
            })
        }
        //更新展开后的列表
        flatedNodes=getFlatedNodes();
        //更新节点详细信息
        computeNode();
        //更新线数据
        updateLineRelation("delete",d,i);
        //画节点
        drawNodes();
        //画线
        drawLines();
    })
    .call(circleDrag)
};
//线画图函数
function drawLines(){
    let svg=d3.select("svg");
    //清除画布上的线
    let currentLines=svg.selectAll("line")
    currentLines.remove();
    //绑定数据
    let line=svg.selectAll(".line").data(lines);
    line.enter().insert("line","circle")
    .classed(".line",true)
    .attr("x1",function(d){
        return d.x1;
    })
    .attr("y1",function(d){
        return d.y1;
    })
    .attr("x2",function(d){
        return d.x2;
    })
    .attr("y2",function(d){
        return d.y2;
    })
    .style({
        stroke:"white",
    })
    .style("stroke-width",r/2)
    .on("dblclick",function(d,i){
        lines.splice(i,1);
        drawLines();
    })
}
//拖拽中的线画图函数
function drawDraggingLine(){
    let svg=d3.select("svg");
    //清除画布上的线
    removeDraggingLine();
    //绑定数据
    let line=svg.selectAll(".draggingline").data(draggingLineData);
    line.enter().insert("line","circle")
    .classed(".draggingline",true)
    .attr("x1",function(d){
        return d.x1;
    })
    .attr("y1",function(d){
        return d.y1;
    })
    .attr("x2",function(d){
        return d.x2;
    })
    .attr("y2",function(d){
        return d.y2;
    })
    .style({
        stroke:"red",
    })
    .style("stroke-width",r/2)
}
//移除拖拽中的线
function removeDraggingLine(){
    let svg=d3.select("svg");
    let currentLines=svg.selectAll("line");
    for(let i=0;i<currentLines[0].length;i++){
        if(currentLines[0][i].className.baseVal.indexOf(".draggingline")!=-1){
            currentLines[0][i].remove();
        }
    }
}

//添加列的按钮
d3.select("body>button").on("click",function(){
    //添加一个数据
    let node=[{cx:"",cy:""}];
    nodes.push(node);
    //更新每个节点当前数据
    computeNode();
    //更新FlatedNodes
    flatedNodes=getFlatedNodes();
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
            let node={cx:"",cy:""};
            d.push(node)
            //更新每个节点当前数据
            computeNode();
            //更新FlatedNodes
            flatedNodes=getFlatedNodes();
            //更新线数据
            updateLineRelation("add",node);
            //画节点
            drawNodes();
            //画线
            drawLines();
    })
    //更新线数据
    updateLineRelation("add",node[0]);
    //画节点
    drawNodes();
    //画线
    drawLines();
})