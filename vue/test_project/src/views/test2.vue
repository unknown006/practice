<template>
    <div class="table">
        <el-table 
            :data="dataSource"
            highlight-current-row border 
        >
            <el-table-column prop="a" label="A" align="center"></el-table-column>
            <el-table-column prop="b" label="B" align="center"></el-table-column>
            <el-table-column prop="c" label="C" align="center"></el-table-column>
        </el-table>
        <div class="footer">
            ASDASDASDASDADS
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataSource:[
                    {a:1,b:2,c:3},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                    // {a:4,b:5,c:6},
                ],
            }
        },
    }
</script>

<style lang="less" scoped>
    .table{
        flex-grow:1;
        .footer{
            height:100px;
            line-height:100px;
            background:pink;
        }  
    }
    
</style>