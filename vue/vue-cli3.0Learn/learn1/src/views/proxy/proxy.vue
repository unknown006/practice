<template>
    <div>
        <button @click="handleClick">点击输入内容</button>
        <p>用户输入:{{ message }}</p>
    </div>
</template>

<script>
    import { rstMagicTest } from '@/api/proxy';
    export default {
        data() {
            return {
                message:''
            }
        },
        methods: {
            handleClick() {
                let msg=prompt('请输入内容。< ^_^ >');
                let params=JSON.stringify({ msg });
                rstMagicTest(params).then(({data})=>{
                    this.message=data.msg;
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>