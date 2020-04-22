<template>
    <div class="container">
        <task-work-area width="800" height="400" id="workArea" @on-add-nodemodel="onAddNodeModel" @on-mouse="onMouse" @click.native="menuShow=false">
            <task-node width="50" height="50"
                v-for="(item,index) in nodes" :key="index" 
                :node="item"
                @on-drag-start="dragStartHandle"
                @on-drag-ging="draggingHandle"
                @on-drag-end="dragEndHandle"
                @on-select="clickHandle"
                @on-mouse="menuHandle">
                <!-- 节点样式 -->
                <div class="node"
                :style="{
                    background:item.color,
                }"
                :class="{active:item.isActive}"></div>
                <!-- 输入口 -->
                <task-in-port
                class="port input"
                v-for="(input,portIndex) in item.inputs" :key="portIndex"
                :pid="input.pid" :content="input.content"
                :style="{
                    top:getPosition('input',item)[portIndex].top+'px',
                    left:getPosition('input',item)[portIndex].left+'px',
                }"
                ></task-in-port>
                <!-- 输出口 -->
                <task-out-port
                class="port output"
                v-for="(input,portIndex) in item.outputs" :key="portIndex"
                :pid="input.pid" :content="input.content"
                :style="{
                    top:getPosition('output',item)[portIndex].top+'px',
                    left:getPosition('output',item)[portIndex].left+'px',
                }"
                ></task-out-port>
            </task-node>
        </task-work-area>
        <div class="node-details">
            <h3 style="font-size:16px;margin-top:10px;">节点信息</h3>
            <p><span>X轴坐标</span>:<span>{{details.positionX}}</span></p>
            <p><span>Y轴坐标</span>:<span>{{details.positionY}}</span></p>
            <p><span>节点颜色</span>:<span v-show="!isEditing">{{details.color}}</span><input v-show="isEditing" type="color" v-model="details.color"/></p>
            <p><span>角色</span>:<span>{{details.roleTypeName}}</span></p>
            <p><span>完成情况</span>:<span>{{details.stateName}}</span></p>
            <p><span>计划完成时间</span>:<span>{{details.plannedTime}}</span></p>
            <p v-if="details.state==1"><span>完成时间</span>:<span>{{details.plannedTime}}</span></p>
            <div class="buttons" v-show="isEditing">
                <el-button @click="saveEditHandle">保存</el-button>
                <el-button @click="cancelEditHandle">取消编辑</el-button>
            </div>
        </div>
        <!-- <task-node-model :node="nodeModel">
            <span class="task-node-model-label">65165165165</span>
        </task-node-model> -->
        <ul class="edit" :style="{top:`${menu.positionY}px`,left:`${menu.positionX}px`,}" v-show="menuShow">
            <li @click="editHandle">编辑</li>
            <li @click="delHandle">删除</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //可拖拽节点node模型(工作区外部使用)
                menuShow:false,
                isEditing:false,
                menu:{
                    positionX:0,
                    positionY:0,
                },
                startPosition:{
                    x:0,
                    y:0,
                },
                currentNode:{},
                editingOrg:{},
                details:{
                    id:0,
                    positionX:0,
                    positionY:0,
                    color:'',
                    isActive:false,
                    roleType:'未定义',
                    roleTypeName:'未定义',
                    state:1,
                    stateName:'已完成',
                    plannedTime:'2019-10-11 13:00:00',
                    completeTime:'2019-10-11 12:00:00',
                },
                nodeModel:[{
                    id:'node1'
                },{
                    id:'node2'
                }],
                nodes:[
                    {
                        id:1,
                        positionX:100,
                        positionY:100,
                        color:'#FFFFFF',
                        isActive:false,
                        roleType:0,
                        roleTypeName:'产品',
                        state:1,
                        stateName:'已完成',
                        plannedTime:'2019-10-11 13:00:00',
                        completeTime:'2019-10-11 12:00:00',
                        inputs:[
                            {pid:1,content:'',},
                            {pid:2,content:'',},
                        ],
                        outputs:[
                            {pid:1,content:'',},
                            {pid:2,content:'',},
                        ],
                    },
                    {
                        id:2,
                        positionX:150,
                        positionY:150,
                        color:'#FFFFFF',
                        isActive:false,
                        roleType:1,
                        roleTypeName:'前端',
                        state:0,
                        stateName:'进行中',
                        plannedTime:'2019-10-11 13:00:00',
                        completeTime:'2019-10-11 14:00:00',
                    },
                    {
                        id:3,
                        positionX:200,
                        positionY:200,
                        color:'#FFFFFF',
                        isActive:false,
                        roleType:2,
                        roleTypeName:'后端',
                        state:0,
                        stateName:'进行中',
                        plannedTime:'2019-10-11 13:00:00',
                        completeTime:'',
                    },
                ],
            }
        },
        methods: {
            getPosition(type,node){
                let arr=[];
                let baseAngle=90;
                if(type=='input'){
                    let ports=node.inputs;
                    let len=ports.length;
                    let stepAngle=180/len;
                    ports.forEach((elem,index)=>{
                        let obj={};
                        let angle=baseAngle+stepAngle*(index+1)-stepAngle/2;
                        console.log(angle)
                        let y=30*Math.abs(Math.sin(Math.PI/180*angle));
                        let x=30*Math.abs(Math.cos(Math.PI/180*angle));
                        console.log(x,y)
                        if(angle>180){
                            obj.left=25-x-5;
                            obj.top=25+y-5;
                        }else{
                            obj.left=25-x-5;
                            obj.top=25-y-5;
                        }
                        arr[index]=obj;
                    })
                }else if(type=='output'){
                    let ports=node.outputs;
                    let len=ports.length;
                    let stepAngle=180/len;
                    ports.forEach((elem,index)=>{
                        let obj={};
                        let angle=baseAngle-stepAngle*(index+1)+stepAngle/2;
                        console.log(angle)
                        let y=30*Math.abs(Math.sin(Math.PI/180*angle));
                        let x=30*Math.abs(Math.cos(Math.PI/180*angle));
                        console.log(x,y)
                        if(angle<0){
                            obj.left=25+x-5;
                            obj.top=25+y-5;
                        }else{
                            obj.left=25+x-5;
                            obj.top=25-y-5;
                        }
                        arr[index]=obj;
                    })
                }
                return arr;
            },
            test(){
                alert(321)
            },
            //工作区事件
            onAddNodeModel() {
                alert('增加节点？')
            },
            onMouse(){
                alert('右键')
            },
            //节点事件
            dragStartHandle(e,node){
                this.startPosition.x=e.clientX;
                this.startPosition.y=e.clientY;
            },
            draggingHandle(e,node){
                
            },
            dragEndHandle(e,node){
                node.positionX+=e.clientX-this.startPosition.x;
                node.positionY+=e.clientY-this.startPosition.y;
                if(!this.isEditing){
                    this.clickHandle(e,node);
                }
            },
            clickHandle(e,node,el){
                this.menuShow=false;
                if(this.details.id && node.id!=this.details.id && this.isEditing){
                    this.cancelEditHandle();
                    this.currentNode=node;
                    this.editHandle();
                }
                this.nodes.forEach((elem)=>{
                    if(elem.id==node.id){
                        elem.isActive=true;
                    }else{
                        elem.isActive=false;
                    }
                })
                this.details=node;
            },
            menuHandle(e,node){
                this.currentNode=node;
                this.menu.positionX=e.clientX;
                this.menu.positionY=e.clientY;
                this.clickHandle(e,node);
                this.menuShow=true;
            }, 
            editHandle(){
                this.editingOrg={...this.details};
                this.isEditing=true;
                this.menuShow=false;
            }, 
            //节点右键删除 
            delHandle(){
                let index=this.nodes.findIndex((elem)=>{
                    return elem.id==this.currentNode.id;
                })
                this.nodes.splice(index,1);
                this.menuShow=false;
            }, 
            //保存节点信息编辑
            saveEditHandle(){
                this.isEditing=false;
            },
            //取消编辑
            cancelEditHandle(){
                for(let key in this.editingOrg){
                    this.details[key]=this.editingOrg[key];
                }
                this.isEditing=false;
            },           
        },
    }
</script>

<style lang="scss" scoped>
    #workArea{
        background:#000 !important;
    }
    .container{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        position:relative;
    }
    .node{
        width:50px;
        height:50px;
        background:black;
        color:white;
        border-radius:50%;
        border:1px solid gold;
        position:relative;
        &.active{
            border:5px solid green;
        }
    }
    .port{
        width:10px;
        height:10px;
        border:1px solid gold;
        background:black;
        position:absolute;
    }
    .port.input:hover{
        background:red;
        border:0;
        box-shadow:none;
    }
    .port.output:hover{
        background:blue;
        border:0;
        box-shadow:none;
    }
    .node-details{
        color:white;
        background:black;
        width:200px;
        height:400px;
    }
    .edit{
        width:50px;
        border:1px solid #eee;
        position:absolute;       
        li{
            text-align:center;
            height:25px;
            line-height:25px;
            background:white;
            cursor:pointer;
            &:not(:first-child){
                border-top:1px solid #EEE;
            }
            &:hover{
                background:#EEE;
            }
        }
    }
    ul,li{
        margin:0;
        padding:0;
        list-style:none;
    }
</style>