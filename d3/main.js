//取消右键点击菜单
document.oncontextmenu=function(){
    return false;
}

let graph={
    nodes:[
        {x:50,y:50},
        {x:100,y:50},
        {x:75,y:100},
    ],
    links:[
        {source:0,target:1},
        {source:1,target:2},
        {source:2,target:0},
    ]
}

let width=960,height=480;
let force=d3.layout.force()
    .size([width,height])
    .nodes(graph.nodes)
    .links(graph.links)
    .linkDistance(100)
    .charge(-200)
    .on("tick",tick);

let drag=force.drag()
    .on("dragend",function(d,i){
        console.log(d)
    });

let svg=d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height);

let link=svg.selectAll(".link"),
    node=svg.selectAll(".node");

let links=force.links(),
    nodes=force.nodes();

restart(10);

function restart(r){
    link=link.data(links);
    link.enter().insert("line",".node")
    .classed("line",true)
    .style("stroke","gold")
    .style("stroke-width","1.5");

    node=node.data(nodes);
    node.enter().append("circle")
    .classed("node",true)
    .attr("r",r)
    .style("fill","purple")
    .style("stroke","gold")
    .style("stroke-width","1.5")
    .call(drag);
    node.exit().remove();

    force.start();
}
function tick(){
    link.attr("x1",d => {console.log(d)
         return d.source.x})
        .attr("y1",d => d.source.y)
        .attr("x2",d => d.target.x)
        .attr("y2",d => d.target.y)
    
    node.attr("cx",d => d.x)
        .attr("cy",d => d.y)
}